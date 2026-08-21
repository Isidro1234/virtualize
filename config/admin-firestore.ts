import admin from 'firebase-admin'
import { cert } from 'firebase-admin/app'


admin.initializeApp({
    credential : cert({
        clientEmail:process.env.NEXT_PUBLIC_client_email,
        projectId:process.env.NEXT_PUBLIC_project_id  ,
        privateKey:process.env.NEXT_PUBLIC_private_key,
    })
})

export const admindb = admin.firestore()
export const adminAuth = admin.auth()