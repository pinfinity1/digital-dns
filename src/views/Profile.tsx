"use client"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getApiV1UserGetMeOptions, putApiV1UserUpdateProfileMutation} from "@/client/@tanstack/react-query.gen";
import {useForm} from "react-hook-form";
import {File, UserDto} from "@/client";
import {Loading} from "@/components/loading/Loading";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Pencil} from "lucide-react";


interface ProfileUpdateDto {
    Email?: string;
    FirstName: string;
    LastName: string;
    Avatar?: Blob | File;
    Address?: string;
    Mobile?: string;
}


export default function Profile () {
    // const [userData, setUserData] = useState<ProfileUpdateDto>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    
    const {register, handleSubmit, reset, watch} = useForm<UserDto>();
    
    // const queryClient = useQueryClient();
    
    
    const {data, isLoading, error} = useQuery(
        getApiV1UserGetMeOptions()
    )
    
    const {mutate: updateUserProfile, isPending} = useMutation({
        ...putApiV1UserUpdateProfileMutation(),
        onSuccess: (data) => {
            if(typeof data === "string") {
                const parsedData = JSON.parse(data);
                if(parsedData?.isSuccess) {
                    toast.success(parsedData?.message)
                }
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error("ویرایش اطلاعات با مشکل مواجه شد")
        },
    });
    
    useEffect(() => {
        if(data) {
            if(data) {
                try {
                    const parsedData = typeof data === "string" ? JSON.parse(data) : data
                    console.log(parsedData)
                    if(parsedData) {
                        reset(parsedData?.data)
                        setUserAvatar(parsedData?.data?.avatar);
                    }
                } catch (error) {
                    console.error("Error getting admin agent information", error);
                }
            }
        }
    }, [data]);
    
    const avatarFile = watch("avatar");
    
    useEffect(() => {
        if(avatarFile && avatarFile[0]) {
            const file = avatarFile[0] as File;
            setSelectedFile(file);
        }
    }, [avatarFile, selectedFile]);
    
    
    if(isLoading) return (
        <div className={"w-full h-[280px] flex items-center justify-center border rounded"}><Loading/></div>)
    
    if(error) {
        return <div>Error {error instanceof Error ? error.message : "Unknown error"}</div>;
    }
    
    
    const updateUserProfileData = (formData: ProfileUpdateDto) => {
        const formDataToSend = new FormData();
        
        console.log(formData);
        
        updateUserProfile({
            body: formDataToSend,
        });
    }
    
    
    return (
        <div className={"w-full border rounded px-6 py-8"}>
            <form onSubmit={handleSubmit(updateUserProfileData)}
                  className={"grid grid-cols-5 gap-4"}>
                <p className={"col-span-5 text-md font-semibold"}>اطلاعات نماینده</p>
                <div className={"col-span-5 lg:col-span-2 gap-4"}>
                    <div className={"col-span-4 sm:col-span-2 space-y-2 flex items-center justify-center"}>
                        <Label htmlFor="Avatar"
                               className="text-right w-fit flex items-center gap-0.5 relative">
                            {selectedFile ? (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Selected Avatar"
                                    className="w-28 h-28 rounded-full object-cover"
                                />
                            ) : (
                                <img
                                    src={userAvatar || "/images/Users.jpg"}
                                    alt="Default Avatar"
                                    className="w-28 h-28 rounded-full object-cover"
                                />
                            )}
                            <div
                                onClick={() => document.getElementById("Avatar")?.click()}
                                className={"w-8 h-8 absolute bottom-0 -left-2 bg-black/10 rounded-full flex items-center justify-center cursor-pointer"}
                            >
                                <Pencil size={16}/>
                            </div>
                        </Label>
                        <Input
                            id={"Avatar"}
                            type={"file"}
                            className={"hidden"}
                            {...register("avatar")}
                        />
                        {selectedFile && (
                            <div className="mt-2">
                                {selectedFile.type.startsWith("image/") ? (
                                    // Display image preview
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected Avatar"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                ) : (
                                    // Display file name
                                    <p className="text-sm text-gray-600">{selectedFile.name}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className={"col-span-5 lg:col-span-3 grid grid-cols-4 gap-5"}>
                    <div className={"col-span-4 sm:col-span-2 space-y-2"}>
                        <Label htmlFor="FirstName" className="text-right flex items-center gap-0.5">
                            نام
                        </Label>
                        <Input
                            id={"FirstName"}
                            type={"text"}
                            {...register("firstName")}
                        />
                    </div>
                    <div className={"col-span-4 sm:col-span-2 space-y-2"}>
                        <Label htmlFor="LastName" className="text-right flex items-center gap-0.5">
                            نام خانوادگی
                        </Label>
                        <Input
                            id={"LastName"}
                            type={"text"}
                            {...register("lastName")}
                        />
                    </div>
                    <div className={"col-span-4 sm:col-span-2 space-y-2"}>
                        <Label htmlFor="Mobile" className="text-right flex items-center gap-0.5">
                            شماره مبایل
                        </Label>
                        <Input
                            id={"Mobile"}
                            type={"tel"}
                            {...register("mobile")}
                        />
                    </div>
                    <div className={"col-span-4 sm:col-span-2 space-y-2"}>
                        <Label htmlFor="Email" className="text-right flex items-center gap-0.5">
                            ایمیل
                        </Label>
                        <Input
                            id={"Email"}
                            type={"email"}
                            {...register("email")}
                        />
                    </div>
                    <div className={"col-span-4 sm:col-span-2 space-y-2"}>
                        <Label htmlFor="Address" className="text-right flex items-center gap-0.5">
                            آدرس
                        </Label>
                        <Input
                            id={"Address"}
                            type={"text"}
                            {...register("address")}
                        />
                    </div>
                    <div className={"col-span-4 w-full flex justify-end "}>
                        <Button className={"w-full sm:w-fit"} type="submit" disabled={isPending}>ثبت تغییرات
                            پروفایل</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}