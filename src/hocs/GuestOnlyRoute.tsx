import React from "react";
import {redirect} from 'next/navigation'
import {auth} from "@/lib/auth";


const GuestOnlyRoute = async ({children}: { children: React.ReactNode }) => {
    const session = await auth()
    
    if(session) {
        redirect("/")
    }
    
    return <>{children}</>
}

export default GuestOnlyRoute
