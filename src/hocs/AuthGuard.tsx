import React from "react";
import AuthRedirect from '@/components/AuthRedirect'
import {auth} from "@/libs/auth";


export default async function AuthGuard ({children}: { children: React.ReactNode }) {
    const session = await auth()
    
    return <>{session ? children : <AuthRedirect/>}</>
}
