import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { NEXTAUTH } from "./lib/auth";

export default async function () {
    const ses = await getServerSession(NEXTAUTH) ;
    console.log(ses)
    if(!ses || !ses.user)redirect('/api/auth/signin')
    else redirect('/home')
}