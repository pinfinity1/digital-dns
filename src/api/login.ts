import client from "@/libs/axios";
import {LoginRequest, SuccessResponse} from "@/api/type";


export const LoginUser = async (payload: LoginRequest): Promise<SuccessResponse> => {
    const {data} = await client.post('/User/Login', payload);
    return data;
}