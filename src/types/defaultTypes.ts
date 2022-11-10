export type DefaultUser = {
    username: string;
    email: string;
    provider?: string;
    confirmed?: boolean;
    blocked?: boolean;
    role?: DefaultRole;
    id: number;
};

export type DefaultRole = {
    name: string;
    description?: string;
    type?: string;
    permissions?: DefaultPermission[];
    users?: DefaultUser[];
};

export type DefaultPermission = {
    action: string;
    role?: DefaultRole;
};

export type DefaultStrapiFile = {
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: string;
    hash: string;
    ext?: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: string;
    related?: unknown[];
};

export type DefaultSendUserForm = Record<string, unknown> & {
    username: string;
    email: string;
};
