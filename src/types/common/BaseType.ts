// class BaseType<T> {
//     data: T
//     statusCode: StatusCode
//     isSuccess: true = false
//     message: string | null = ""
//     jsonValidationMessage: string | null = null
// }

export type SuccessResponse<T> = {
    data: T;
    isSuccess: boolean;
    statusCode: number;
    message: string;
    jsonValidationMessage: string;
};

