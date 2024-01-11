export type StorageConfig = {
    /**
     * @description 采用哪种存储方式
     */
    type?: 'local' | 'session';
    /**
     * @description 存储的前缀
     */
    prefix?: string;
};
declare class Storage<T extends AnyObj> {
    storage: globalThis.Storage;
    prefix: string;
    constructor(params?: StorageConfig);
    get<K extends keyof T>(key: K): T[K];
    get<K extends keyof T>(key: K[]): Pick<T, K>;
    set<K extends keyof T>(key: K, data: T[K]): void;
    remove<K extends keyof T>(key: K | K[]): void;
    clear(): void;
    private addPrefix;
}
export default Storage;
