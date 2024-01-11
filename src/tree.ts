export type TreeTypes = {
    id: string
    parentId: string
    children?: TreeTypes[]
    [x: string]: any
}
export type ListTypes = {
    id: string
    parentId: string
    [x: string]: any
}

export type ConditionFn<K> = (item: K) => boolean
/**
 * @description 重写树结构基本字段
 */
export type FieldNames = {
    id?: string
    parentId?: string
    children?: string
}
/**
 * @description 通过 `conditionFn` 判断条件返回符合条件的子节点
 * @description 通过 `fieldNames` 更改了字段之后会引入 `ts` 报错，需要使用 `@ts-ignore`
 * @param tree 树结构
 * @param conditionFn 判断条件
 * @param fieldNames 重写树结构字段
 * @returns
 */
export function findNode<K extends TreeTypes, T extends K[]>(tree: T, conditionFn: ConditionFn<K>, fieldNames?: FieldNames): K | null {
    const { children } = formatFieldNames(fieldNames)
    for (const data of tree) {
        if (conditionFn(data)) return data
        if (data[children]) {
            const res = findNode(data[children], conditionFn)
            if (res) return res as K
        }
    }
    return null
}

/**
 * @description 查找符合条件的节点路径，`keyword` 可改变返回关键字，默认取 `id`
 * @param tree
 * @param conditionFn
 * @param fieldNames
 * @param path
 * @param keyword
 * @returns
 */
export function findNodePath<K extends TreeTypes, T extends K[]>(
    tree: T,
    conditionFn: ConditionFn<K>,
    fieldNames?: FieldNames,
    path = [] as (keyof K)[],
    keyword?: keyof K
) {
    const { id, children } = formatFieldNames(fieldNames)
    for (const data of tree) {
        path.push(data[(keyword || id) as keyof K])
        if (conditionFn(data)) return path
        if (data[children]) {
            const findChildren = findNodePath(data[children], conditionFn, formatFieldNames(fieldNames), path, keyword) as (keyof K)[]
            if (findChildren.length > 0) return findChildren
        }
        path.pop()
    }
    return []
}

/**
 * @description `list` 转树结构
 * @param list
 * @param fieldNames
 * @returns
 */
export function list2tree<K extends ListTypes>(list: K[], fieldNames?: FieldNames): TreeTypes[] {
    const { id, parentId, children } = formatFieldNames(fieldNames)
    const rootItems = [] as K[]
    const itemMap = {} as { [x: string]: K }
    list.forEach(item => {
        itemMap[item[id]] = { ...item, [children]: [] }
    })
    list.forEach(item => {
        if (item[parentId] !== null && itemMap[item[parentId]]) {
            itemMap[item[parentId]][children].push(itemMap[item[id]])
        } else {
            rootItems.push(itemMap[item[id]])
        }
    })
    return rootItems
}

export type LevelTypes = number | false | undefined
/**
 * @description 树结构转 `list`，并且返回值自带一个 `level` 属性来表明层级
 * @param tree
 * @param result
 * @param fieldNames
 * @param level
 * @returns
 */
export function tree2list<K extends AnyObj, T extends K & { level?: LevelTypes }>(
    tree: K[],
    result = [] as T[],
    fieldNames?: FieldNames,
    level = 0 as LevelTypes
) {
    const { children } = formatFieldNames(fieldNames)
    tree.forEach(node => {
        const obj = {
            ...node
        } as unknown as T
        if (typeof level === 'number') {
            obj.level = level + 1
        }
        delete obj[children]
        result.push(obj)
        node[children] && tree2list(node[children], result, formatFieldNames(fieldNames), typeof level === 'number' ? level + 1 : level)
    })
    return result
}

/**
 * @description 替换树结构的字段
 * @param fieldNames
 * @returns
 */
function formatFieldNames(fieldNames?: FieldNames) {
    const { id = 'id', parentId = 'parentId', children = 'children' } = fieldNames || {}
    return {
        id,
        parentId,
        children
    }
}
