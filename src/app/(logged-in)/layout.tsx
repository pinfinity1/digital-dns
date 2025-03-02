import React from "react";
import Providers from "@/components/Providers";
import AuthGuard from "@/hocs/AuthGuard";
import {PermissionProvider} from "@/contexts/PermissionContext";
import {Header} from "@/components/layout/Header";


export default function layout ({children}: { children: React.ReactNode }) {
    return (
        <Providers>
            <AuthGuard>
                <PermissionProvider>
                    <Header/>
                    {children}
                </PermissionProvider>
            </AuthGuard>
        </Providers>
    )
}