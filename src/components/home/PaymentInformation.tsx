"use client"
import {useQuery} from "@tanstack/react-query";
import {getApiV1TransactionGetTransactionDetailOptions} from "@/client/@tanstack/react-query.gen";
import React, {useEffect, useState} from "react";
import {TransactionDetailDto} from "@/client";
import {Loading} from "@/components/loading/Loading";


export default function PaymentInformation () {
    const [paymentInfo, setPaymentInfo] = useState<TransactionDetailDto>()
    
    const {data, isLoading, error} = useQuery(
        getApiV1TransactionGetTransactionDetailOptions()
    )
    
    
    useEffect(() => {
        if(data) {
            try {
                const parsedData = typeof data === "string" ? JSON.parse(data) : data;
                if(parsedData?.data) {
                    setPaymentInfo(parsedData?.data);
                }
            } catch (error) {
                console.error("Error parse data:", error);
            }
        }
    }, [data])
    
    if(isLoading) {
        return (
            <div
                className={"col-span-12 sm:col-span-6 xl:col-span-3 w-full h-[200px] flex flex-col border rounded-xl shadow space-y-1"}>
                <div className={"w-full h-[52px] flex items-center justify-between border-b px-6 shadow-sm"}>
                    <h3 className={"w-24 h-8 rounded-md bg-black/30 animate-pulse"}></h3>
                </div>
                <div className={"w-full flex-1 flex items-center justify-center"}>
                    <Loading/>
                </div>
            </div>
        )
    }
    
    if(error) {
        return <div>Error {error instanceof Error ? error.message : "Unknown error"}</div>;
    }
    
    return (
        <div className={"col-span-12 sm:col-span-6 xl:col-span-3 w-full h-fit border rounded-xl shadow space-y-1"}>
            <div className={"w-full h-[52px] flex items-center justify-between border-b px-6 shadow-sm"}>
                <h3 className={"font-semibold"}>اطلاعات پرداخت</h3>
            </div>
            <div className={"px-8 py-4"}>
                <div className={"w-full flex items-center gap-2"}>
                    <p>نام صاحب کارت :</p>
                    <p className={"text-[14px] italic"}>{paymentInfo?.cardHolderName?.split('\n')[0]}</p>
                </div>
                <div className={"w-full flex items-center gap-2"}>
                    <p>شماره کارت :</p>
                    <p className={"text-[14px] italic"}>{paymentInfo?.cardNumber}</p>
                </div>
                <div className={"w-full flex items-center gap-2"}>
                    <p>سقف تراکنش نماینده :</p>
                    <p className={"text-[14px] italic"}>{paymentInfo?.maximumAmountForAgent.toLocaleString("fa")}</p>
                </div>
                <div className={"w-full flex items-center gap-2"}>
                    <p>کف تراکنش نماینده :</p>
                    <p className={"text-[14px] italic"}>{paymentInfo?.minimalAmountForAgent.toLocaleString("fa")}</p>
                </div>
            </div>
        </div>
    )
}