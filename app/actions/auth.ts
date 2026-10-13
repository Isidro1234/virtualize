
"use server"
import { FormState, FormStateLog, loginFormat, signupFormat } from "../lib/definitions";
import bcrypt from 'bcryptjs'
import { admindb } from "../../config/admin-firestore";
import {StreamClient} from "@stream-io/node-sdk"
import { redirect } from "next/navigation";
import {  createSession, deleteSession, encrypting } from "../lib/sessions";
import { VerifySession } from "../lib/verifySession";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

const API_KEY = process.env.STREAM_API_KEY
const SECRETE_STREAM = process.env.STREAM_SECRET 
const streamVideoClient = new StreamClient(`${API_KEY}` ,`${SECRETE_STREAM}` )

const dashboardFor = (role?: string) => {
  switch (role) {
    case 'admin': return '/admin'
    case 'professor':
    case 'uni-professor': return '/professor'
    case 'university': return '/university'
    case 'classroom': return '/classroom'
    case 'appearence': return '/appearence'
    default: return '/user'
  }
}
export async function signup( state:FormState , formData:FormData):Promise<FormState> {
    const validateData = signupFormat.safeParse({
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        password: formData.get('password') || ''
    })

    if(!validateData.success){
        return {
            errors: validateData.error.flatten().fieldErrors,
        }
    }

    const {name , email , password} = validateData.data
    const encrypt = bcrypt.hashSync(password , 10);
    const userinfo = {
        username:name,
        email,
        password:encrypt,
        role:['individual']
    }
    const userid = await createUser(userinfo);
    if(!userid.success) return;
    const jwt_session = await encrypting({role:userid.role , user_id:userid.userid })
    if(!jwt_session) return;
    await createSession(jwt_session)   
    redirect(dashboardFor("individual")) 
}

export async function login(state:FormStateLog, formData:FormData){
    const validate = loginFormat.safeParse({
        email: formData.get('email') || '',
        password: formData.get('password') || ''
    })

    if(!validate.success){
        return {
           errors: validate.error.flatten().fieldErrors
        }
    }
    const {email , password} = validate.data;
    const get_user = await admindb.collection('users').where('email', "==" , email).get()
    if(get_user.empty) return;
    const userdata = get_user.docs[0].data()
    const saved_password = userdata.password
    const check_password =  bcrypt.compareSync(password , saved_password);
    if(!check_password)return;
    const jwt_session = await encrypting({role:userdata.role , user_id:userdata.id})
    if(!jwt_session) return ;
    const session = await createSession(jwt_session)
    redirect(dashboardFor(userdata.role?.[0])) 
}

export async function getStream(user_id:any | null){
    if(!user_id){
        return {token:null , success:false}
    }
    try {
      const gen_Token = streamVideoClient.generateUserToken({user_id:user_id})
    return {token:gen_Token, success:true}  
    } catch (error) {
        return {token:null , success:false}
    }
    
}
const fail = { userid: null, success: false, role: null } as const;

export async function createUser(userinfo: { username: string; email: string; password: string; role: string[] }) {
  try {
    if (!userinfo?.username || !userinfo?.email) return fail;

    const users = admindb.collection("users");
    // Email alone must be unique (login looks users up by email).
    const exists = await users.where("email", "==", userinfo.email).limit(1).get();
    if (!exists.empty) return fail;

    const ref = users.doc();
    await ref.create({ ...userinfo, id: ref.id, createdAt: JSON.stringify(new Date()), photo: null });

    const stream = new StreamClient(process.env.STREAM_API_KEY!, process.env.STREAM_SECRET!);
    await stream.upsertUsers([{ id: ref.id, name: userinfo.username }]);

    return { userid: ref.id, success: true, role: userinfo.role };
  } catch {
    return fail;
  }
}
export async function logout(){
    await deleteSession()
    redirect('/login')
}


export async function changepic(url:string){
    try {
        const verify = await VerifySession();
    if(!verify?.userId) return ;
    const docref = admindb.collection('users').doc(verify.userId)
    await docref.update({
        photo:url
    })
    const usercheck =  await docref.get()
    if(!usercheck.exists) return;
    const user = usercheck.data()
    const userd : {username:string , role:string[] , photo:any } = {username: user?.username , role:user?.role , photo:user?.photo}
    updateTag(`user-${verify.userId}`) 
    return true
    } catch (error) {
        return null
    }
   
}