import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/structure/Footer";
import Navbar from "../components/structure/navbar";
import { Provider } from "../components/ui/provider";
import AuthContextProvider from "../context/useAuthContext";
import StreamVideoContext from "../context/StreamVideo";
import { getSession } from "./actions/auth";
import { VerifySession } from "./lib/verifySession";
import StreamWrapper from "../components/structure/StreamWrapper";
import { Suspense } from "react";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import { EmotionRegistry } from "../components/ui/EmotionRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virtualize - Global | Virtual classroom",
  description: `Global learning platform, helping universities collaborate, improving education quality,
  shared-classes, physical virtual room, made by angolans to the world`,
  creator:"Isidoro Zau",
  category:'education',
  verification:{
    google:'eo-LKwHfiHYpjnK-4ofnGi9gIIGpEIvkkEM27ywEK8E'
  },
  classification:"10/10",
  twitter:{
    images:['https://njinga-worker.njinga.workers.dev/virtualize2.png',
      'https://njinga-worker.njinga.workers.dev/virtualphoto.png',
      'https://njinga-worker.njinga.workers.dev/Screenshot_5-9-2026_65840_virtualize-bice.vercel.app.jpeg'
    , 'https://njinga-worker.njinga.workers.dev/Screenshot_28-8-2026_14140_localhost.jpeg'],
    title:"Virtualize | Global Learning platform",
    description:`
    Global learning platform, helping universities collaborate, improving education quality,
  shared-classes, physical virtual room, made by angolans to the world`
  },
  openGraph:{
    images:['https://njinga-worker.njinga.workers.dev/virtualize2.png',
      'https://njinga-worker.njinga.workers.dev/virtualphoto.png',
      'https://njinga-worker.njinga.workers.dev/Screenshot_5-9-2026_65840_virtualize-bice.vercel.app.jpeg'
    , 'https://njinga-worker.njinga.workers.dev/Screenshot_28-8-2026_14140_localhost.jpeg'],
    description:`Global learning platform, helping universities collaborate, improving education quality,
  shared-classes, physical virtual room, made by angolans to the world`,
    title:'Virtualize | Global Learning platform',
    videos:['https://njinga-worker.njinga.workers.dev/video2.mp4']
  },

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning suppressContentEditableWarning>    
         <EmotionRegistry>
        <Provider>
          
          <AuthContextProvider
          ><Suspense fallback={<VStack background={'#1d1d1d'} justifyContent={'center'} alignItems={'center'} height={'100vh'} width={'100%'}>
            <Spinner size={'md'}/>
          </VStack>}>
       
              <StreamWrapper>
            
                <Navbar/>
                {children}
                <Footer/>
              </StreamWrapper>
          </Suspense>
            
           
           </AuthContextProvider>
        </Provider>
        </EmotionRegistry>
       </body>
    </html>
  );
}
