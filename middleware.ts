"use server"
import { NextRequest, NextResponse } from "next/server";




const protectedRoutes = ['/user']
const public_Only = ['/services', '/universities' , 'aboutus']
export function middleware (request:NextRequest){
     const token = request.cookies.get('session_virtualise')?.value;
     const {pathname} = request.nextUrl
     const isProtected = protectedRoutes.some(route => pathname.includes(route));
     const isPublicOnly = public_Only.some(route => pathname.includes(route));

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