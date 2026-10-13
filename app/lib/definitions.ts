

import * as z from "zod"


export const signupFormat = z.object({
    name: z.string().min(4,{error: "Name must have at least 4 characters"})
    .trim(),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        {error:"Make sure your email is in the correct format eg. youremail@gmail.com"}).trim(),
    password: z.string().min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
})

export const loginFormat = z.object({
    email:z.string().min(4, {error:"Name must have at least 4 characters"})
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {error:"Make sure your email is in the correct format eg. youremail@gmail.com"})
    .trim(),
     password: z.string().min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    }).trim()

})

export type FormState =  | {
    errors?:{
        name?:string[],
        email?:string[],
        password?:string[]
    },
    message?:string
} | undefined

export type FormStateLog =  | {
    errors?:{
        email?:string[],
        password?:string[]
    },
    message?:string
} | undefined


