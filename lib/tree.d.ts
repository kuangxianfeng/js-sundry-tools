export type TreeTypes = {
    id: string;
    parentId: string;
    children?: TreeTypes[];
    [x: string]: any;
};
export type ListTypes = {
    id: string;
    parentId: string;
    [x: string]: any;
};
export type ConditionFn<K> = (item: K) => boolean;
/**
 * @description 重写树结构基本字段
 */
export type FieldNames = {
    id?: string;
    parentId?: string;
    children?: string;
};
/**
 * @description 通过 `conditionFn` 判断条件返回符合条件的子节点
 * @description 通过 `fieldNames` 更改了字段之后会引入 `ts` 报错，需要使用 `@ts-ignore`
 * @param tree 树结构
 * @param conditionFn 判断条件
 * @param fieldNames 重写树结构字段
 * @returns
 */
export declare function findNode<K extends TreeTypes, T extends K[]>(tree: T, conditionFn: ConditionFn<K>, fieldNames?: FieldNames): K | null;
/**
 * @description 查找符合条件的节点路径，`keyword` 可改变返回关键字，默认取 `id`
 * @param tree
 * @param conditionFn
 * @param fieldNames
 * @param path
 * @param keyword
 * @returns
 */
export declare function findNodePath<K extends TreeTypes, T extends K[]>(tree: T, conditionFn: ConditionFn<K>, fieldNames?: FieldNames, path?: (keyof K)[], keyword?: keyof K): (keyof K)[];
/**
 * @description `list` 转树结构
 * @param list
 * @param fieldNames
 * @returns
 */
export declare function list2tree<K extends ListTypes>(list: K[], fieldNames?: FieldNames): TreeTypes[];
export type LevelTypes = number | false | undefined;
/**
 * @description 树结构转 `list`，并且返回值自带一个 `level` 属性来表明层级
 * @param tree
 * @param result
 * @param fieldNames
 * @param level
 * @returns
 */
export declare function tree2list<K extends AnyObj, T extends K & {
    level?: LevelTypes;
}>(tree: K[], result?: T[], fieldNames?: FieldNames, level?: LevelTypes): T[];
