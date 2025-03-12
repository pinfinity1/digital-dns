import { EditIcon, EyeClosed, EyeIcon, LucideView, ShowerHeadIcon, View, ViewIcon } from 'lucide-react'
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

export default function UserRow({ data }) {

    const [dialogStep, setDialogStep] = useState("main");


    return (<>
        <div className='flex justify-center'>
            <Avatar>
                <AvatarImage src={data.avatar ? data.avatar : "https://github.com/shadcn.png"} alt="user_profile-image" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {data.avatar}</div>
        <div className='flex justify-center'>{data.firstName}</div>
        <div className='flex justify-center'>{data.telegramUsername ? data.telegramUsername : "ثبت نشده"}</div>
        <div className='flex justify-center'>{data.isAgent ? "نماینده" : "عادی"}</div>
        <div className='flex justify-center'>
            {data.isBlocked ?
                <Badge className='bg-red-400 text-red-700 hover:bg-red-400'>مسدود شده</Badge>
                : <Badge className='bg-green-400 text-green-700 hover:bg-green-400'>فعال</Badge>}
        </div>
        <div dir='ltr'
            className='flex justify-center'>
            {data.balance < 0 ? <Label className='text-red-600'>{data.balance}</Label>
                : data.balance == 0 ? <Label className='text-slate-500'>&#8210;</Label>
                    : <Label className='text-green-600'>{data.balance}</Label>}</div>
        <div className='flex justify-center gap-4'>
            <Dialog>
                <DialogTrigger asChild>

                                <EyeIcon className={"w-4 h-4 md:w-5 md:h-5 text-slate-400 cursor-pointer hover:text-slate-600"} />

                </DialogTrigger>
                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="sm:max-w-[900px] h-[600px] overflow-hidden">

                    <DialogHeader>
                        <DialogTitle className='border-b-2 w-1/4 pb-2'>
                        {dialogStep === "main" ? "مشخصات کاربر" : "افزودن توضیحات"}
                        </DialogTitle>
                        <DialogDescription className='pt-2 text-base'>
                            آیدی: {data.id}
                        </DialogDescription>
                    </DialogHeader>

                    {dialogStep === "main" && (
                        <motion.div
                        key="main"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute pt-24 px-6 w-full"
                    >

                    <div className="grid grid-cols-4 gap-4 py-4 text-slate-500">
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="username" className="text-right whitespace-nowrap"> نام کاربر </Label>
                            <Input readOnly id="username" value={data.firstName ? data.firstName : "ثبت نشده"} className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="username" className="text-right whitespace-nowrap"> نام خانوادگی کاربر </Label>
                            <Input readOnly id="username" value={data.lastName ? data.lastName : "ثبت نشده"} className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="TelegramID" className="text-right whitespace-nowrap"> آیدی تلگرام </Label>
                            <Input readOnly id="TelegramID" value={data.telegramUsername ? data.telegramUsername : "ثبت نشده"} className="col-span-2" />
                        </div>
                        <div className="relative grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="mobile" className="text-right"> موبایل </Label>

                            <Input readOnly id="mobile" value={data.mobile ? data.mobile : "ثبت نشده"} className="col-span-2" />
                            {data.isMobileActive ?
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
                            <Input readOnly id="email" value={data.email ? data.email : "ثبت نشده"} className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="address" className="text-right"> آدرس </Label>
                            <Input readOnly id="address" value={data.address ? data.address : "ثبت نشده"} className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="agentId" className="text-right"> آیدی نماینده </Label>
                            <Input readOnly id="agentId" value={data.agentId ? data.agentId : "ثبت نشده"} className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="createDate" className="text-right whitespace-nowrap"> زمان شروع کاربر </Label>
                            <Input readOnly id="createDate" value={data.createDate ? new DateObject({ date: data.createDate }).convert(persian, persian_fa).format() : "ثبت نشده"} className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="modifiedDate" className="text-right whitespace-nowrap"> زمان ویرایش کاربر </Label>
                            <Input readOnly id="modifiedDate" value={data.modifiedDate ? new DateObject({ date: data.modifiedDate }).convert(persian, persian_fa).format() : "ثبت نشده"} className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="chatId" className="text-right whitespace-nowrap">آیدی عددی کاربر</Label>
                            <Input readOnly id="chatId" value={data.chatId ? data.chatId : "ثبت نشده"} className="col-span-2" />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="showCardNumActive" className="text-right whitespace-nowrap">نمایش شماره کارت</Label>
                            <Input readOnly id="showCardNumActive" value={data.cardToCardPayment == true ? "کلید شناسایی نشد!!" : "کلید شناسایی نشد!!"} className="col-span-2 text-red-600" />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="userType" className="text-right whitespace-nowrap">نوع کاربر</Label>
                            <Input readOnly id="userType" value={data.isAgent == true ? "نماینده" : "عادی"} className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="status" className="text-right whitespace-nowrap">وضعیت</Label>
                            <Input readOnly id="status" value={data.isBlocked == false ? "فعال" : "غیرفعال"} className='col-span-2' />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="balance" className="text-right whitespace-nowrap">موجودی</Label>
                            <Input readOnly dir='ltr' id="balance" value={data.balance} className={`col-span-2 text-right ${data.balance < 0 ? "text-red-600" : data.balance > 0 ? "text-green-600" : "text-slate-600"}`} />
                        </div>
                        <div className="grid grid-cols-2 col-span-2 items-center gap-2">
                            <Label htmlFor="description" className="text-right whitespace-nowrap">توضیحات</Label>
                            <Input readOnly id="description" value={data.description ? data.description : "ثبت نشده"} className='col-span-2' />
                        </div>
                    </div>

                    <div>
                        <h3 className='border-b-2 w-1/4 pb-2'>عملیات ها</h3>
                        <div className='flex flex-wrap gap-2 p-2'>
                            <Button onClick={() => setDialogStep("addDescription")}> افزودن توضیحات</Button>
                            <Button>  ارسال پیام به کاربر</Button>
                            <Button>  غیرفعال کردن کاربر</Button>
                            <Button> افزودن موجودی</Button>
                            <Button> کاهش موجودی </Button>
                            <Button>  غیرفعال کردن کارت به کارت</Button>
                            <Button>  نماینده کردن کاربر</Button>
                            <Button>  تراکنش ها</Button>
                            <Button>  نقش ها</Button>
                            <Button>  دسترسی های کاربر</Button>
                        </div>

                    </div>
                    
                    {/* <DialogFooter>
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
                             className="absolute pt-24 px-6 w-full"
                         >
                            <div className="py-4 text-slate-500">
                                <Label htmlFor="note" className="text-right">توضیحات</Label>
                                <Input id="note" placeholder="توضیحات را وارد کنید..." className="w-full mt-2" />
                            </div>
                            <div className="flex justify-between">
                                <Button variant="outline" onClick={() => setDialogStep("main")}>بازگشت</Button>
                                <Button>ذخیره</Button>
                            </div>
                        </motion.div>
                    )}
                </DialogContent>


            </Dialog>

        </div>
    </>

    )
}
