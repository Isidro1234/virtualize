"use server"
import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from 'jose'


const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)


const protectedRoutes = ['/user', '/university' , '/admin']
const roleAlloe: Record<string, string[]> = {
   '/admin':['admin'],
   '/user':['individual'],
   '/university':['university', 'uni-professor', 'professor']
}
const public_Only = ['/', '/services' , '/universities' , '/aboutus', '/register' , '/login']

async function VerifyToken(token:string){
   try {
      const {payload} = await jwtVerify(token, JWT_SECRET)
      return payload as {uid:string , role:string}
   } catch (error) {
      return null
   }
}

function pathMatch(pathname:string , routes:string[]){
   return routes.some(route => {
      if(route === '/') return pathname === '/';
      return pathname === route || pathname.startsWith(route + '/')
   })
}
export async  function proxy (request:NextRequest){
     const token = request.cookies.get('session_virtualise')?.value;
     const roletoken  = request.cookies.get('user_role')?.value;
     const {pathname} = request.nextUrl
     const isPublicOnly = pathMatch(pathname, public_Only)

     const matchprotected = Object.keys(roleAlloe).find((route)=>
   pathname == route || pathname.startsWith(`${route}/`))
function getDashboardRole(role:string):string{
      switch(role){
         case 'admin':
            return '/admin'
         case 'professor':
            return '/university'
         case 'university':
            return '/university'
         case 'uni-professor':
            return '/university'
         default:
            return '/user'
      }
    }
     if(matchprotected && (!token || !roletoken)){
        const logurl = new URL('/login', request.url);
        logurl.searchParams.set("callback", pathname);
        return NextResponse.redirect(logurl)
     }

     if(roletoken){
      const decoderole = await VerifyToken(roletoken);
      if(decoderole){
         if(isPublicOnly){
            const target = getDashboardRole(decoderole.role);
            return NextResponse.redirect(new URL(target , request.url))
         }
         if(matchprotected){
   const allowroutes = roleAlloe[matchprotected];
   if(!allowroutes.includes(decoderole.role)){
      const fallbacktoauthorized = getDashboardRole(decoderole.role)
      return NextResponse.redirect(new URL(fallbacktoauthorized, request.url))
   }
}
      }
     }

    
     return NextResponse.next()

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}