import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";
import { NEXTAUTH } from "../../lib/auth";

import { redirect } from "next/navigation";
import { CustomAlert } from "@repo/ui/alert";
import prisma from "@repo/myDB/clients";
import { P2pTransfer } from "../../components/P2ptrnsfer";

async function getRecentTransfers() {
    const ses = await getServerSession(NEXTAUTH);
    if (!ses.user && !ses.user.id) { return null; }
    const userId = ses.user.id;
    const totalTransfers = await prisma.user.findFirst({
        where: {
            id: Number(userId)
        }, select: {
            sentTransfers: true,
            receivedTransfers: true,
        }
    })
    console.log(totalTransfers)
    return totalTransfers
}
export default async function () {
    const record = await getRecentTransfers();
    if (!record) {
        setTimeout(() => { redirect('/api/auth/signin') }, 4000)
        return <>
            <CustomAlert slogan="Failed" info="You are not logged in" />
        </>
    }
    return <>
    <div className="w-full mr-5 mt-4 h-full">
        <Card title="Transaction History" >
        <P2pTransfer transfer={record} />
        </Card>
        </div>
        </>
}