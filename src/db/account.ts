import { append, get, is_exist, push, query, get_multi, get_arr } from '.'
import { TransactionInfo } from '..'
import { Code, StoreSymbol } from '../enums'
import { Address } from '../utils/address'

async function get_account_detail(address: string) {
    return await get<TransactionInfo>(StoreSymbol.accounts, address)
}

async function add_account(address: string | string[]) {
    return await append(StoreSymbol.accounts, address)
}

async function add_tx_to_account(address: string, tx_address: Address) {
    return await push<string>(StoreSymbol.accounts, address, tx_address)
}

async function get_list_accounts(page: number, size: number) {
    return await query<TransactionInfo>(StoreSymbol.accounts, page, size)
}

async function is_exist_account(address: string) {
    return await is_exist(StoreSymbol.accounts, address)
}

async function get_price_of_account(address: string) {
    const list_address_txs: string[] = (
        await get_arr<string[]>(StoreSymbol.accounts, address)
    )?.data

    if (!list_address_txs || list_address_txs.length === 0) {
        return {
            code: Code.address_not_found,
        }
    } else {
        const txs: TransactionInfo[] = await (
            await get_multi<TransactionInfo>(
                StoreSymbol.txs,
                list_address_txs
            )
        ).data

        return {
            code: Code.success,
            txs,
        }
    }
}

export {
    get_account_detail,
    add_account,
    add_tx_to_account,
    get_list_accounts,
    is_exist_account,
    get_price_of_account,
}
