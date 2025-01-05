import { Appbar } from "@repo/ui/appbar"
import { getServerSession } from "next-auth"
import { NEXTAUTH } from "./lib/auth"
import { redirect } from "next/navigation";


export default async function () {
    const ses = await getServerSession(NEXTAUTH) ;
    if(ses.user)redirect('/home')
    else redirect('/api/auth/signin')
}