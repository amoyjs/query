import * as is from './is'

export function createQuery(stage: any, query: () => void) {
    return (selector: any) => {
        const com = []
        const type = typeof selector

        switch (type) {
            case 'string':
                selector = selector.trim()
                if (['container', 'sprite', 'text'].includes(selector)) {
                    com.push(...getTypedItem(selector, get(stage)))
                } else {
                    const parsed = parseStringQuery(selector)
                    parsed.map((item) => com.push(...findBy(item.key, item.value, get(stage))))
                }
                break
            case 'object':
                com.push(...find(selector, get(stage)))
                break
            default:
                break
        }
        return Object.assign(com, query.prototype)
    }
}

const REG_PROP = /\[(.*)\=(.*)\]/ // 匹配 `[${key}=${value}]` 形式字符串

function parseStringQuery(query: string = '') {
    const result = []
    query.split(',').map((query: string) => {
        query = query.trim()
        if (query.startsWith('.')) {
            result.push({
                key: 'name',
                value: query.slice(1),
            })
        }
        if (REG_PROP.test(query)) {
            const [key, value] = parsePropQuery(query)
            result.push({
                key,
                value,
            })
        }
    })
    return result
}

function getTypedItem(type: string, source: any[]) {
    return source.filter((item) => is[type](item))
}

function parsePropQuery(string: string) {
    const [_, key, value] = string.match(REG_PROP)
    return [key, value]
}

function get(object: any) {
    const result = []
    const walk = (object: any) => {
        if (object.children.length > 0) {
            result.push(...object.children)
            object.children.map((child: any) => walk(child))
        }
    }
    walk(object)
    return result
}

function find(item: any, array: any[]) {
    return array.filter((_item) => _item === item)
}

function findBy(key: string, value: any, array: any[]) {
    return array.filter((item) => item[key] === value)
}