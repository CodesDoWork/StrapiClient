import { StrapiError, StrapiObject } from "./models";

export type AuthResponse<U> = {
    jwt: string;
    user: U;
};

export type StrapiErrorResponse = {
    data: null;
    error: StrapiError;
};

export type CollectionFindResponse<T> = DataResponse<StrapiObject<T>[]> & {
    meta: Pagination;
};

export type CollectionFindOneResponse<T> = DataResponse<StrapiObject<T>> & {
    meta: {};
};

export type DataResponse<T> = {
    data: T;
};

export type Pagination = {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
};
