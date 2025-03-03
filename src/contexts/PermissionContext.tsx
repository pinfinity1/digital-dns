"use client"

import React, {createContext, useEffect, useState} from "react";
import {GetApiV1AuthorizationGetUserRolePermissionsResponse, UserRolePermissionsDtoListApiResult} from "@/client";
import {useQuery} from "@tanstack/react-query";
import {getApiV1AuthorizationGetUserRolePermissionsOptions} from "@/client/@tanstack/react-query.gen";
import {Loading} from "@/components/loading/Loading";


interface PermissionsContextType {
    permissions: GetApiV1AuthorizationGetUserRolePermissionsResponse;
    role: { roleId: number, roleName: string }
}

export const PermissionContext = createContext<PermissionsContextType | undefined>(undefined)

export const PermissionProvider = ({children}: { children: React.ReactNode }) => {
    const [permissions, setPermissions] = useState<UserRolePermissionsDtoListApiResult>();
    const [role, setRole] = useState<{ roleId: number | null, roleName: string }>({roleId: null, roleName: ""});
    
    
    const {data, isLoading, error} = useQuery(
        getApiV1AuthorizationGetUserRolePermissionsOptions()
    );
    
    
    useEffect(() => {
        if(data) {
            try {
                const parsedData = typeof data === "string" ? JSON.parse(data) : data;
                if(parsedData?.data) {
                    setPermissions(parsedData?.data?.[0]?.permissions);
                    setRole({
                        roleId: parsedData?.data?.[0]?.roleId,
                        roleName: parsedData?.data?.[0]?.roleName,
                    });
                }
            } catch (error) {
                console.error("Error parse data:", error);
            }
        }
    }, [data]);
    
    
    if(isLoading) {
        return <Loading/>;
    }
    
    if(error) {
        return <div>Error loading permissions: {error instanceof Error ? error.message : "Unknown error"}</div>;
    }
    
    
    return (
        <PermissionContext.Provider value={{permissions, role}}>
            {children}
        </PermissionContext.Provider>
    )
}