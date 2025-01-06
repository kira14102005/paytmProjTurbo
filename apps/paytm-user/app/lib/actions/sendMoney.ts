"use server"




//changes for testing the CI
import { getServerSession } from "next-auth";
import zod from 'zod'
import prisma from "@repo/myDB/clients";
import { NEXTAUTH } from "../auth";

const inputSchema = zod.object({
    amount: zod.number().min(1),
    recep: zod.string().length(10),
})
export async function sendMoney(amount: number, recep: string) {
    // Do zod validation
    const res = inputSchema.safeParse({ amount, recep });

    if (!res.success) return { message: "Failed", info: "Invalid inputs" }
    const sess = await getServerSession(NEXTAUTH);
    const userId = sess.user.id;
    if (!sess.user && !sess.user.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    const recepId = await prisma.user.findFirst({
        where: {
            number: recep
        }
    })
    if (!recepId) return { message: "Failed", info: "Recepient Not found" }
    if(recepId.id == userId)  return { message: "Failed", info: "Can't Send to yourself" }
    try {
        // await prisma.$transaction([
        //     prisma.balance.update({
        //         where: {
        //             id: Number(userId)
        //         },
        //         data: {
        //             amount: {
        //                 decrement: Number(amount)
        //             }
        //         }
        //     }),
        //     prisma.balance.update({
        //         where: {
        //             userId: recepId.id
        //         },
        //         data: {
        //             amount: {
        //                 increment: Number(amount)
        //             }
        //         }
        //     })
        // ])
        await prisma.$transaction(async (tx: { $queryRaw: any; balance: { findFirst: (arg0: { where: { id: number; }; }) => any; update: (arg0: { where: { id: number; } | { userId: any; }; data: { amount: { decrement: number; }; } | { amount: { increment: number; }; }; }) => any; }; p2pTransfer: { create: (arg0: { data: { toUserId: any; fromuserId: number; amount: number; timestamp: Date; }; }) => any; }; }) => {
            await tx.$queryRaw`SELECT * FROM "Balance" where "userId" = ${Number(userId)} FOR update` //DTABASE LOCKING IN POSTGRES
            const balance = await tx.balance.findFirst({ where: { id: Number(userId) } }) || { amount: 0 }
            // console.log(balance)
            // await new Promise((exec) => setTimeout(exec, 4000))
            if (balance.amount < amount) return { message: "Failed", info: "Fuck u cannot Send more than ur balance" }
            await tx.balance.update({
                where: {
                    id: Number(userId)
                },
                data: {
                    amount: {
                        decrement: Number(amount)
                    }
                }
            })
            await tx.balance.update({
                where: {
                    userId: recepId.id
                },
                data: {
                    amount: {
                        increment: Number(amount)
                    }
                }
            })
            await tx.p2pTransfer.create({
                data : {
                    toUserId : recepId.id,
                    fromuserId : Number(userId),
                    amount : Number(amount),
                    timestamp  : new Date()
                }
            })
        })
        return {
            message: "Success"
        }
    }
    catch (e) {
        console.error("Some error occurred" + e)
        return {
            message: "Failed"
            ,
            info: "Internal Error occurred"
        }
    }
}