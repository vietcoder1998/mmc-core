import {
    AccountType,
    CoinUnit,
    TransactionType,
    TransactionState,
    NodeType,
} from '../enums/type'
import { Address } from '../utils/address'

type TransactionInfo = {
    address: string
    block_height: number
    from: Address
    to: Address
    type: TransactionType
    value: number
    unit: CoinUnit
    hash: string
    data: string
    create_at: number
    gas: number
    status: string
    gas_price: number
}

type AccountInfo = {
    name: string
    address: Address
    monster_hash: string[]
    coin: Record<CoinUnit, number>
    type: AccountType
    create_at: number
}

type ShortAccountInfo = {
    name: string
    address: Address
    coin: Record<CoinUnit, number>
    txs: string[]
}

type ShotTransactionInfo = {
    address: Address
    unit: CoinUnit
    value: number
    create_at: number
    state: TransactionState
}

type NodeInfo = {
    address: string
    host: string
    port: number
    id: number
    name: string
    txs_len: number
    node_type: NodeType
}

type ContractInfo = {
    category: AccountType
    balance: number
    source: string
    address: Address
    deploy_by: Address
    language: 'js'
}

type BlockInfo = {
    height: number
    rule: number
    create_at: number
    last_hash: string
    hash: string
    txs: string[]
    proof: number
    node_address: string
    lucky_address: string
}

type WalletInfo = {
    address: string
    name: string
    accounts: ShortAccountInfo[]
    txs_hash: string[]
    create_at: number
}

export {
    BlockInfo,
    TransactionInfo,
    NodeInfo,
    AccountInfo,
    WalletInfo,
    ContractInfo,
    ShortAccountInfo,
    ShotTransactionInfo,
}
