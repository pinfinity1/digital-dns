import { EditIcon, EyeIcon, LucideView, ShowerHeadIcon, View, ViewIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'

export default function UserRow({ data }) {
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
            <EditIcon className={"w-4 h-4 md:w-5 md:h-5 text-slate-400 cursor-pointer hover:text-slate-600"} />
            <EyeIcon className={"w-4 h-4 md:w-5 md:h-5 text-slate-400 cursor-pointer hover:text-slate-600"} />
        </div>
    </>

    )
}
