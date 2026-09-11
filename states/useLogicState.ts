import {create} from 'zustand'
import { userdata } from '../app/actions/auth'

interface states  {
    classroomSelect:object | null,
    settingClassroom: Function ,
    me:object | null ,
    setUser:Function
}

export const useLogicState = create <states>((set , get)=>({
    classroomSelect:{},
    me:null,
    settingClassroom : (classroom:object) => {
        set({classroomSelect: classroom})
    },
    setUser:async()=>{
        const user = await userdata()
        set({me:user || null})
    }
}))