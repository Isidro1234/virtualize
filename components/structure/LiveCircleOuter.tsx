"use client"
import React from 'react'
import { useStreamContext } from '../../context/StreamVideo'
import LiveCardCircle from './LiveCardCircle'

export default function LiveCircleOuter() {
    const {videoClient} = useStreamContext()
    if(!videoClient) return;
    return (<LiveCardCircle/>)
}
