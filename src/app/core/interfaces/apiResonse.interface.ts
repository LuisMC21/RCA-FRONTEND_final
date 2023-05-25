export interface IApiResponse {
    successful: boolean;
    data:       any;
    message:    string;
    content: Array<any>;
    totalPages:number;
}