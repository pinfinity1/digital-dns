import React from "react";
import QueryProvider from "@/components/QueryProvider";
import {Toaster} from "sonner";
import {NextAuthProvider} from "@/contexts/nextAuthProvider";


type Props = {
    children: React.ReactNode;
};

const Providers = async (props: Props) => {
    const {children} = props;
    
    return (
        <NextAuthProvider>
            <QueryProvider>
                {children}
                <Toaster richColors style={{fontFamily: `var(--font-sans-web)`}}/>
            </QueryProvider>
        </NextAuthProvider>
    );
};

export default Providers;
