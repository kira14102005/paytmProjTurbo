'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export function Signin(){
        const ses = useSession()
        const router  = useRouter();
        const [email , setEmail]  = useState("")
        const [pass , setpass]  = useState("")
        // useEffect(()=>)
        return <>
        <div className="flex flex-col h-1/2 w-screen items-center justify-between">
            <div className="py-3 px-2 my-5 rounded hover:text-black hover:bg-white"><button>Login With Google</button></div>  
            <div className="py-3 px-2 my-5 rounded hover:text-black hover:bg-white"><button>Login With Github</button></div>  
            <div className="flex flex-col h-1/2 items-center">
            <input type="text" placeholder="Enter email" className="m-3 p-2 rounded-lg" onChange={(e)=>{setEmail(e.target.value)}}/>
    
            <input type="password" placeholder="Enter password" className="m-3 p-2 rounded-lg"  onChange={(e)=>{setpass(e.target.value)}} />
            <button className="py-2 px-1 rounded hover:text-black hover:bg-white w-1/2" onClick={async ()=>{
                const r = await signIn("credentials" ,{ 
                    email  : email,
                    password : pass,
                    redirect : false
                })
                console.log(r)

                router.push('/')
                
            }}>Login</button>  
            </div>
    
        </div>
        </>
}