"use client"


import PaymentInformation from "@/components/home/PaymentInformation";
import SalesGrowth from "@/components/home/SalesGrowth";
import AdminAgentInformation from "@/components/home/AdminAgentInformation";
import Consumption from "@/components/home/Consumption";


export default function HomePage () {
    // const {hasPermission} = usePermission()
    
    {/*{hasPermission("GetTransactionDetails") && <PaymentInformation/>}*/
    }
    
    return (
        <div className={"grid grid-cols-12 gap-6"}>
            <div className={"col-span-12 lg:col-span-6 grid grid-cols-6 gap-6"}>
                <Consumption/>
                <PaymentInformation/>
                <AdminAgentInformation/>
            </div>
            <div className={"col-span-12 lg:col-span-6"}>
                <SalesGrowth/>
            </div>
        </div>
    )
}