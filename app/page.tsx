import React from 'react'
import HomeCustom from '../components/structure/HomeCustom'
import { Metadata } from 'next'




export const metadata: Metadata  = {
  title:'Virtualize | Global Learning Platform - Homepage',
  description:`Learn , Collaborate , Participate, Debate. Virtualize is the center of digital
  learning, collaboration and innovation, pioneering PV rooms accross the globe with little 
  to hardware system required`,
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
}

export default async function Home() {
  
  return (<HomeCustom />)
}
