import { findNode, findNodePath, list2tree, tree2list } from '../tree'

const tree = [
    {
        id: '1',
        parentId: '0',
        name: '1',
        children: [
            {
                id: '1-1',
                parentId: '1',
                name: '1-1',
                children: [
                    {
                        id: '1-1-1',
                        parentId: '1-1',
                        name: '1-1-1',
                        children: [
                            {
                                id: '1-1-1-1',
                                parentId: '1-1-1',
                                name: '1-1-1-1'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        parentId: '0',
        name: '2',
        children: [
            {
                id: '2-1',
                parentId: '2',
                name: '2-1'
            }
        ]
    }
]
const tree2 = [
    {
        uid: '1',
        pid: '0',
        name: '1',
        child: [
            {
                uid: '1-1',
                pid: '1',
                name: '1-1',
                child: []
            }
        ]
    },
    {
        uid: '2',
        pid: '0',
        name: '2',
        child: [
            {
                uid: '2-1',
                pid: '2',
                name: '2-1',
                child: []
            }
        ]
    }
]
const list = [
    {
        id: '1',
        parentId: '0',
        name: '1'
    },
    {
        id: '1-1',
        parentId: '1',
        name: '1-1'
    },
    {
        id: '2',
        parentId: '0',
        name: '2'
    },
    {
        id: '2-1',
        parentId: '2',
        name: '2-1'
    },
    {
        id: '1-1-1',
        parentId: '1-1',
        name: '1-1-1'
    },
    {
        id: '1-1-1-1',
        parentId: '1-1-1',
        name: '1-1-1-1'
    }
]
const list2 = [
    {
        uid: '1',
        pid: '0',
        name: '1'
    },
    {
        uid: '1-1',
        pid: '1',
        name: '1-1'
    },
    {
        uid: '2',
        pid: '0',
        name: '2'
    },
    {
        uid: '2-1',
        pid: '2',
        name: '2-1'
    }
]
describe('测试 tree 模块', () => {
    describe('测试 findNode', () => {
        test('测试条件查找', () => {
            const node1 = findNode(tree, item => item.id === '1')
            const node2 = findNode(tree, item => item.id === '1-1')
            const node3 = findNode(tree, item => item.name === '2')
            expect(node1).toStrictEqual(tree[0])
            expect(node2).toStrictEqual(tree[0].children[0])
            expect(node3).toStrictEqual(tree[1])
        })
        test('测试覆盖字段', () => {
            // @ts-ignore
            const node1 = findNode(tree2, item => item.uid === '1', {
                id: 'pid',
                parentId: 'pid',
                children: 'child'
            })
            // @ts-ignore
            const node2 = findNode(tree2, item => item.uid === '1-1', {
                id: 'pid',
                parentId: 'pid',
                children: 'child'
            })
            // @ts-ignore
            const node3 = findNode(tree2, item => item.name === '2', {
                id: 'pid',
                parentId: 'pid',
                children: 'child'
            })
            expect(node1).toStrictEqual(tree2[0])
            expect(node2).toStrictEqual(tree2[0].child[0])
            expect(node3).toStrictEqual(tree2[1])
        })
    })
    describe('测试 findNodePath', () => {
        test('测试未找到路径',()=>{
            const path=findNodePath(tree,item=>item.id==='never')
            expect(path).toHaveLength(0)
        })
        test('测试两个参数查找', () => {
            const path = findNodePath(tree, item => item.id === '1-1')
            expect(path).toStrictEqual(['1', '1-1'])
        })
        test('测试三个参数查找', () => {
            // @ts-ignore
            const path = findNodePath(tree2, item => item.uid === '1-1', {
                id: 'uid',
                children: 'child'
            })
            expect(path).toStrictEqual(['1', '1-1'])
        })
        test('测试四个参数查找', () => {
            const path = findNodePath(
                // @ts-ignore
                tree2,
                item => item.uid === '1-1',
                {
                    id: 'uid',
                    children: 'child'
                },
                ['00000000']
            )
            expect(path).toStrictEqual(['00000000', '1', '1-1'])
        })
    })
    describe('list2tree', () => {
        test('正常 list 转树结构', () => {
            const tree = list2tree(list)
            expect(tree).toStrictEqual(tree)
        })
        test('添加覆盖参数', () => {
            // @ts-ignore
            const tree = list2tree(list2, {
                id: 'uid',
                parentId: 'pid',
                children: 'child'
            })
            expect(tree).toStrictEqual(tree2)
        })
    })
    describe('测试 tree2list', () => {
        test('正常 tree 转 list ', () => {
            const list = tree2list(tree)
            expect(list).toStrictEqual([
                { id: '1', parentId: '0', name: '1', level: 1 },
                { id: '1-1', parentId: '1', name: '1-1', level: 2 },
                { id: '1-1-1', parentId: '1-1', name: '1-1-1', level: 3 },
                { id: '1-1-1-1', parentId: '1-1-1', name: '1-1-1-1', level: 4 },
                { id: '2', parentId: '0', name: '2', level: 1 },
                { id: '2-1', parentId: '2', name: '2-1', level: 2 }
            ])
        })
    })
})
