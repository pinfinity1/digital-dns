import {DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {getApiV1AgentAgencyInformationOptions} from "@/client/@tanstack/react-query.gen";
import {useQuery} from "@tanstack/react-query";
import {AgencyInformationDto} from "@/client";
import {Loading} from "@/components/loading/Loading";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Info} from "lucide-react";


export default function EditAdminAgentInfo () {
    const [agencyInfo, setAgencyInfo] = useState<AgencyInformationDto>();
    
    
    const {data, isLoading, error} = useQuery(
        getApiV1AgentAgencyInformationOptions()
    )
    
    useEffect(() => {
        if(data) {
            if(data) {
                try {
                    const parsedData = typeof data === "string" ? JSON.parse(data) : data
                    if(parsedData) {
                        setAgencyInfo(parsedData.data);
                    }
                } catch (error) {
                    console.error("Error getting admin agent information", error);
                }
            }
        }
    }, [data]);
    
    if(isLoading) return (<div className={"w-full h-[100px]"}><Loading/></div>)
    
    if(error) {
        return <div>Error {error instanceof Error ? error.message : "Unknown error"}</div>;
    }
    
    
    return (
        <>
            <div className="grid gap-5 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="brandName" className="text-right flex items-center gap-0.5">
                        نام نمایندگی
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Info className={"w-3 h-3 sm:w-4 sm:h-4"}/></TooltipTrigger>
                                <TooltipContent className={"max-w-[356px]"}>
                                    <p>لطفاً نام نمایندگی خود را به زبان انگلیسی وارد کنید. این نام برای شناسایی
                                        نمایندگی و محصولات تولیدشده تحت برند شما استفاده می‌شود</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Input
                        id={"brandName"}
                        type={"text"}
                        defaultValue={agencyInfo?.brandName}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="agentCode" className="text-right flex items-center gap-0.5">
                        کد نمایندگی
                    </Label>
                    <Input
                        id="agentCode"
                        readOnly
                        type={"text"}
                        defaultValue={agencyInfo?.agentCode.toString()}
                        className="col-span-3"
                    />
                </div>
                <div className={"grid grid-cols-4 items-center gap-4"}>
                    <div className={"col-span-2"}>
                        <Label htmlFor="agentPercent" className="text-right flex items-center gap-0.5">
                            درصد نمایندگان
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><Info className={"w-3 h-3 sm:w-4 sm:h-4"}/></TooltipTrigger>
                                    <TooltipContent className={"max-w-[356px]"}>
                                        <p>با وارد کردن این مقدار، تعیین می‌کنید که به‌عنوان نماینده، از نمایندگان
                                            زیرمجموعه خود چه درصدی سود دریافت کنید. در ساختار هرمی ما، شما می‌توانید هم
                                            کاربران عادی و هم نمایندگان زیرمجموعه داشته باشید</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <Input
                            id={"agentPercent"}
                            defaultValue={agencyInfo?.agentPercent}
                            className="col-span-4 mt-1"
                        />
                    </div>
                    <div className={"col-span-2"}>
                        <Label htmlFor="userPercent" className="text-right flex items-center gap-0.5">
                            درصد کاربران
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><Info className={"w-3 h-3 sm:w-4 sm:h-4"}/></TooltipTrigger>
                                    <TooltipContent className={"max-w-[356px]"}>
                                        <p>این گزینه مختص کاربران عادی است. با وارد کردن این مقدار، تعیین می‌کنید که چه
                                            درصدی از سود حاصل از خرید کاربران عادی به شما تعلق گیرد. این درصد به قیمت
                                            محصولات اضافه شده و به کاربران نمایش داده می‌شود. سود حاصل از خرید، مستقیماً
                                            به کیف پول شما واریز خواهد شد</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <Input
                            id={"userPercent"}
                            defaultValue={agencyInfo?.userPercent}
                            className="col-span-4 mt-1"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cardHolderName" className="text-right flex items-center gap-0.5">
                        نام صاحب کارت
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Info className={"w-3 h-3 sm:w-4 sm:h-4"}/></TooltipTrigger>
                                <TooltipContent className={"max-w-[356px]"}>
                                    <p>نامی که روی کارت بانکی شما ثبت شده است را وارد کنید</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Input
                        id={"cardHolderName"}
                        type={"text"}
                        defaultValue={agencyInfo?.cardHolderName.split("\n")[0]}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cardNumber" className="text-right flex items-center gap-0.5">
                        شماره کارت
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Info className={"w-3 h-3 sm:w-4 sm:h-4"}/></TooltipTrigger>
                                <TooltipContent className={"max-w-[356px]"}>
                                    <p>در این بخش، نمایندگان باید شماره کارت بانکی خود را وارد کنند. در روش کارت به
                                        کارت، زمانی که یک کاربر قصد خرید محصول یا افزایش موجودی را دارد، مبلغ پرداختی
                                        به‌صورت مستقیم به کارت بانکی نماینده واریز می‌شود</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Input
                        id={"cardNumber"}
                        type={"text"}
                        defaultValue={agencyInfo?.cardNumber}
                        className="col-span-3"
                    />
                </div>
                <div className={"grid grid-cols-4 items-center gap-4"}>
                    <div className={"col-span-2"}>
                        <Label htmlFor="maximumAmountForAgent" className="text-right flex items-center gap-0.5">
                            سقف تراکنش نماینده
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><Info className={"w-3 h-3 sm:w-4 sm:h-4"}/></TooltipTrigger>
                                    <TooltipContent className={"max-w-[356px]"}>
                                        <p>حداکثر مبلغی که نماینده زیرمجموعه شما می‌تواند در هر تراکنش انجام دهد را
                                            تعیین کنید</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <Input
                            id={"maximumAmountForAgent"}
                            defaultValue={agencyInfo?.maximumAmountForAgent?.toLocaleString("fa")}
                            className="col-span-4 mt-1"
                        />
                    </div>
                    <div className={"col-span-2"}>
                        <Label htmlFor="minimalAmountForAgent" className="text-right flex items-center gap-0.5">
                            کف تراکنش نماینده
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><Info className={"w-3 h-3 sm:w-4 sm:h-4"}/></TooltipTrigger>
                                    <TooltipContent className={"max-w-[356px]"}>
                                        <p>حداقل مبلغی که نماینده زیرمجموعه شما می‌تواند در هر تراکنش انجام دهد را تعیین
                                            کنید</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <Input
                            id={"minimalAmountForAgent"}
                            defaultValue={agencyInfo?.minimalAmountForAgent?.toLocaleString("fa")}
                            className="col-span-4 mt-1"
                        />
                    </div>
                </div>
                <div className={"grid grid-cols-4 items-center gap-4"}>
                    <div className={"col-span-2"}>
                        <Label htmlFor="maximumAmountForUser" className="text-right flex items-center gap-0.5">
                            سقف تراکنش نماینده
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><Info className={"w-3 h-3 sm:w-4 sm:h-4"}/></TooltipTrigger>
                                    <TooltipContent className={"max-w-[356px]"}>
                                        <p>حداکثر مبلغی که کاربر زیرمجموعه شما می‌تواند در هر تراکنش انجام دهد را مشخص
                                            کنید</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <Input
                            id={"maximumAmountForUser"}
                            defaultValue={agencyInfo?.maximumAmountForUser?.toLocaleString("fa")}
                            className="col-span-4 mt-1"
                        />
                    </div>
                    <div className={"col-span-2"}>
                        <Label htmlFor="minimalAmountForUser" className="text-right flex items-center gap-0.5">
                            کف تراکنش نماینده
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><Info className={"w-3 h-3 sm:w-4 sm:h-4"}/></TooltipTrigger>
                                    <TooltipContent className={"max-w-[356px]"}>
                                        <p>حداقل مبلغی که کاربر زیرمجموعه شما می‌تواند در هر تراکنش انجام دهد را مشخص
                                            کنید</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Label>
                        <Input
                            id={"minimalAmountForUser"}
                            defaultValue={agencyInfo?.minimalAmountForUser?.toLocaleString("fa")}
                            className="col-span-4 mt-1"
                        />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">ثبت تغییرات</Button>
            </DialogFooter>
        </>
    )
}