"use client"
import {useContext} from "react";
import {PermissionContext} from "@/contexts/PermissionContext";


export const usePermission = () => {
    const {permissions} = useContext(PermissionContext);
    
    function hasPermission (permissionName: string): boolean {
        if(Array.isArray(permissions)) {
            return permissions.some(
                (permission) => permission.permissionName === permissionName
            );
        }
        return false;
    }
    
    return hasPermission;
}