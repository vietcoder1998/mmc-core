import { TransactionInfo } from '..'
import { StoreSymbol } from '../enums'
import { add, get, set, query, push } from '.'

async function get_tx_detail(address: string) {
    return await get<TransactionInfo>(StoreSymbol.txs, address)
}

async function add_tx(tx: TransactionInfo) {
    const result_1 = await add<TransactionInfo>(StoreSymbol.txs, tx.address, tx)
    const result_2 = await push<string>(
        StoreSymbol.accounts,
        tx.from,
        tx.address
    )

    const result_3 = await push<string>(
        StoreSymbol.accounts,
        tx.from,
        tx.address
    )

    return {
        ...result_1,
        ...result_2,
        ...result_3,
    }
}

async function update_tx(tx: TransactionInfo) {
    const data = await get<TransactionInfo>(StoreSymbol.txs, tx.address)

    if (!data || !data.data) {
        return data
    } else {
        return await set<TransactionInfo>(StoreSymbol.txs, tx.address, tx)
    }
}

async function get_list_txs(page: number, size: number) {
    return await query<TransactionInfo>(StoreSymbol.txs, page, size)
}
export { get_tx_detail, add_tx, update_tx, get_list_txs }
