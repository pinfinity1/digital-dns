"use client"


import PaymentInformation from "@/components/PaymentInformation";


export default function HomePage () {
    // const {hasPermission} = usePermission()
    
    
    return (
        <div>
            {/*{hasPermission("GetTransactionDetails") && <PaymentInformation/>}*/}
            <PaymentInformation/>
        </div>
    )
}