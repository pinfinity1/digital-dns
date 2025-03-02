import client from "@/lib/axios";
import {SuccessResponse} from "@/types/common/BaseType";


interface LoginRequest {
    chatId: number;
    password: string;
    email: string
}


type LoginResponse = {
    token: string;
    userName: string;
}

export const LoginUser = async (payload: LoginRequest): Promise<SuccessResponse<LoginResponse>> => {
    const {data} = await client.post('/User/Login', payload);
    return data;
}