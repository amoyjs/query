import * as is from './is'
import { fns } from '../globals/use'

export function createQuery(stage: any, query: typeof $) {
    return (selector: any) => {
        const com: any[] = []
        // @ts-ignore
        const any = fns.reduce((prev: any, current: any) => current(prev, query), selector)
        const type = typeof any

        switch (type) {
            case 'string':
                selector = any.trim()
                if (['container', 'sprite', 'text'].includes(selector)) {
                    com.push(...getTypedItem(selector, get(stage)))
                } else {
                    const parsed = parseStringQuery(selector)
                    parsed.map((item: any) => com.push(...findBy(item.key, item.value, get(stage))))
                }
                break
            case 'object':
                com.push(any)
                break
            default:
                break
        }

        return Object.assign(com, query.prototype)
    }
}

const REG_PROP = /\[(.*)\=(.*)\]/ // 匹配 `[${key}=${value}]` 形式字符串

function parseStringQuery(query: string = '') {
    const result: any[] = []
    query.split(',').map((query: string) => {
        query = query.trim()
        const selectTypes = {
            '#': 'id',
            '.': 'className',
        }
        for (const key in selectTypes) {
            if (query.startsWith(key)) {
                result.push({
                    key: selectTypes[key],
                    value: query.slice(1),
                })
            }
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
    const [_, key, value] = string.match(REG_PROP) as any
    return [key, value]
}

function get(object: any) {
    const result: any[] = []
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
