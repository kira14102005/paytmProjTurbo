
import prisma from "@repo/myDB/clients"
import { Card } from "@repo/ui/card"

export const P2pTransfer = ({
    transfer: { sentTransfers, receivedTransfers }
}: {
    transfer: {
        sentTransfers: {
            amount: number,
            timestamp: Date,
            toUserId: number
        }[],
        receivedTransfers: {
            amount: number,
            timestamp: Date,
            fromuserId: number
        }[]
    }
}) => {

    if (!sentTransfers.length && !receivedTransfers.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <>
        <div className="flex flex-row w-full h-full items-center justify-between">
            <Card title="Spent Transactions">
                <div className="pt-2">
                    {sentTransfers.map(async (t) => {
                        const recep = await prisma.user.findFirst({where : {id  : Number(t.toUserId)}})
                        return (<div className="flex justify-between border bordwer-black p-1 rounded-md mb-2">
                            <div>
                                <div className="text-sm">
                                    Sent INR
                                </div>
                                <div className="text-sm">
                                    To {recep?.name || "xyz"}
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.timestamp.toDateString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                - Rs {t.amount / 100}
                            </div>

                        </div>)
                    })}
                </div>
            </Card>
            <Card title="Received Transactions">
                <div className="pt-2">
                {receivedTransfers.map(async (t) => {
                        const recep = await prisma.user.findFirst({where : {id  : Number(t.fromuserId)}})
                        return (<div className="flex justify-between border bordwer-black p-1 rounded-md mb-2">
                            <div>
                                <div className="text-sm">
                                    Received INR
                                </div>
                                <div className="text-sm">
                                    From {recep?.name || "xyz"}
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.timestamp.toDateString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                + Rs {t.amount / 100}
                            </div>

                        </div>)
                    })}
                </div>
            </Card>
        </div>
    </>
}