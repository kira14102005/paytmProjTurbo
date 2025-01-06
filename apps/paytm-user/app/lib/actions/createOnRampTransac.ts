"use server"        //SERVER ACTIONS
import { getServerSession } from "next-auth"
import prisma from "@repo/myDB/clients"
import { NEXTAUTH } from "../auth";

export async function createOnRamp(provider : string , amount  : number ){
const sess = await getServerSession(NEXTAUTH);
// console.log(sess)
const userId = sess.user.id;
if(!sess.user && !sess.user.id){
    return {
        msg : "Unauthenticated request"
    }
}
const tok = (Math.random()*1000).toString(); //this token will come from the bank.api.com
await prisma.onRampTransac.create({
    data : {
        token : tok,
        provider : provider,
        amount : amount,
        startTime : new Date(),
        status : "Processing",
        userId : Number(userId)
    }
})


}