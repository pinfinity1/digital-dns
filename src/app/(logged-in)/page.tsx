"use client"


import PaymentInformation from "@/components/home/PaymentInformation";
import SalesGrowth from "@/components/home/SalesGrowth";
import AdminAgentInformation from "@/components/home/AdminAgentInformation";


export default function HomePage () {
    // const {hasPermission} = usePermission()
    
    
    return (
        <div className={"grid grid-cols-12 gap-6"}>
            {/*{hasPermission("GetTransactionDetails") && <PaymentInformation/>}*/}
            <PaymentInformation/>
            <AdminAgentInformation/>
            <SalesGrowth/>
        </div>
    )
}