enum MonsterType {
    REPTILE = 'reptile',
    BIRD = 'bird',
    BEAST = 'beast',
}

enum AccountType {
    BANKER = 'banker',
    USER = 'user',
}

enum CoinUnit {
    Monster = 'MMC',
    DgCoin = 'DGC',
    Dollar = 'USD',
}

enum TransactionType {
    Mining = 'mining',
    Transfer = 'transfer',
}

enum TransactionState {
    call = 'call',
    deploy = 'deploy',
    exit = 'exit',
}

enum NodeType {
    light = 'light',
    full = 'full',
    miner = 'miner',
}

export {
    MonsterType,
    TransactionType,
    CoinUnit,
    AccountType,
    TransactionState,
    NodeType,
}
