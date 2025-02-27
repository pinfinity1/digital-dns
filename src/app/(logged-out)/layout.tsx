import React from "react";
import GuestOnlyRoute from "@/hocs/GuestOnlyRoute";


const layout = async ({children}: { children: React.ReactNode }) => {
    return (
        <GuestOnlyRoute>
            {children}
        </GuestOnlyRoute>
    )
}

export default layout
