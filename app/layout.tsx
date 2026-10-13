import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/structure/Footer";
import Navbar from "../components/structure/navbar";
import { Provider } from "../components/ui/provider";
import AuthContextProvider from "../context/useAuthContext";
import StreamWrapper from "../components/structure/StreamWrapper";
import { Suspense } from "react";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import { EmotionRegistry } from "../components/ui/EmotionRegistry";
import "stream-chat-react/dist/css/index.css";
import { VerifySession } from "./lib/verifySession";
import { getUserById } from "./lib/dal";
import MainLayout from "../components/structure/MainLayout";



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
          <Suspense fallback={<VStack justifyContent={'center'} alignItems={'center'} height={'100vh'} width={'100vw'}>
            <Spinner color={'green'}/>
          </VStack>}>
          <MainLayout >
              <StreamWrapper>
            
                <Navbar/>
                
                  {children}
              
                
                <Footer/>
              </StreamWrapper>
 
            
        </MainLayout>
        </Suspense>
        </Provider>
        
        </EmotionRegistry>
       </body>
    </html>
  );
}
