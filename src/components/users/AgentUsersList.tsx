"use client"
import React, { useEffect, useState } from 'react'
import UserRow from './UserRow';
import { Loading } from '../loading/Loading';
import { UserDto } from '@/client';
import { useQuery } from '@tanstack/react-query';
import { getApiV1UserGetAgentUsersFilterOptions } from '@/client/@tanstack/react-query.gen';
import { Combobox } from '../ui/Combobox';
import { User } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export default function AgentUsersList() {

    const usertypes = [
        {
            value: "all",
            label: "همه",
        },
        {
            value: "regular",
            label: "عادی",
        },
        {
            value: "agent",
            label: "نماینده",
        },
    ]
    const [usersInfo, setUsersInfo] = useState<UserDto[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [value, setValue] = React.useState("")
    const [paginationConfig, setPaginationConfig] = React.useState({ show: true, isMultiple: false, page: 1 })


    const { data, isLoading, error } = useQuery({
        // ...getApiV1UserGetAgentUsersOptions()
        ...getApiV1UserGetAgentUsersFilterOptions()
    }
    )

    useEffect(() => {
        if (data) {
            try {
                const parsedData = typeof data === "string" ? JSON.parse(data) : data
                if (parsedData) {
                    if (value === "agent") {
                        setUsersInfo(parsedData.data.entities.filter((findItem: UserDto) => (findItem.isAgent == true)))
                    }
                    else if (value === "regular") {
                        setUsersInfo(parsedData.data.entities.filter((findItem: UserDto) => (findItem.isAgent == false)))
                    }
                    else {
                        setUsersInfo(parsedData.data.entities);

                        console.log("usersInfo:", parsedData.data);
                        console.log("usersInfo:", parsedData);
                    }
                }
            } catch (error) {
                console.error("Error getting admin agent information", error);
            }
        }
    }, [data, value]);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        console.log(e.target.value);
    }

    if (isLoading) {
        return (
            <div
                className={"col-span-6 xl:col-span-3 w-full h-[200px] flex flex-col border rounded-xl shadow space-y-1"}>
                <div className={"w-full h-[52px] flex items-center justify-between border-b px-6 shadow-sm"}>
                    <h3 className={"w-24 h-8 rounded-md bg-black/30 animate-pulse"}></h3>
                </div>
                <div className={"w-full flex-1 flex items-center justify-center"}>
                    <Loading />
                </div>
            </div>
        )
    }

    if (error) {
        return <div>Error {error instanceof Error ? error.message : "Unknown error"}</div>;
    }


    return (
        <>
            <div className={"col-span-6 w-full h-full pt-4 space-y-4 "}>
               {/*  <div className={"w-full h-[52px] flex items-center justify-between border-b px-6 shadow-sm"}>
                    <h3 className={"font-semibold"}>کاربران</h3>
                </div> */}
                     <div className='w-full flex justify-start items-center gap-2 px-4'>
                        <Label className='whitespace-nowrap'>نوع کاربر </Label>
                        <Combobox value={value} onChange={setValue} Searchable={false} items={usertypes} placeholder={"انتخاب کنید"} label={"نوع کاربر"} />
                        <Label className='whitespace-nowrap mr-4' htmlFor="search">جستجوی نام کاربری</Label>
                        <Input value={searchTerm} onChange={(e) => handleSearchInput(e)} className='w-48' id='search' type="text" placeholder="تایپ کنید..." />
                    </div>
                <div className='flex flex-col items-center justify-center space-y-2 space-x-0 gap-4 border rounded-xl shadow overflow-hidden'>
                    <div className={" w-full h-full rounded-xl "}>
                        <div className="w-full ">
                            <div className="w-full items-center text-slate-400 font-semibold h-16 px-4 grid grid-cols-[.5fr_2fr_2fr_1fr_1fr_.5fr_.5fr] gap-4 bg-slate-200">
                                <div className='flex justify-center'><User className={"w-4 h-4 md:w-5 md:h-5"} /></div>
                                <h3 className='flex justify-center'> نام کاربری</h3>
                                <h3 className='flex justify-center'> آیدی تلگرام</h3>
                                <h3 className='flex justify-center'> نوع کاربر</h3>
                                <h3 className='flex justify-center'> وضعیت</h3>
                                <h3 className='flex justify-center'> موجودی </h3>
                                <h3 className='flex justify-center'>  عملیات ها </h3>
                            </div>

                            {usersInfo?.map((item) => (
                                <div
                                    key={item.id}
                                    className="w-full h-16 grid items-center text-slate-500 border-b grid-cols-[.5fr_2fr_2fr_1fr_1fr_.5fr_.5fr] gap-4 px-4 even:bg-gray-100 odd:bg-white hover:bg-green-100 transition-all duration-300">
                                    <UserRow rowData={item}/>
                                </div>))}
                        </div>
                    </div>

                    
                </div>

                    <Pagination style={{ display: paginationConfig.show ? "flex" : "none" }} className='mb-2'>
                        <PaginationContent>
                            <div className={`${paginationConfig.page == 1 ? "" : ""}`} >
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                            </div>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem style={{ display: paginationConfig.isMultiple ? "flex" : "none" }}>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

            </div>
        </>
    )
}
