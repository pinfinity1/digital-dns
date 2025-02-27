import React from "react";
import Providers from "@/components/Providers";
import AuthGuard from "@/hocs/AuthGuard";


export default function layout ({children}: { children: React.ReactNode }) {
    return (
        <Providers>
            <AuthGuard>
                {children}
            </AuthGuard>
        </Providers>
    )
}