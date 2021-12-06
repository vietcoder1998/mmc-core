import rp from 'request-promise-native'
import { Block } from '.'
import { Account } from '..'
import { take_last, total } from '../db'
import {
    add_account,
    add_tx_to_account,
    get_price_of_account,
    is_exist_account
} from '../db/account'
import {
    get_block_detail,
    get_last_block,
    get_list_block,
    push_block
} from '../db/block'
import { get_node_detail, register_node } from '../db/node'
import { add_tx, get_list_txs, get_tx_detail } from '../db/transaction'
import {
    add_account_to_wallet,
    add_wallet,
    get_wallet_detail
} from '../db/wallet'
import { Code, Message, StoreSymbol } from '../enums'
import { AccountType, CoinUnit, TransactionType } from '../enums/type'
import { BlockInfo, NodeInfo, TransactionInfo } from '../typings/info'
import { m_address } from '../utils'
import { generate_public_private_key } from '../utils/generate'
import Transaction from './transaction'
import Wallet from './wallet'

export default class BlockChain {
    provider = 'http://localhost:8093'
    constructor() {}

    async _total_tx() {
        return await total(StoreSymbol.txs)
    }

    async _total_account() {
        return await total(StoreSymbol.accounts)
    }

    async get_total_block() {
        return await total(StoreSymbol.blocks)
    }

    async get_last_block() {
        return await get_last_block()
    }

    async get_block_detail(height: number) {
        return await get_block_detail(String(height))
    }

    async get_tx_detail(hash: string) {
        return await get_tx_detail(hash)
    }

    async register_wallet(password: string, name: string) {
        const create_at = new Date().getTime()
        const { address, seed, private_key } =
            generate_public_private_key(password)
        const wallet: Wallet = new Wallet(password, address, name, create_at)
        const result_2 = await add_account(wallet._address)

        if (result_2.code < 0) {
            return result_2
        } else {
            const result = await add_wallet(wallet._info, private_key)

            return {
                seed,
                private_key,
                ...result,
            }
        }
    }

    private compare_hash(
        hash: string,
        proof: number,
        last_hash: string
    ): boolean {
        if (CryptoJS.SHA256(hash + proof).toString() === last_hash) {
            return true
        }

        return false
    }

    // mine_block
    async mine_block(node_address: string, address: string) {
        const last_block: BlockInfo = (
            await take_last<BlockInfo>(StoreSymbol.blocks)
        )?.data
        const sender = await is_exist_account(address)

        if (!sender) {
            return {
                code: Code.not_found,
                msg: 'sender is required',
            }
        }

        const node: NodeInfo = (await get_node_detail(node_address))?.data

        if (!node && this.provider) {
            return {
                code: Code.not_found,
                msg: 'node is required',
            }
        }

        const block = new Block(
            last_block ? Number(last_block.height) + 1 : 0,
            node_address,
            last_block?.hash || ''
        )

        if (!last_block || block._info.height > last_block.height) {
            const tx = new Transaction(
                m_address(64),
                block._height,
                '0',
                address,
                1,
                TransactionType.Mining,
                CoinUnit.Monster,
                0,
                1000,
                'hello_world'
            )

            block.push_tx(tx)

            const resolve = await rp(`http://${node.address}/node/resolve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application-json',
                },
                body: String(block._info),
            })

            if (resolve) {
                const result = await this.add_block(block._info)
                const result1 = await add_tx(tx._info)
                const result2 = await add_tx_to_account(tx._to, tx._address)

                return {
                    ...result,
                    ...result1,
                    ...result2,
                    block,
                    tx,
                }
            } else
                return {
                    code: Code.error,
                }
        }

        return {
            code: Code.error_block,
            msg: 'block is lower than error block',
        }
    }

    async add_block(block: BlockInfo) {
        return await push_block(block)
    }

    async get_list_block(page: number, size: number) {
        return await get_list_block(page, size)
    }

    async get_list_txs(page: number, size: number) {
        return await get_list_txs(page, size)
    }

    async create_account(address: string, name: string, private_key: string) {
        const account = new Account(m_address(64), name, AccountType.USER)

        return await add_account_to_wallet(
            account._short_info,
            address,
            private_key
        )
    }

    async resolve_block(block: BlockInfo, address: string) {
        const last_block = (await get_last_block())?.data
        const node = (await get_node_detail(address))?.data

        if (!node) {
            return { code: Code.not_found, msg: Message.not_found }
        }

        if (
            !last_block &&
            block.height > last_block.height &&
            this.compare_hash(block.hash, block.proof, block.last_hash)
        ) {
            return await this.add_block(block)
        }

        return {
            code: Code.error_block,
            msg: Message.block_err,
        }
    }

    async get_wallet_detail(address: string, private_key: string) {
        return await get_wallet_detail(address, private_key)
    }

    async create_tx(tx: TransactionInfo) {
        return await add_tx(tx)
    }

    async register_node(node: NodeInfo) {
        return await register_node(node)
    }

    async add_node(node: NodeInfo) {
        return await register_node(node)
    }

    async get_price_of_account(address: string) {
        return await get_price_of_account(address)
    }
}
