import React from "react";
import Providers from "@/components/Providers";
import AuthGuard from "@/hocs/AuthGuard";
import {PermissionProvider} from "@/contexts/PermissionContext";


export default function layout ({children}: { children: React.ReactNode }) {
    return (
        <Providers>
            <AuthGuard>
                <PermissionProvider>
                    {children}
                </PermissionProvider>
            </AuthGuard>
        </Providers>
    )
}