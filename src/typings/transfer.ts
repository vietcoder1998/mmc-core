import { CoinUnit, TransactionType } from '../enums/type'

type Result = {
    from: string
    time_stamp: number
    to: string
    txHash: string
    type: TransactionType
    price: number
    unit: CoinUnit
}

type TransferHistory = {
    result: Result[]
    total: number
}

export { Result, TransferHistory }
