import { AxiosRequestConfig } from "axios";
import { getCookie, removeCookie, setCookie } from "./utils/cookies";
import { ApiClient } from "./ApiClient";
import { AuthResponse } from "./types/responses";
import { CollectionType } from "./CollectionType";
import {
    SendUserFormType,
    StrapiFileType,
    TypeMap,
    TypeOf,
    UserLoginForm,
    UserType,
} from "./types/models";

const API_TOKEN = "api_token";

export class StrapiClient<T extends TypeMap> extends ApiClient {
    constructor(url: string) {
        super(url + "/api");
    }

    signUp(user: SendUserFormType<T, "user">): Promise<AuthResponse<UserType<T, "user">>> {
        return this.post<AuthResponse<UserType<T, "user">>>("/auth/local/register", user).then(
            this.handleAuthResponse
        );
    }

    signIn(user: UserLoginForm): Promise<AuthResponse<UserType<T, "user">>> {
        return this.post<AuthResponse<UserType<T, "user">>>("/auth/local", user).then(
            this.handleAuthResponse
        );
    }

    async signOut(): Promise<void> {
        removeCookie(API_TOKEN);
    }

    uploadFile(data: FormData): Promise<StrapiFileType<T, "strapiFile">> {
        return this.post("/upload", data);
    }

    getMe(): Promise<UserType<T, "user">> {
        return this.get("/users/me");
    }

    collection = <C extends keyof T, I extends { get: unknown; send: unknown } = TypeOf<T, C>>(
        collection: C
    ) => new CollectionType<I["get"], I["send"]>(this, collection as string);

    protected override getDefaultConfig(): AxiosRequestConfig {
        const token = getCookie(API_TOKEN);

        return {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        };
    }

    private readonly handleAuthResponse = (
        res: AuthResponse<UserType<T, "user">>
    ): AuthResponse<UserType<T, "user">> => {
        setCookie(API_TOKEN, res.jwt, 120);

        return res;
    };
}
