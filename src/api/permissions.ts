import client from "@/libs/axios";
import {SuccessResponse} from "@/types/common/BaseType";
import {getSession} from "next-auth/react";


export type AllPermissions = {
    "permissionId": number,
    "permissionName": string,
    "isAssigned": boolean,
    "title": string
}


export const GetAllPermissions = async (): Promise<SuccessResponse<AllPermissions[]>> => {
    const session = await getSession();
    const accessToken = session?.user?.accessToken
    const {data} = await client.get('/Authorization/GetAllPermissions/permissions', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return data;
}
