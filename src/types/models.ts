export type UserLoginForm = {
    identifier: string;
    password: string;
};

export type StrapiError = {
    details: object;
    message: string;
    name: string;
    status: number;
};
