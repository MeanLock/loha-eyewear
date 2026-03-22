export interface User {
    id: string;
    email: string;
    full_name: string;
    role: "admin" | "staff" | "customer" | "manager";
}

export interface LoginResponse {
    statusCode: number;
    message: string;
    data: {
        access_token: string;
        user: User;
    };
}