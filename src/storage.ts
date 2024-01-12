export type StorageConfig = {
    /**
     * @description 采用哪种存储方式
     */
    type?: 'local' | 'session'
    /**
     * @description 存储的前缀
     */
    prefix?: string
}

export class Storage<T extends AnyObj> {
    storage: globalThis.Storage
    prefix: string
    constructor(params?: StorageConfig) {
        const { type = 'local', prefix = '' } = params || {}
        this.prefix = prefix
        if (type === 'local') {
            this.storage = window.localStorage
        } else {
            this.storage = window.sessionStorage
        }
    }
    get<K extends keyof T>(key: K): T[K]
    get<K extends keyof T>(key: K[]): Pick<T, K>
    get<K extends keyof T>(key: K | K[]) {
        if (typeof key === 'string') {
            const value = this.storage.getItem(this.addPrefix(key))
            return value ? JSON.parse(value) : null
        }
        const o = {} as Pick<T, keyof T>
        ;(key as K[]).forEach(item => {
            const value = this.storage.getItem(this.addPrefix(item))
            o[item] = value ? JSON.parse(value) : null
        })
        return o as Pick<T, keyof T>
    }
    set<K extends keyof T>(key: K, data: T[K]) {
        this.storage.setItem(this.addPrefix(key), JSON.stringify(data))
    }
    remove<K extends keyof T>(key: K | K[]) {
        if (typeof key === 'string') {
            this.get(key) && this.storage.removeItem(this.addPrefix(key))
        } else {
            ;(key as K[]).forEach(item => this.get(item) && this.storage.removeItem(this.addPrefix(item)))
        }
    }
    clear() {
        this.storage.clear()
    }
    private addPrefix(key: keyof T) {
        return `${this.prefix}${key.toString()}`
    }
}

export const a = 1
