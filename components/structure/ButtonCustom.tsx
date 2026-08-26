import Link from 'next/link'
import React from 'react'

export default function ButtonCustom({link , children}:{link:string, children:React.ReactNode}) {
  return (
    <Link style={{width:'100%'}} href={link}>
      {children}
    </Link>
  )
}
