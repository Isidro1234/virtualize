import React from 'react'
import { getcoursesCachedById } from '../../app/actions/auth'

export default async function SessionShow({id}:{id:string}) {
    const course = await getcoursesCachedById(id);
    if(!id) return
  return (
    <div>
      {course?.coursename}
    </div>
  )
}
