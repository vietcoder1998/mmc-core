import { Code, StoreSymbol } from '../enums'
import {
    delAsync,
    hexistsAsync,
    hgetAsync,
    hlenAsync,
    hmgetAsync,
    hsetAsync,
    llenAsync,
    lrangeAsync,
    rpushAsync,
} from '../redis'
import { decode, encode } from '../utils'

async function append(symbol: StoreSymbol, address: string | string[]) {
    try {
        const result = await hsetAsync(symbol, address, JSON.stringify([]))
        return {
            code: Code.success,
            result,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
            msg: `append ${symbol} error`,
        }
    }
}

async function is_exist(symbol: StoreSymbol, address: string | string[]) {
    try {
        return await hexistsAsync(symbol, address)
    } catch (error) {
        console.log(error)
        return {
            code: Code.error,
        }
    }
}

async function push<T>(
    symbol: StoreSymbol,
    address: string,
    value: T
): Promise<{ code: Code; msg?: string; data?: T }> {
    try {
        const data = await rpushAsync(`${symbol}.${address}`, value)

        return {
            code: Code.success,
            data,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
            msg: 'can`t push ' + symbol,
        }
    }
}

async function add<T>(
    symbol: StoreSymbol,
    address: string,
    value: T,
    private_key?: string
) {
    try {
        await hsetAsync(symbol, address, encode<T>(value, private_key))
        await rpushAsync(`${symbol}.ql`, address)

        return {
            code: Code.success,
            address,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
            msg: 'can`t add ' + symbol,
        }
    }
}

async function get_arr<T>(symbol: StoreSymbol, address: string) {
    try {
        const len = await llenAsync(`${symbol}.${address}`)
        const data: T = await lrangeAsync(
            `${symbol}.${address}`,
            0,
            (len - 1) | 0
        )

        return {
            code: Code.success,
            data,
            len,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}
async function get<T>(
    symbol: StoreSymbol,
    address: string,
    private_key?: string
): Promise<{ code: Code; data?: T | undefined; msg?: string }> {
    try {
        const value = await hgetAsync(symbol, address)
        const data: T = decode<T>(value, private_key)

        if (data) {
            return {
                code: Code.success,
                data,
            }
        } else
            return {
                code: Code.not_found,
                msg: 'not found ' + symbol,
            }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function take_last<T>(symbol: StoreSymbol, private_key?: string) {
    try {
        const last_index = await lrangeAsync(`${symbol}.ql`, -1, -1)

        if (last_index[0]) {
            const data = decode<T>(
                await hgetAsync(symbol, last_index),
                private_key
            )

            return {
                code: Code.success,
                data,
            }
        }
        return {
            code: Code.success,
            msg: 'none data',
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function set<T>(
    symbol: StoreSymbol,
    address: string,
    data: T,
    private_key?: string
) {
    try {
        const result = await hsetAsync(
            symbol,
            address,
            encode<T>(data, private_key)
        )

        return result
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function clear(symbol: StoreSymbol) {
    try {
        const result = await hsetAsync(symbol, '')

        return {
            code: Code.success,
            result,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function del(symbol: StoreSymbol, address: string) {
    try {
        const result = await delAsync(symbol, address)

        return {
            code: Code.success,
            result,
            address,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.request_err,
        }
    }
}

async function get_by_index<T>(
    symbol: StoreSymbol,
    index: number,
    private_key: string
) {
    try {
        const key: string = await lrangeAsync(`${symbol}.ql`, index, index + 1)
        const data = decode<T>(await hgetAsync(symbol, key), private_key)
        return {
            code: Code.success,
            data,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.filter_err,
        }
    }
}

async function total(symbol: StoreSymbol) {
    try {
        const total: number = await hlenAsync(symbol)
        return total
    } catch (error) {
        throw error
    }
}

async function query<T>(
    symbol: StoreSymbol,
    page: number,
    size: number
): Promise<{
    code?: Code
    data?: T[]
    total?: number
    start?: number
    end?: number
}> {
    try {
        const total = await hlenAsync(`${symbol}`)
        const start = (page || 0) * size
        const end = (page || 0) * (size || 10) + (size || 10)
        const query_list: string[] = await lrangeAsync(
            `${symbol}.ql`,
            start >= total ? total - 1 : start,
            end >= total ? total - 1 : end - 1
        )
        const result: string[] = await hmgetAsync(`${symbol}`, ...query_list)

        if (result && result.length > 0) {
            const data: T[] = result?.map((e: string) => JSON.parse(e))

            return {
                code: Code.success,
                total,
                start,
                end,
                data,
            }
        }

        return {
            code: Code.success,
            total,
            data: [],
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.unknown,
        }
    }
}

async function get_multi<T>(
    symbol: StoreSymbol,
    addresses?: string[]
): Promise<{ code: Code; msg?: string; data?: T[] }> {
    try {
        const data = hmgetAsync(symbol, ...addresses)
        console.log('data')
        return {
            code: Code.success,
            data,
        }
    } catch (error) {
        console.log(error)
        return {
            code: Code.get_multi_error,
            msg: `error in get multi ${symbol}`,
        }
    }
}

export {
    add,
    get,
    set,
    clear,
    del,
    total,
    query,
    take_last,
    get_by_index,
    push,
    append,
    get_arr,
    is_exist,
    get_multi,
}
