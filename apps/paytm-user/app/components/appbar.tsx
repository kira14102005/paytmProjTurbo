"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar(){
    const s = useSession();
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