import { DefaultSendUserForm, DefaultStrapiFile, DefaultUser } from "./defaultTypes";

export type UserLoginForm = {
    identifier: string;
    password: string;
};

export type TypeMap = Record<string, CollectionTypesType | unknown> & {
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

export type SendUserFormType<T extends TypeMap> = T["user"] extends undefined
    ? DefaultSendUserForm
    : CollectionsSendType<T, "user">;

export type StrapiFileType<T extends TypeMap> = T["strapiFile"] extends undefined
    ? DefaultStrapiFile
    : T["strapiFile"];

export type UserType<T extends TypeMap> = T["user"] extends undefined
    ? DefaultUser
    : CollectionsGetType<T, "user">;
