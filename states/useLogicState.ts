import {create} from 'zustand'
import { getUser } from '../app/lib/dal'


interface states  {
    classroomSelect:object | null,
    settingClassroom: Function ,
    me:object | null ,
    setUser:Function,
    setRecordings: Function,
    videos:Array<any> | null
}

export const useLogicState = create <states>((set , get)=>({
    classroomSelect:{},
    me:null,
    videos:null,
    settingClassroom : (classroom:object) => {
        set({classroomSelect: classroom})
    },
    setUser:async()=>{
        const user = await getUser()
        set({me:user || null})
    },
    setRecordings : async(videos:Array<any>)=>{
            set({videos:videos})
    }
}))