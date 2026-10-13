import { FunctionPropsType, FunctionsCustomTypes } from "@isidrozau/react-voice-gemini-live-realtime"
import { deleteSession } from "../app/lib/sessions"
import { redirect } from "next/navigation"

async function emailUsers(){

}

async function logout(){
    await deleteSession()
    window.location.href = `http://localhost:3000/`
    return {status:true}
}

async function navigate(args:any){
    window.location.href = `http://localhost:3000/${args?.endpoint}`
}

async function summarizeClass(){

}

async function postAssignment(){

}

async function attendanceCall(){

}

async function recordClass(){

}

const navigate_website = {
    name:"navigate_website",
    description:"allow to navigate across pages in the website",
    parameters:{
        type:"OBJECT",
        properties:{
            endpoint:{
                type:"STRING",
                description:`endpoint for the page to navigate. there are only the following endpoints available:
                /services,  /classroom , /university , /Student , /register , /professor , /login , /appearence, /aboutus , /user ,
                 /user/courses, /user/settings , /user/live , /user/student , /user/visitant, /user/books`
            }
        }
    }
} as const


const logout_user = {
    name:"logout_user",
    description:"log out current user",
    parameters:{
        type:"OBJECT",
        properties:{}
    }
} as const

export const functionsCalls : FunctionsCustomTypes = [
    {func:navigate, name:"navigate_website" , withArgs:true},
    {func:logout, name:"logout_user" , withArgs:false}
]
export const functionProps: FunctionPropsType = [navigate_website , logout_user ]