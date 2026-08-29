"use server"
import { NextRequest, NextResponse } from "next/server";




const protectedRoutes = ['/user', '/university' , '/admin']
const public_Only = ['/', '/services' , '/universities' , '/aboutus', '/register' , '/login']

function pathMatch(pathname:string , routes:string[]){
   return routes.some(route => {
      if(route === '/') return pathname === '/';
      return pathname === route || pathname.startsWith(route + '/')
   })
}
export  function proxy (request:NextRequest){
     const token = request.cookies.get('session_virtualise')?.value;
     const {pathname} = request.nextUrl
     const isProtected = pathMatch(pathname , protectedRoutes)
     const isPublicOnly = pathMatch(pathname, public_Only)


     if(isProtected && !token){
        const logurl = new URL('/login', request.url);
        logurl.searchParams.set("callback", pathname);
        return NextResponse.redirect(logurl)
     }

     if(isPublicOnly && token){
        return NextResponse.redirect(new URL('/user' , request.url))
     }



     return NextResponse.next()

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}