"use client"

import React, {createContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getApiV1AuthorizationGetUserRolePermissionsOptions} from "@/client/@tanstack/react-query.gen";
import {GetApiV1AuthorizationGetUserRolePermissionsResponse, UserRolePermissionsDtoListApiResult} from "@/client";


interface PermissionsContextType {
    permissions: GetApiV1AuthorizationGetUserRolePermissionsResponse;
    role: { roleId: number, roleName: string }
}

export const PermissionContext = createContext<PermissionsContextType | undefined>(undefined)

export const PermissionProvider = ({children}: { children: React.ReactNode }) => {
    const [permissions, setPermissions] = useState<UserRolePermissionsDtoListApiResult>();
    const [role, setRole] = useState<{ roleId: number, roleName: string }>({roleId: null, roleName: ""});
    
    
    const {data} = useQuery({
        ...getApiV1AuthorizationGetUserRolePermissionsOptions()
    })
    
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
                console.error("Error parsing permissions data:", error);
            }
        }
    }, [data]);
    
    
    return (
        <PermissionContext.Provider value={{permissions, role}}>
            {children}
        </PermissionContext.Provider>
    )
}