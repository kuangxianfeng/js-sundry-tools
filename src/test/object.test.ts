import { filterNotRequired, filterRequiredKey, excludeEmpty } from '../object'

const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: null,
    e: undefined,
    f: ''
}

describe('测试 object 模块', () => {
    test('测试 filterNotRequired', () => {
        const o1 = filterNotRequired(obj, ['d', 'e', 'f'])
        const o2 = filterNotRequired(obj, ['a', 'b', 'c'])
        expect(o1).toStrictEqual({ a: 1, b: 2, c: 3 })
        expect(o2).toStrictEqual({ d: null, e: undefined, f: '' })
    })
    test('测试 filterRequiredKey', () => {
        const o1 = filterRequiredKey(obj, ['d', 'e', 'f'])
        const o2 = filterRequiredKey(obj, ['a', 'b', 'c'])
        expect(o1).toStrictEqual({ d: null, e: undefined, f: '' })
        expect(o2).toStrictEqual({ a: 1, b: 2, c: 3 })
    })
    test('测试 excludeEmpty', () => {
        const o1 = excludeEmpty(obj)
        expect(o1).toStrictEqual({ a: 1, b: 2, c: 3 })
    })
})
