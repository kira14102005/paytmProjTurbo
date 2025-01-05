"use client"
import { useSession } from "next-auth/react"

export default function() {
    const ses = useSession();
    
    return <div>
        {/* Dashboard */}
        <div className="text-xl font-bold p-2">Hello {ses.data?.user?.name}, Welcome!</div>
    </div>
}