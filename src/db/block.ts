import { BlockInfo, m_address } from '..'
import { StoreSymbol } from '../enums/redis'
import { add, get, get_multi, query, set, take_last } from '.'
import { TransactionInfo } from '../typings'
import { Block } from '../entities'
import Transaction from '../entities/transaction'
import { Code } from '../enums'

async function push_block(block_info: BlockInfo) {
    return await add<BlockInfo>(
        StoreSymbol.blocks,
        String(block_info.height),
        block_info
    )
}

async function get_block_detail(
    height: string
): Promise<{ code: Code; msg?: string; block?: Block }> {
    const result = await get<BlockInfo>(StoreSymbol.blocks, height)
    if (!result || !result?.data || result?.data.txs.length === 0) {
        const block_info: BlockInfo = result.data
        const txs = await get_multi<TransactionInfo>(
            StoreSymbol.txs,
            result.data.txs
        )
        const block = new Block(
            block_info.height,
            block_info.node_address,
            block_info.last_hash,
            block_info.hash,
            block_info.proof
        )

        if (txs?.data) {
            const txs_l: Transaction[] = txs?.data.map(
                (item: TransactionInfo) =>
                    new Transaction(
                        m_address(64),
                        block._height,
                        item.from,
                        item.to,
                        item.value,
                        item.type,
                        item.unit,
                        item.gas,
                        item.gas_price,
                        'msg: receive height'
                    )
            )

            block.push_txs(txs_l)
        }

        return { ...result, block }
    } else return result
}

async function add_tx_to_block(tx_hash: string, height: number) {
    const r = await take_last<BlockInfo>(StoreSymbol.blocks)

    if (!r.data) {
        return {
            code: r.code,
            msg: 'block is not found',
        }
    } else {
        const new_block: BlockInfo = r.data
        new_block.txs.push(tx_hash)
        const result = await set<BlockInfo>(
            StoreSymbol.blocks,
            String(new_block.height),
            new_block
        )
        
        return result
    }
}

async function get_last_block() {

    return await take_last<BlockInfo>(StoreSymbol.blocks)
}

async function get_list_block(page: number, size: number) {
    const start = (page || 0) * (size || 0)
    const end = start + (size || 10)
    return await query<BlockInfo>(StoreSymbol.blocks, start, end)
}

export {
    get_last_block,
    get_block_detail,
    add_tx_to_block,
    push_block,
    get_list_block,
}
