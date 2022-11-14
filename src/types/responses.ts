import { StrapiError } from "./models";

export type AuthResponse<U> = {
    jwt: string;
    user: U;
};

export type StrapiErrorResponse = DataResponse<null> & {
    error: StrapiError;
};

export type CollectionFindResponse<T> = DataResponse<T[]> & {
    meta: {
        pagination: Pagination;
    };
};

export type DataResponse<T> = {
    data: T;
};

export type Pagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
};
