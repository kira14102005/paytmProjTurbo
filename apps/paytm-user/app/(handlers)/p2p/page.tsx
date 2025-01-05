"use client"
import { Button, CustButton } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useEffect, useState } from "react";
import { sendMoney } from "../../lib/actions/sendMoney";
import { CustomAlert } from "@repo/ui/alert";

export default function () {
    const [no, setNo] = useState("1111");
    const [amount, setAmount] = useState(0);
    const [alert, setAlert] = useState<{ slogan: string; info: string } | null>(null);
    // useEffect(() => { setTimeout(() => {}, 5000) }, [alert])
    return (
        <>

            <div className="h-full w-full flex flex-col justify-center items-center">
                {alert && <CustomAlert slogan={alert.slogan} info={alert.info} />}

                <div className="mt-10 flex flex-col border border-slate-400 border-2 shadow-lg rounded-lg p-4 px-6 w-fit  lg:w-2/6 h-fit lg:h-fit">
                    <TextInput
                        placeholder="Enter the recipient number"
                        label="Number"
                        onChange={(value: string) => {
                            setNo(value);
                        }}
                    />
                    <TextInput
                        placeholder="Enter the amount"
                        label="Amount"
                        onChange={(value: string) => {
                            setAmount(Number(value));
                        }}
                    />
                    <CustButton
                        onClick={async () => {
                            const res = await sendMoney(amount * 100, no);
                            if (res.message === "Failed") {
                                setAlert({ slogan: "Failed", info: "Transaction Failed" });
                            }
                            if (res.message === "Success") {
                                setAlert({ slogan: res.message, info: "Amount sent successfully" });
                            }
                            setTimeout(() => { setAlert(null) }, 5000)
                            console.log(res);
                        }}
                    >
                        Send
                    </CustButton>
                </div>
            </div>
        </>
    );
}
