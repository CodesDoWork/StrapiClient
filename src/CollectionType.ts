import { ApiClient } from "./ApiClient";
import { CollectionFindResponse } from "./types/responses";

export class CollectionType<T, S> {
    constructor(private readonly client: ApiClient, private readonly name: string) {}

    getAll(options?: string): Promise<CollectionFindResponse<T>> {
        return this.client.get(this.buildPath(options));
    }

    get(id: number): Promise<T> {
        return this.client.get(this.buildPath(id));
    }

    post(item: S): Promise<T> {
        return this.client.post(this.buildPath(), { data: item });
    }

    put(item: S & { id: number }): Promise<T> {
        return this.client.put(this.buildPath(item.id), {
            data: item,
        });
    }

    delete(id: number): Promise<T> {
        return this.client.delete(this.buildPath(id));
    }

    private buildPath(path?: string | number) {
        const showSlash = path !== undefined && (typeof path !== "string" || !path.startsWith("?"));

        return `/${this.name}${showSlash ? "/" : ""}${path ?? ""}`;
    }
}
