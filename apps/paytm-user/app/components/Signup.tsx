'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { prisma } from "../db";
import { registerUser } from "../api/registerUser";

export function Signup() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: ""
    });
    const r = useRouter()

    return <>

        <div className="flex flex-col h-1/2 items-center">
            <input type="text" placeholder="Enter name" className="m-3 p-2 rounded-lg" onChange={(e) => {
                setUser((c) => {
                    return { ...c, name: e.target.value }
                })
            }} />
            <input type="text" placeholder="Enter email" className="m-3 p-2 rounded-lg" onChange={(e) => {
                setUser((c) => {
                    return { ...c, email: e.target.value }
                })
            }} />

            <input type="password" placeholder="Enter password" className="m-3 p-2 rounded-lg" onChange={(e) => {
                setUser((c) => {
                    return { ...c, password: e.target.value }
                })
            }} />
            <button className="py-2 px-1 rounded hover:text-black hover:bg-white w-1/2" onClick={async () => {
                try {
                    const result = await registerUser(user);
                    console.log(result);
                    r.push('/');
                } catch (error) {
                    console.error(error);
                }
            }}>Register</button>
        </div></>

}