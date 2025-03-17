import DefaultAvatar from "../../../public/images/DefaultAvatar.png";

import { EyeClosed, EyeIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '../ui/button';
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { UserDto } from "@/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiV1AgentGetUserAgentQueryKey, putApiV1UserUpdateUserMutation } from "@/client/@tanstack/react-query.gen";



export default function UserRow({ rowData }: { rowData: UserDto }) {

    const { register, handleSubmit, reset } = useForm<UserDto>();

    const [dialogStep, setDialogStep] = useState<string>("main");
    const [dialogTitle, setDialogTitle] = useState<string>("مشخصات کاربر");
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
        description: rowData.description,
        isBlocked: rowData.isBlocked.toString(),
    });


    const dialogPageHandler = (id: string) => {
        switch (id) {
            case "addDescription":
                setDialogStep("addDescription");
                setDialogTitle("افزودن توضیحات");
                break;
            case "sendMessage":
                setDialogStep("sendMessage");
                setDialogTitle("ارسال پیام به کاربر");
                break;
            case "disableUser":
                setDialogStep("disableUser");
                setDialogTitle("غیرفعال کردن کاربر");
                break;
            case "incBalance":
                setDialogStep("incBalance");
                setDialogTitle("افزودن موجودی");
                break;
            case "decBalance":
                setDialogStep("decBalance");
                setDialogTitle("کاهش موجودی");
                break;
            case "disableCardBeCarad":
                setDialogStep("disableCardBeCarad");
                setDialogTitle(" غیرفعال کردن کارت به کارت");
                break;
            case "makeAgent":
                setDialogStep("makeAgent");
                setDialogTitle("نماینده کردن کاربر ");
                break;
            case "transactions":
                setDialogStep("transactions");
                setDialogTitle("تراکنش ها ");
                break;
            case "roles":
                setDialogStep("roles");
                setDialogTitle("نقش ها ");
                break;
            case "userAccess":
                setDialogStep("userAccess");
                setDialogTitle("دسترسی های کاربر");
                break;
            default:
                setDialogStep("main");
                setDialogTitle("مشخصات کاربر");
                break;
        }
    }


    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string): void => {
        setInputValues({
            ...inputValues,
            [id]: e.target.value,
        });
    }

    const queryClient = useQueryClient();

    // const {data, isLoading, error} = useQuery(
    //     getApiV1AgentAgencyInformationOptions()
    // )

    const UpdateUserInfo = (data: UserDto) => {
        updateAgencyInfo({ body: data })
    };


    const { mutate: updateAgencyInfo, isPending } = useMutation({
        ...putApiV1UserUpdateUserMutation(),
        onSuccess: (data) => {
            if (typeof data === "string") {
                const parsedData = JSON.parse(data);
                if (parsedData?.isSuccess) {
                    queryClient.invalidateQueries({ queryKey: getApiV1AgentGetUserAgentQueryKey() });
                    // queryClient.invalidateQueries({queryKey: putApiV1UserUpdateUserMutation()});
                    toast.success(parsedData?.message)
                    setDialogStep("main");
                }
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error("ویرایش اطلاعات با مشکل مواجه شد")
        },
    });


    return (
        <>
            <div className='flex justify-center'>
                <Avatar>
                    <AvatarImage src={rowData.avatar == null ? DefaultAvatar.src : rowData.avatar} alt="user_profile-image" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {rowData.avatar}
            </div>
            <div className='flex justify-center'>{rowData.firstName}</div>
            <div className='flex justify-center'>{rowData.telegramUsername ? rowData.telegramUsername : "ثبت نشده"}</div>
            <div className='flex justify-center'>{rowData.isAgent ? "نماینده" : "عادی"}</div>
            <div className='flex justify-center'>
                {rowData.isBlocked ?
                    <Badge className='bg-red-400 text-red-700 hover:bg-red-400'>مسدود شده</Badge>
                    : <Badge className='bg-green-400 text-green-700 hover:bg-green-400'>فعال</Badge>}
            </div>
            <div dir='ltr'
                className='flex justify-center'>
                {rowData.balance < 0 ? <Label className='text-red-600'>{rowData.balance}</Label>
                    : Number(rowData.balance) === 0 ? <Label className='text-slate-500'>&#8210;</Label>
                        : <Label className='text-green-600'>{rowData.balance}</Label>}</div>


            <div className='flex justify-center gap-4'>
                <Dialog>
                    <DialogTrigger asChild>

                        <EyeIcon className={"w-4 h-4 md:w-5 md:h-5 text-slate-400 cursor-pointer hover:text-slate-600"} />

                    </DialogTrigger>
                    <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="sm:max-w-[900px] h-[600px] overflow-hidden">

                        <DialogHeader>
                            <DialogTitle className='border-b-[1px] w-1/4 pb-2 '>
                                {dialogTitle}
                                {/* {dialogTitle === "main" ? "مشخصات کاربر" : dialogStep==="sendMessage" ? "ارسال پیام به کاربر" : "افزودن توضیحات"} */}
                            </DialogTitle>
                            <div className="flex  items-center w-1/4 border-2 border-r-slate-300 rounded-xl bg-slate-300 overflow-hidden">
                                <div className="py-1 px-2 ">
                                    <Avatar>
                                        <AvatarImage src={rowData.avatar == null ? DefaultAvatar.src : rowData.avatar} alt="user_profile-image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex justify-center h-full w-full p-3 rounded-s-xl bg-slate-100">
                                    <DialogDescription className='text-base'>       آیدی: {rowData.id}</DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        {dialogStep === "main" && (
                            <motion.div
                                key="main"
                                initial={{ x: 0, opacity: 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "-100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >

                                <div className="grid grid-cols-4 gap-4 py-4 text-slate-500">
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="username" className="text-right whitespace-nowrap"> نام کاربر </Label>
                                        <Input readOnly id="username" value={rowData.firstName ? rowData.firstName : "ثبت نشده"} className="col-span-2" />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="username" className="text-right whitespace-nowrap"> نام خانوادگی کاربر </Label>
                                        <Input readOnly id="username" value={rowData.lastName ? rowData.lastName : "ثبت نشده"} className="col-span-2" />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="TelegramID" className="text-right whitespace-nowrap"> آیدی تلگرام </Label>
                                        <Input readOnly id="TelegramID" value={rowData.telegramUsername ? rowData.telegramUsername : "ثبت نشده"} className="col-span-2" />
                                    </div>
                                    <div className="relative grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="mobile" className="text-right"> موبایل </Label>

                                        <Input readOnly id="mobile" value={rowData.mobile ? rowData.mobile : "ثبت نشده"} className="col-span-2" />
                                        {rowData.isMobileActive ?
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <EyeIcon className={"absolute left-2 top-8 w-4 h-4 md:w-5 md:h-5 text-slate-400 hover:text-slate-600"} />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>نمایش شماره : فعال</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            : <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <EyeClosed className={"absolute left-2 top-8 w-4 h-4 md:w-5 md:h-5 text-slate-400 hover:text-slate-600"} />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>نمایش شماره : غیر فعال</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        }
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="email" className="text-right"> ایمیل </Label>
                                        <Input readOnly id="email" value={rowData.email ? rowData.email : "ثبت نشده"} className="col-span-2" />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="address" className="text-right"> آدرس </Label>
                                        <Input readOnly id="address" value={rowData.address ? rowData.address : "ثبت نشده"} className="col-span-2" />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="agentId" className="text-right"> آیدی نماینده </Label>
                                        <Input readOnly id="agentId" value={rowData.agentId ? rowData.agentId.toString() : "ثبت نشده"} className="col-span-2" />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="createDate" className="text-right whitespace-nowrap"> زمان شروع کاربر </Label>
                                        <Input readOnly id="createDate" value={rowData.createDate ? new DateObject({ date: rowData.createDate }).convert(persian, persian_fa).format() : "ثبت نشده"} className="col-span-2" />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="modifiedDate" className="text-right whitespace-nowrap"> زمان ویرایش کاربر </Label>
                                        <Input readOnly id="modifiedDate" value={rowData.modifiedDate ? new DateObject({ date: rowData.modifiedDate }).convert(persian, persian_fa).format() : "ثبت نشده"} className="col-span-2" />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="chatId" className="text-right whitespace-nowrap">آیدی عددی کاربر</Label>
                                        <Input readOnly id="chatId" value={rowData.chatId ? rowData.chatId.toString() : "ثبت نشده"} className="col-span-2" />
                                    </div>

                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="showCardNumActive" className="text-right whitespace-nowrap">نمایش شماره کارت</Label>
                                        <Input readOnly id="showCardNumActive" value={rowData.cardToCardPayment == true ? "کلید شناسایی نشد!!" : "کلید شناسایی نشد!!"} className="col-span-2 text-red-600" />
                                    </div>

                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="userType" className="text-right whitespace-nowrap">نوع کاربر</Label>
                                        <Input readOnly id="userType" value={rowData.isAgent == true ? "نماینده" : "عادی"} className="col-span-2" />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="status" className="text-right whitespace-nowrap">وضعیت</Label>
                                        <Input readOnly id="status" value={inputValues.isBlocked == 'false' ? "فعال" : "غیرفعال"} className='col-span-2' />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="balance" className="text-right whitespace-nowrap">موجودی</Label>
                                        <Input readOnly dir='ltr' id="balance" value={rowData.balance.toString()} className={`col-span-2 text-right ${rowData.balance < 0 ? "text-red-600" : rowData.balance > 0 ? "text-green-600" : "text-slate-600"}`} />
                                    </div>
                                    <div className="grid grid-cols-2 col-span-2 items-center gap-2">
                                        <Label htmlFor="description" className="text-right whitespace-nowrap">توضیحات</Label>
                                        <Input readOnly id="description" value={inputValues.description ? inputValues.description : "ثبت نشده"} className='col-span-2' />
                                    </div>
                                </div>

                                <div>
                                    <h3 className='border-b-[1px] w-1/4 pb-2'>عملیات ها</h3>
                                    <div className='flex flex-wrap gap-2 py-4'>
                                        <Button onClick={() => dialogPageHandler("addDescription")}> افزودن توضیحات</Button>
                                        <Button onClick={() => dialogPageHandler("sendMessage")}>  ارسال پیام به کاربر</Button>
                                        <Button onClick={() => dialogPageHandler("disableUser")}>  غیرفعال کردن کاربر</Button>
                                        <Button onClick={() => dialogPageHandler("incBalance")}> افزودن موجودی</Button>
                                        <Button onClick={() => dialogPageHandler("decBalance")}> کاهش موجودی </Button>
                                        <Button onClick={() => dialogPageHandler("disableCardBeCarad")}>  غیرفعال کردن کارت به کارت</Button>
                                        <Button onClick={() => dialogPageHandler("makeAgent")}>  نماینده کردن کاربر</Button>
                                        <Button onClick={() => dialogPageHandler("transactions")}>  تراکنش ها</Button>
                                        <Button onClick={() => dialogPageHandler("roles")}>  نقش ها</Button>
                                        <Button onClick={() => dialogPageHandler("userAccess")}>  دسترسی های کاربر</Button>
                                    </div>

                                </div>

                                {/* 
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter> */}
                            </motion.div>)}

                        {dialogStep === "addDescription" && (
                            <motion.div
                                key="addDescription"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >
                                <form onSubmit={handleSubmit(UpdateUserInfo)}>
                                    {/* Add a hidden input field for user ID */}
                                    <input type="hidden" {...register("id")} value={rowData.id.toString()} />
                                    <div className="py-4 text-slate-500">
                                        <Label htmlFor="description" className="text-right">توضیحات</Label>
                                        <Input
                                            id="description"
                                            type={"text"}
                                            {...register("description")}
                                            value={inputValues.description}
                                            onChange={(e) => inputHandler(e, "description")}
                                            placeholder="توضیحات را وارد کنید..."
                                            className="w-full mt-2" />
                                    </div>
                                    <div className="flex justify-between">
                                        <Button variant="outline" onClick={() => dialogPageHandler("main")}>بازگشت</Button>
                                        <Button type="submit" disabled={isPending}>ذخیره</Button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* didn't find the query */}
                        {dialogStep === "sendMessage" && (
                            <motion.div
                                key="sendMessage"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >
                                <div className="py-4 text-slate-500">
                                    <Label htmlFor="Message" className="text-right"> پیام </Label>
                                    <Input id="Message" placeholder="پیام را وارد کنید..." className="w-full mt-2" />
                                </div>
                                <div className="flex justify-between mb-4">
                                    <Button variant="outline" onClick={() => dialogPageHandler("main")}>بازگشت</Button>
                                    <Button>ارسال</Button>
                                </div>
                                <div className="w-full h-[310px] space-y-4 p-4 bg-slate-100 rounded-xl">
                                    <h3 className="border-b-[1px] w-1/4 pb-2">تاریخچه پیام های ارسالی</h3>
                                    <div className="w-full h-[200px] flex items-center justify-center text-slate-300">پیامی برای نمایش وجود ندارد.</div>
                                </div>
                            </motion.div>
                        )}

                        {dialogStep === "disableUser" && (
                            <motion.div
                                key="disableUser"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full" >
                                <form onSubmit={handleSubmit(UpdateUserInfo)}>
                                    <input type="hidden" {...register("id")} value={rowData.id.toString()} />
                                    <div className="py-4 text-slate-500">
                                        <h2>کاربر
                                            {' '} {rowData.firstName}{' '}{rowData.lastName ? rowData.lastName : ""}{' '}
                                            {rowData.isBlocked ? 'فعال' : 'غیرفعال'}
                                            {' '}گردد؟
                                        </h2>
                                    </div>
                                    <div className="flex justify-between">
                                        <Button variant="outline" onClick={() => dialogPageHandler("main")}>انصراف</Button>
                                        <Button
                                            type="submit"
                                            {...register("isBlocked")}
                                            value={rowData.isBlocked ? 'false' : 'true'}
                                            onClick={() => setInputValues({ ...inputValues, isBlocked: rowData.isBlocked ? 'false' : 'true' })}
                                            disabled={isPending}>
                                            تایید
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {dialogStep === "incBalance" && (
                            <motion.div
                                key="incBalance"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >
                                <div className="py-4 text-slate-500">
                                    <Label htmlFor="Message" className="text-right"> پیام </Label>
                                    <Input id="Message" placeholder="پیام را وارد کنید..." className="w-full mt-2" />
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => dialogPageHandler("main")}>بازگشت</Button>
                                    <Button>ارسال</Button>
                                </div>
                            </motion.div>
                        )}

                        {dialogStep === "decBalance" && (
                            <motion.div
                                key="decBalance"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >
                                <div className="py-4 text-slate-500">
                                    <Label htmlFor="Message" className="text-right"> پیام </Label>
                                    <Input id="Message" placeholder="پیام را وارد کنید..." className="w-full mt-2" />
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => dialogPageHandler("main")}>بازگشت</Button>
                                    <Button>ارسال</Button>
                                </div>
                            </motion.div>
                        )}

                        {dialogStep === "disableCardBeCarad" && (
                            <motion.div
                                key="disableCardBeCarad"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >
                                <div className="py-4 text-slate-500">
                                    <Label htmlFor="Message" className="text-right"> پیام </Label>
                                    <Input id="Message" placeholder="پیام را وارد کنید..." className="w-full mt-2" />
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => dialogPageHandler("main")}>بازگشت</Button>
                                    <Button>ارسال</Button>
                                </div>
                            </motion.div>
                        )}

                        {dialogStep === "makeAgent" && (
                            <motion.div
                                key="makeAgent"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >
                                <div className="py-4 text-slate-500">
                                    <Label htmlFor="Message" className="text-right"> پیام </Label>
                                    <Input id="Message" placeholder="پیام را وارد کنید..." className="w-full mt-2" />
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => dialogPageHandler("main")}>بازگشت</Button>
                                    <Button>ارسال</Button>
                                </div>
                            </motion.div>
                        )}

                        {dialogStep === "transactions" && (
                            <motion.div
                                key="transactions"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >
                                <div className="py-4 text-slate-500">
                                    <Label htmlFor="Message" className="text-right"> پیام </Label>
                                    <Input id="Message" placeholder="پیام را وارد کنید..." className="w-full mt-2" />
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => dialogPageHandler("main")}>بازگشت</Button>
                                    <Button>ارسال</Button>
                                </div>
                            </motion.div>
                        )}

                        {dialogStep === "roles" && (
                            <motion.div
                                key="roles"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >
                                <div className="py-4 text-slate-500">
                                    <Label htmlFor="Message" className="text-right"> پیام </Label>
                                    <Input id="Message" placeholder="پیام را وارد کنید..." className="w-full mt-2" />
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => dialogPageHandler("main")}>بازگشت</Button>
                                    <Button>ارسال</Button>
                                </div>
                            </motion.div>
                        )}

                        {dialogStep === "userAccess" && (
                            <motion.div
                                key="userAccess"
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute pt-28 px-6 w-full"
                            >
                                <div className="py-4 text-slate-500">
                                    <Label htmlFor="Message" className="text-right"> پیام </Label>
                                    <Input id="Message" placeholder="پیام را وارد کنید..." className="w-full mt-2" />
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => dialogPageHandler("main")}>بازگشت</Button>
                                    <Button>ارسال</Button>
                                </div>
                            </motion.div>
                        )}
                    </DialogContent>


                </Dialog>

            </div>
        </>

    )
}
