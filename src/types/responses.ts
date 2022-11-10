export type AuthResponse<U> = {
    jwt: string;
    user: U;
};

export type StrapiErrorResponse = {
    data: null;
    error: StrapiError;
};

export type StrapiError = {
    details: object;
    message: string;
    name: string;
    status: number;
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

export type StrapiObject<T> = {
    id: number;
    attributes: T & {
        createdAt: string;
        updatedAt: string;
    };
};

export type Pagination = {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
};
