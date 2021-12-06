import { NodeInfo } from '..'
import { Code, StoreSymbol } from '../enums'
import { add, get, set, total } from '.'

async function register_node(node: NodeInfo, is_parent?: boolean) {
    const len = await total(StoreSymbol.node)

    if (len < 3) {
        return add<NodeInfo>(StoreSymbol.node, String(node.address), node)
    } else
        return {
            code: Code.full_node,
        }
}

async function update_node(node: NodeInfo) {
    const result = await get<NodeInfo>(StoreSymbol.txs, String(node.id))

    if (!result || !result.data) {
        return result
    }

    return await set<NodeInfo>(StoreSymbol.txs, String(node.id), node)
}

async function get_node_detail(address: string) {
    return await get<NodeInfo>(StoreSymbol.node, address)
}

export { register_node, update_node, get_node_detail }
