// https://github.com/clarkbw/jest-localstorage-mock
import { Storage } from '../storage'

export type T1 = {
    username: string
    password: string
}
const storageMock = (() => {
    let store = {} as AnyObj
    return {
        getItem: jest.fn(key => {
            if (typeof key === 'string') {
                const v = store[key]
                return v ? JSON.parse(store[key]) : null
            }
            const o = {} as Record<string, any>
            ;(key as string[]).forEach(item => {
                const value = store[item]
                o[item] = value ? JSON.parse(value) : null
            })
            return o
        }),
        setItem: jest.fn((key, value) => {
            store[key] = JSON.stringify(value)
        }),
        removeItem: jest.fn(key => {
            delete store[key]
        }),
        clear: jest.fn(() => {
            store = {}
        })
    }
})()
const KEY1 = 'username',
    KEY2 = 'password'
const VALUE1 = 'Yuichi chiba',
    VALUE2 = '100861123'
describe('测试 storage 模块', () => {
    describe('测试 sessionStorage ', () => {
        beforeEach(() => {
            // 在每个测试之前重置所有存根和模拟函数
            jest.clearAllMocks()
        })
        // 使用 Object.defineProperty 模拟全局的 localStorage 对象
        Object.defineProperty(global, 'sessionStorage', {
            value: storageMock
        })
        const session = new Storage<T1>({ type: 'session', prefix: '' })
        test('测试 set ', () => {
            session.set(KEY1, VALUE1)
            expect(storageMock.setItem).toHaveBeenCalledWith(KEY1, JSON.stringify(VALUE1))
        })
        test('测试 get，传入字符串', () => {
            const username = session.get(KEY1)
            expect(storageMock.getItem).toHaveBeenCalledWith(KEY1)
            expect(username).toBe(VALUE1)
        })
        test('测试 get，传入数组', () => {
            const obj = session.get([KEY1, KEY2])
            expect(obj).toStrictEqual({
                username: VALUE1,
                password: null
            })
        })
        test('测试 remove，传入字符串', () => {
            session.remove(KEY1)
            expect(storageMock.removeItem).toHaveBeenCalledWith(KEY1)
            const v = session.get(KEY1)
            expect(v).toBe(null)
        })
        test('测试 remove，传入数组字符串', () => {
            session.set(KEY1, VALUE1)
            session.set(KEY2, VALUE2)
            session.remove([KEY1, KEY2])
            expect(storageMock.getItem).toHaveBeenCalledWith(KEY1)
            expect(storageMock.getItem).toHaveBeenCalledWith(KEY2)
            expect(storageMock.removeItem).toHaveBeenCalledWith(KEY1)
            expect(storageMock.removeItem).toHaveBeenCalledWith(KEY2)
        })
        test('测试 clear ', () => {
            session.clear()
            expect(storageMock.clear).toHaveBeenCalled()
        })
    })
    describe('测试 localStorage', () => {
        // localStorage 的所有逻辑与上面的测试案例一摸一样，所以不需要再进行测试。
        new Storage<T1>({ type: 'local' })
    })
})
