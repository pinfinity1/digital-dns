import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getApiV1AgentGetAdminAgentInformationOptions} from "@/client/@tanstack/react-query.gen";
import {AgentDto} from "@/client";
import {Loading} from "@/components/loading/Loading";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FilePenLine} from "lucide-react";
import EditAdminAgentInfo from "@/components/home/EditAdminAgentInfo";


export default function AdminAgentInformation () {
    const [adminAgentInfo, setAdminAgentInfo] = useState<AgentDto>();
    
    const {data, isLoading, error} = useQuery(
        getApiV1AgentGetAdminAgentInformationOptions()
    )
    
    useEffect(() => {
        if(data) {
            try {
                const parsedData = typeof data === "string" ? JSON.parse(data) : data
                if(parsedData) {
                    setAdminAgentInfo(parsedData.data);
                }
            } catch (error) {
                console.error("Error getting admin agent information", error);
            }
        }
    }, [data]);
    
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
                <h3 className={"font-semibold "}>اطلاعات نمایندگی</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className={"rounded-lg"}><FilePenLine/></Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby={undefined}>
                        <DialogHeader>
                            <DialogTitle>ویرایش اطلاعات نمایندگی</DialogTitle>
                        </DialogHeader>
                        <EditAdminAgentInfo/>
                    </DialogContent>
                </Dialog>
            </div>
            <div className={"px-8 py-4"}>
                <div className={"w-full flex items-center gap-2"}>
                    <p>نمایندگی :</p>
                    <p className={"text-[14px] italic"}>{adminAgentInfo?.brandName}</p>
                </div>
                <div className={"w-full flex items-center gap-2"}>
                    <p>کد نمایندگی :</p>
                    <p className={"text-[14px] italic"}>{adminAgentInfo?.agentCode}</p>
                </div>
                <div className={"w-full flex items-center gap-2"}>
                    <p>درصد نمیاندگان :</p>
                    <p className={"text-[14px] italic"}>{adminAgentInfo?.agentPercent?.toLocaleString("fa")}</p>
                </div>
                <div className={"w-full flex items-center gap-2"}>
                    <p>درصد کاربران :</p>
                    <p className={"text-[14px] italic"}>{adminAgentInfo?.userPercent?.toLocaleString("fa")}</p>
                </div>
            </div>
        </div>
    )
}