"use client"

import React, {createContext, useEffect, useState} from "react";
import {AllPermissions, GetAllPermissions} from "@/api/permissions";
import {useQuery} from "@tanstack/react-query";


interface PermissionsContextType {
    permissions: AllPermissions[];
}

const PermissionContext = createContext<PermissionsContextType>({permissions: []})

export const PermissionProvider = ({children}: { children: React.ReactNode }) => {
    const [permissions, setPermissions] = useState<AllPermissions[]>([]);
    
    const {data} = useQuery({
        queryKey: ["permissions"],
        queryFn: GetAllPermissions,
    });
    
    useEffect(() => {
        if(data) {
            setPermissions(data.data);
        }
    }, [data]);
    
    
    return (
        <PermissionContext.Provider value={{permissions}}>
            {children}
        </PermissionContext.Provider>
    )
}