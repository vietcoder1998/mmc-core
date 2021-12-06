type BlockStore = {
    version: number
    rule: number
    data: string[]
}

type WalletStore = {
    [key: string]: string
}

type TransactionStore = {
    [key: string]: string
}

type ContractStore = {
    [key: string]: string
}

type NodeStore = {
    [key: string]: string
}

export { BlockStore, WalletStore, TransactionStore, ContractStore, NodeStore }
