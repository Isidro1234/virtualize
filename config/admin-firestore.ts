import admin from 'firebase-admin'
import { cert } from 'firebase-admin/app'
import {getAuth}  from 'firebase-admin/auth'
import {getFirestore} from 'firebase-admin/firestore'
admin.initializeApp({
    credential : cert({
        clientEmail:process.env.NEXT_PUBLIC_client_email,
        projectId:process.env.NEXT_PUBLIC_project_id  ,
        privateKey:process.env.NEXT_PUBLIC_private_key,
    })
})

export const admindb = getAuth()
export const adminAuth = getFirestore()