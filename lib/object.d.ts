/**
 * @description  排除 `notRequiredKey` 中存在的 `key` 值对象
 * @param obj
 * @param notRequiredKey
 * @returns
 */
export declare function filterNotRequired<T extends AnyObj, K extends keyof T>(obj: T, notRequiredKey: K[]): Pick<T, Exclude<keyof T, K>>;
/**
 * @description 获取 `requiredKey` 中存在的 `key` 值对象
 * @param obj
 * @param requiredKey
 * @returns
 */
export declare function filterRequiredKey<T extends AnyObj, K extends keyof T>(obj: T, requiredKey: K[]): Pick<T, K>;
/**
 * @description 排除掉值为 `null` 或者 `undefined` 或者空值
 * @param obj
 */
export declare function excludeEmpty<T extends AnyObj>(obj: T): AnyObj;
