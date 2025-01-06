import prisma from '@repo/myDB/clients';
import express from 'express';

//changes
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.listen(port, () => {
    console.log("Listening at " + port);
});

app.post('/webhook', async (req, res) => {
    const paymentInfo: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.userInfo,
        amount: req.body.amount
    };

    try {
        if (!paymentInfo.token || !paymentInfo.userId || !paymentInfo.amount) {
            res.status(400).json({ error: 'Invalid input data' });   //ERROR HERE can not return res.json()
        }
        // Validate inputs


        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: Number(paymentInfo.userId),
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount),
                    },
                },
            }),
            prisma.onRampTransac.update({
                where: {
                    token: paymentInfo.token,
                },
                data: {
                    status: 'Success',
                },
            }),
        ]);

        res.status(200).json({ message: 'Transaction successful' });
    } catch (e) {
        console.error('Transaction error:', e);
        res.status(411).json({ error: 'An error occurred during the transaction' });
    }
});
