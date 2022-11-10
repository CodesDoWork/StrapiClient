import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { StrapiErrorResponse } from "./types/responses";

const getData = <T>(res: AxiosResponse<T>) => res.data;

const mapError = (err: AxiosError<StrapiErrorResponse>) => {
    switch (err.code) {
        case "ERR_BAD_REQUEST":
            throw Error(err.response?.data?.error?.message || err.message);
        default:
            throw Error(err.message);
    }
};

export class ApiClient {
    private readonly axios: AxiosInstance;

    constructor(baseURL: string) {
        this.axios = axios.create({ baseURL });
    }

    get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axios
            .get(path, { ...this.getDefaultConfig(), ...config })
            .then(getData)
            .catch(mapError);
    }

    post<T>(path: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.axios
            .post(path, data, { ...this.getDefaultConfig(), ...config })
            .then(getData)
            .catch(mapError);
    }

    put<T>(path: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.axios
            .put(path, data, { ...this.getDefaultConfig(), ...config })
            .then(getData)
            .catch(mapError);
    }

    delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axios
            .delete(path, { ...this.getDefaultConfig(), ...config })
            .then(getData)
            .catch(mapError);
    }

    protected getDefaultConfig(): AxiosRequestConfig {
        return {};
    }
}
