import { DefaultSendUserForm, DefaultStrapiFile, DefaultUser } from "./defaultTypes";

export type TypeMap = Record<string, CollectionTypesType> & {
    users?: CollectionTypesType | unknown;
    "strapi-files"?: unknown;
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

export type SendUserFormType<T extends TypeMap> = undefined extends T["users"]
    ? DefaultSendUserForm
    : CollectionsSendType<T, "users">;

export type StrapiFileType<T extends TypeMap> = undefined extends T["strapi-files"]
    ? DefaultStrapiFile
    : CollectionsGetType<T, "strapi-files">;

export type UserType<T extends TypeMap> = undefined extends T["users"]
    ? DefaultUser
    : CollectionsGetType<T, "users">;

export type CollectionTypes<T extends TypeMap> = Omit<T, "users" | "strapi-files">;
