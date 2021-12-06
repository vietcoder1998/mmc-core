import { WalletInfo } from '..'
import { Account } from '../entities'
import { AccountType, StoreSymbol } from '../enums'
import { ShortAccountInfo } from '../typings/info'
import { m_address } from '../utils'
import { add, get, set } from '.'

// ADD WALLET
async function add_wallet(wallet_info: WalletInfo, private_key: string) {
    const account = new Account(
        m_address(64),
        wallet_info.name,
        AccountType.USER
    )

    wallet_info.accounts.push(account._short_info)

    const add_wallet_result = await add<WalletInfo>(
        StoreSymbol.wallets,
        wallet_info.address,
        wallet_info,
        private_key
    )

    if (add_wallet_result) {
        return {
            wallet_address: wallet_info.address,
            account_address: account._address,
        }
    }

    return {
        msg: 'error in create',
    }
}

// SAVE WALLET
async function save_wallet(wallet_info: WalletInfo, private_key: string) {
    return await set<WalletInfo>(
        StoreSymbol.wallets,
        wallet_info.address,
        wallet_info,
        private_key
    )
}

async function add_account_to_wallet(
    info: ShortAccountInfo,
    address: string,
    private_key: string
) {
    const data = await get<WalletInfo>(
        StoreSymbol.accounts,
        address,
        private_key
    )

    if (data && data.data) {
        const wallet = data.data
        wallet.accounts.push(info)
        const result = set<WalletInfo>(StoreSymbol.wallets, address, wallet)
        return result
    } else return data
}

async function get_wallet_detail(address: string, private_key: string) {
    return await get<WalletInfo>(StoreSymbol.wallets, address, private_key)
}

async function add_tx_to_wallet(
    tx_hash: string,
    wallet_address: string,
    address: string,
    private_key: string
) {
    const data = await get<WalletInfo>(
        StoreSymbol.wallets,
        wallet_address,
        private_key
    )
    if (!data.data) {
        return data
    } else {
        const wallet_info = data.data
        wallet_info.txs_hash.push(tx_hash)
        const accounts = wallet_info.accounts.filter(
            (acc) => acc.address === address
        )[0]
        accounts.txs.push(tx_hash)

        return await set<WalletInfo>(
            StoreSymbol.wallets,
            wallet_info.address,
            wallet_info
        )
    }
}

export {
    add_tx_to_wallet,
    add_wallet,
    get_wallet_detail,
    add_account_to_wallet,
    save_wallet,
}
