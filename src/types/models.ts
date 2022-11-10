import { DefaultSendUserForm, DefaultStrapiFile, DefaultUser } from "./defaultTypes";

export type UserLoginForm = {
    identifier: string;
    password: string;
};

export type TypeMap = Record<string, CollectionTypesType> & {
    user?: CollectionTypesType | unknown;
    strapiFile?: unknown;
};

export type CollectionTypesType = {
    get: unknown;
    send: unknown;
};

export type CollectionsGetType<
    T extends TypeMap,
    K extends keyof T
> = T[K] extends CollectionTypesType ? T[K]["get"] : T[K];

export type CollectionsSendType<
    T extends TypeMap,
    K extends keyof T
> = T[K] extends CollectionTypesType ? T[K]["send"] : T[K];

export type SendUserFormType<T extends TypeMap> = undefined extends T["user"]
    ? DefaultSendUserForm
    : CollectionsSendType<T, "user">;

export type StrapiFileType<T extends TypeMap> = undefined extends T["strapiFile"]
    ? DefaultStrapiFile
    : T["strapiFile"];

export type UserType<T extends TypeMap> = undefined extends T["user"]
    ? DefaultUser
    : CollectionsGetType<T, "user">;
