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
                    <main className={"w-full max-w-[1280px] flex-1 py-5"}>
                        {children}
                    </main>
                </PermissionProvider>
            </AuthGuard>
        </Providers>
    )
}