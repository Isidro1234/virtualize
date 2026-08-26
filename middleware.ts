"use server"
import { NextRequest, NextResponse } from "next/server";




const protectedRoutes = ['/user', '/university' , '/admin']
const public_Only = ['/services' , '/universities' , '/aboutus', '/register' , '/login']
export async function middleware (request:NextRequest){
     const token = request.cookies.get('session_virtualise')?.value;
     const {pathname} = request.nextUrl
     const isProtected = protectedRoutes.some(route => pathname.includes(route));
     const isPublicOnly = public_Only.some(route => pathname.includes(route));


     if(request.nextUrl.pathname.startsWith('/login')){
      const response = NextResponse.next()
      if(request.cookies.has('session_virtualise')){
         request.cookies.delete('session_virtualise')
      }
      return response
     }
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