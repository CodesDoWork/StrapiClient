export type UserLoginForm = {
    identifier: string;
    password: string;
};

export type StrapiObject<T> = {
    id: number;
    attributes: T & {
        createdAt: string;
        updatedAt: string;
    };
};

export type StrapiError = {
    details: object;
    message: string;
    name: string;
    status: number;
};
