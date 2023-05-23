export interface IApiResponse {
    successful: boolean;
    data:       any;
    message:    string;
    code: string;
    content: Array<any>;
    totalPages:number;
}
