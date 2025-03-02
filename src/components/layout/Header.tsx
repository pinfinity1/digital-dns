"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react";
import {
    Bell,
    CircleCheckBig,
    CircleFadingArrowUp,
    CircleUser,
    DollarSign,
    LayoutGrid,
    LogOut,
    User,
    Zap
} from "lucide-react";
import Link from "next/link";
import {signOut} from "next-auth/react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


export const Header = () => {
    const router = useRouter()
    
    const handleSignOut = async () => {
        try {
            await signOut({redirect: false});
            router.push("/login");
        } catch (error) {
            console.error(error);
            toast.error("مشکلی بوجود آمده");
        }
    }
    
    
    return (
        <div
            className={"w-full max-w-[1280px] rounded-b-lg md:rounded-b-3xl border border-colors-grey-shade-65 shadow border-t-0 flex items-center justify-between bg-black/10 p-3 md:py-4 md:px-6"}>
            <div>logo</div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className={"px-1 bg-transparent"}>
                            <CircleUser size={20}/>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className={"p-0"}>
                            <ul className="grid gap-3 p-6 w-[340px] md:w-[500px] lg:grid-cols-2">
                                <li className="row-span-3 flex items-center justify-end gap-4 lg:flex-col-reverse">
                                    <div dir={"rtl"}>
                                        <div className={"flex items-center gap-2"}>
                                            <p>نام کاربری:</p>
                                            <p>منشسیرم</p>
                                        </div>
                                        <div className={"flex items-center gap-2 text-sm"}>
                                            <p>موجودی:</p>
                                            <p>۱۰۰۰ تومان</p>
                                        </div>
                                    </div>
                                    <div className={"w-[100px] h-[100px] rounded-full bg-black"}>
                                    </div>
                                </li>
                                <div className={"space-y-2"}>
                                    <Link href="/profile" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={`${navigationMenuTriggerStyle()} !w-full !justify-end gap-1 text-[14px] md:text-[16px] hover:bg-black hover:text-white rounded-md !transition-all !duration-200 `}>
                                            پروفایل
                                            <User className={"w-4 h-4 md:w-5 md:h-5"}/>
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link href="/transaction" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={`${navigationMenuTriggerStyle()} !w-full !justify-end gap-1 text-[14px] md:text-[16px] hover:bg-black hover:text-white rounded-md !transition-all !duration-200 `}>
                                            تراکنش ها
                                            <DollarSign className={"w-4 h-4 md:w-5 md:h-5"}/>
                                        </NavigationMenuLink>
                                    </Link>
                                    <div
                                        onClick={handleSignOut}
                                        className={"w-full flex items-center justify-end gap-1 py-2 px-4 text-[14px] md:text-[16px] hover:bg-red-100 hover:text-red-600 rounded-md transition-all duration-200 cursor-pointer"}>
                                        <p>خروج</p>
                                        <LogOut className={"w-4 h-4 md:w-5 md:h-5"}/>
                                    </div>
                                </div>
                            
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className={"px-1 bg-transparent"}>
                            <Bell size={20}/>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className={"w-[280px] md:w-[356px] flex flex-col items-center"}>
                                <div className={"py-3"}>
                                    <p>اعلانی برای نمایش وجود ندارد</p>
                                </div>
                                <div className={"w-full h-[1px] bg-colors-grey-shade-75"}></div>
                                <Link href="/notifications" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} !w-full !rounded-none text-center !py-2 hover:bg-colors-grey-shade-75 transition-all duration-200 cursor-pointer`}>
                                        مشاهده همه
                                    </NavigationMenuLink>
                                </Link>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className={"px-1 bg-transparent"}>
                            <LayoutGrid size={20}/>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-3 p-4 md:w-[280px] grid-cols-2">
                                <li className={"col-span-1 flex flex-col items-center gap-2 hover:bg-black hover:text-white p-1.5 py-2 rounded cursor-pointer transition-all duration-200"}>
                                    <CircleCheckBig className={"w-4 h-4 md:w-5 md:h-5"}/>
                                    <span className={"text-[12px] md:text-sm"}>V2Ray NG</span>
                                </li>
                                <li className={"col-span-1 flex flex-col items-center gap-2 hover:bg-black hover:text-white p-1.5 py-2 rounded cursor-pointer transition-all duration-200"}>
                                    
                                    <Zap className={"w-4 h-4 md:w-5 md:h-5"}/>
                                    <span className={"text-[12px] md:text-sm"}>WireGuard</span>
                                </li>
                                <li className={" col-span-1 flex flex-col items-center gap-2 hover:bg-black hover:text-white p-1.5 py-2 rounded cursor-pointer transition-all duration-200"}>
                                    
                                    <CircleFadingArrowUp className={"w-4 h-4 md:w-5 md:h-5"}/>
                                    <span className={"text-[12px] md:text-sm"}>Apple ID</span>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}


