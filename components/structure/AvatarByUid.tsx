import { getUserAvatarByUid } from '../../app/actions/auth'
import AvatarDisplay from './AvatarDisplay'

export default async function AvatarByUid({uid, withdetails}:{uid:string, withdetails:boolean|null}) {
    const avatarinfo = await getUserAvatarByUid(uid)
    return <AvatarDisplay name={avatarinfo?.name} image={avatarinfo?.image} role={avatarinfo?.role} withdetails={withdetails}/>
}