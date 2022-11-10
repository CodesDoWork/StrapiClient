import { DefaultSendUserForm, DefaultStrapiFile, DefaultUser } from "./defaultTypes";

export type UserLoginForm = {
    identifier: string;
    password: string;
};

export type TypeMap = Record<string, CollectionTypesType> & {
    user?: unknown;
    strapiFile?: unknown;
};

type CollectionTypesType = {
    get: unknown;
    send: unknown;
};

export type TypeOf<T extends TypeMap, K extends keyof T> = T[K];

export type SendUserFormType<T extends TypeMap, K extends keyof T> = T[K] extends undefined
    ? DefaultSendUserForm
    : T[K];

export type StrapiFileType<T extends TypeMap, K extends keyof T> = T[K] extends undefined
    ? DefaultStrapiFile
    : T[K];

export type UserType<T extends TypeMap, K extends keyof T> = T[K] extends undefined
    ? DefaultUser
    : T[K];
