"use client"
import React from 'react'
import { useStreamContext } from '../../context/StreamVideo'
import LiveCard from './LiveCard'

export default function LiveCardOuter() {
    const {videoClient} = useStreamContext()
    if(!videoClient) return
  return (<LiveCard/>
  )
}
