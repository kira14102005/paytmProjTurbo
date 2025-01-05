"use server"        //SERVER ACTIONS
import { getServerSession } from "next-auth"
import { number } from "zod"
import { NEXTAUTH } from "../auth"
import prisma from "@repo/myDB/clients"

export async function createOnRamp(provider : string , amount  : number ){
const sess = await getServerSession(NEXTAUTH);
const userId = sess.user.id;
if(!sess.user && !sess.user.id){
    return {
        msg : "Unauthenticated request"
    }
}
const tok = (Math.random()*1000).toString(); //this token will come from the bank.api.com
await prisma.onRampTransac.create({
    data:{
        provider ,
        status : "Processing",
        token :tok,
        amount,
        startTime : new Date(),
        userId : Number(userId)
    }
})


}