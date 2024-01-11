/**
 * @description  排除 `notRequiredKey` 中存在的 `key` 值对象
 * @param obj
 * @param notRequiredKey
 * @returns
 */
export function filterNotRequired<T extends AnyObj, K extends keyof T>(obj: T, notRequiredKey: K[]) {
    const o = {} as Pick<T, Exclude<keyof T, K>>
    Object.keys(obj).forEach(item => {
        if (!notRequiredKey.includes(item as K)) {
            o[item as Exclude<keyof T, K>] = obj[item]
        }
    })
    return o
}
/**
 * @description 获取 `requiredKey` 中存在的 `key` 值对象
 * @param obj
 * @param requiredKey
 * @returns
 */
export function filterRequiredKey<T extends AnyObj, K extends keyof T>(obj: T, requiredKey: K[]) {
    const o = {} as Pick<T, K>
    Object.keys(obj).forEach(item => {
        if (requiredKey.includes(item as K)) {
            o[item as K] = obj[item]
        }
    })
    return o
}

/**
 * @description 排除掉值为 `null` 或者 `undefined` 或者空值
 * @param obj
 */
export function excludeEmpty<T extends AnyObj>(obj: T) {
    const o = {} as AnyObj
    Object.keys(obj).forEach(item => {
        if (![null, undefined, ''].includes(obj[item])) {
            o[item] = obj[item]
        }
    })
    return o
}
