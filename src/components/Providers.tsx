import React from "react";
import QueryProvider from "@/components/QueryProvider";
import {Toaster} from "sonner";


type Props = {
    children: React.ReactNode;
};

const Providers = async (props: Props) => {
    const {children} = props;
    
    return (
        <QueryProvider>
            {/*<InstallButton/>*/}
            {children}
            <Toaster/>
        </QueryProvider>
    );
};

export default Providers;
