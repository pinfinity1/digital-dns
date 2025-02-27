"use client"

import {signOut} from "next-auth/react";
import {toast} from "sonner";


export default function HomePage () {
    
    const handleSignOut = async () => {
        try {
            await signOut({redirectTo: "/login"});
            toast.success("خروج موفقیت‌آمیز");
        } catch (error) {
            console.error(error);
            toast.error("مشکلی بوجود آمده");
        }
    }
    
    return (
        <div>
            Home page
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}