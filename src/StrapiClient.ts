import { AxiosRequestConfig } from "axios";
import { getCookie, removeCookie, setCookie } from "./utils/cookies";
import { ApiClient } from "./ApiClient";
import { AuthResponse } from "./types/responses";
import { CollectionType } from "./CollectionType";
import { UserLoginForm } from "./types/models";
import {
    CollectionsGetType,
    CollectionsSendType,
    CollectionTypes,
    SendUserFormType,
    StrapiFileType,
    TypeMap,
    UserType,
} from "./types/typeMapping";

const API_TOKEN = "api_token";

export class StrapiClient<T extends TypeMap> extends ApiClient {
    constructor(url: string) {
        super(url + "/api");
    }

    signUp(user: SendUserFormType<T>): Promise<AuthResponse<UserType<T>>> {
        return this.post<AuthResponse<UserType<T>>>("/auth/local/register", user).then(
            this.handleAuthResponse
        );
    }

    signIn(user: UserLoginForm): Promise<AuthResponse<UserType<T>>> {
        return this.post<AuthResponse<UserType<T>>>("/auth/local", user).then(
            this.handleAuthResponse
        );
    }

    async signOut(): Promise<void> {
        removeCookie(API_TOKEN);
    }

    isLoggedIn(): boolean {
        return !!getCookie(API_TOKEN);
    }

    uploadFile(data: FormData): Promise<StrapiFileType<T>> {
        return this.post("/upload", data);
    }

    getMe(): Promise<UserType<T>> {
        return this.get("/users/me");
    }

    collection<C extends keyof CollectionTypes<T>>(collection: C) {
        return new CollectionType<CollectionsGetType<T, C>, CollectionsSendType<T, C>>(
            this,
            collection as string
        );
    }

    protected override getDefaultConfig(): AxiosRequestConfig {
        const token = getCookie(API_TOKEN);

        return {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        };
    }

    private readonly handleAuthResponse = (
        res: AuthResponse<UserType<T>>
    ): AuthResponse<UserType<T>> => {
        setCookie(API_TOKEN, res.jwt, 120);

        return res;
    };
}
