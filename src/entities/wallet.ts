import { WalletInfo } from '..'
import { ShortAccountInfo, ShotTransactionInfo } from '../typings/info'

class Wallet {
    private address: string
    private password: string
    private accounts: ShortAccountInfo[] = []
    private txs_hash: string[] = []
    public create_at: number
    private name: string

    constructor(
        password?: string,
        address?: string,
        name?: string,
        create_at?: number
    ) {
        this.address = address
        this.password = password
        this.create_at = create_at
        this.name = name
    }

    get _name() {
        return this.name
    }
    get _address() {
        return this.address
    }

    get _pass() {
        return this.password
    }

    get _accounts(): ShortAccountInfo[] {
        return this.accounts
    }

    set _accounts(accounts: ShortAccountInfo[]) {
        this.accounts = accounts
    }

    get _txs_hash() {
        return this.txs_hash
    }

    set _txs_hash(txs_hash: string[]) {
        this.txs_hash = txs_hash
    }

    push_account(info: ShortAccountInfo) {
        this.accounts.push(info)
    }

    push_txs(tx_hash: string, address: string) {
        const account = this.accounts.filter(
            (acc) => acc.address === address
        )[0]
        if (account) {
            account.txs.push(tx_hash)
            this.accounts.push(account)
        }
    }

    get _info(): WalletInfo {
        return {
            address: this._address,
            accounts: this._accounts,
            txs_hash: this._txs_hash,
            create_at: this.create_at,
            name: this._name,
        }
    }
}

export default Wallet
