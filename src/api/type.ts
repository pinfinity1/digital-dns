export interface LoginRequest {
    chatId: number;
    password: string;
    email: string
}

export interface SuccessResponse {
    data:any;
    isSuccess : string;
    jsonValidationMessage:null;
    message:string;
    statusCode: number;
}