"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Appbar(){
    const s = useSession();
    const r = useRouter()
    return <>
    <div className="flex flex-row justify-between">
        <button className="p-3 m-2 rounded-lg hover:bg-black hover:text-white" onClick={()=>{
            signIn();
        }}>
            Sign in
        </button>
        <button  className="p-3 m-2 rounded-lg hover:bg-black hover:text-white" onClick={()=>{
            signOut()
        }}> Logout</button>
    </div>
    <div>{JSON.stringify(s)}</div>
    </>
}