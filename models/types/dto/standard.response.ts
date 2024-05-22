export type Response<DataType> = {
    status: number;
    code: number;
    data?: DataType;
    message?: string
}