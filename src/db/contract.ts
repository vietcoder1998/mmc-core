import { StoreSymbol } from '../enums'
import { ContractInfo } from '../typings'
import { add, get, set, total } from '.'

async function get_contract_len() {
    return await total(StoreSymbol.contracts)
}

async function get_contract_detail(address: string) {
    return await total(StoreSymbol.contracts)
}

async function add_contract(contract: ContractInfo) {
    return await add<ContractInfo>(
        StoreSymbol.txs,
        String(contract.address),
        contract
    )
}

async function update_contract(contract: ContractInfo) {
    const data = await get<ContractInfo>(
        StoreSymbol.txs,
        String(contract.address)
    )

    if (!data || !data.data) {
        return data
    } else {
        return await set<ContractInfo>(
            StoreSymbol.txs,
            String(contract.address),
            contract
        )
    }
}

export { get_contract_len, get_contract_detail, add_contract, update_contract }
