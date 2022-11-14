export type DefaultUser = {
    username: string;
    email: string;
    provider: string | null;
    confirmed: boolean;
    blocked: boolean;
    role: DefaultRole | null;
    id: number;
    createdAt: string;
    updatedAt: string;
};

export type DefaultRole = {
    name: string;
    description: string | null;
    type: string | null;
    permissions: DefaultPermission[] | null;
    users: DefaultUser[] | null;
    id: number;
    createdAt: string;
    updatedAt: string;
};

export type DefaultPermission = {
    action: string;
    role: DefaultRole | null;
    id: number;
    createdAt: string;
    updatedAt: string;
};

export type DefaultStrapiFile = {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: string | null;
    hash: string;
    ext: string | null;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    related: unknown[] | null;
    id: number;
    createdAt: string;
    updatedAt: string;
};

export type DefaultSendUserForm = Record<string, unknown> & {
    username: string;
    email: string;
};
