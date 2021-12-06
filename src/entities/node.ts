import { NodeInfo } from '..'
import { NodeType } from '../enums/type'

class MMCNode {
    private id: number
    private host: string
    private port: number
    private name: string
    private txs_len: number
    private node_type: NodeType

    constructor(
        id: number,
        host: string,
        port: number,
        name: string,
        node_type?: NodeType
    ) {
        this.id = id
        this.host = host
        this.port = port
        this.name = name
        if (node_type) {
            this.node_type = node_type
        }
    }

    get _host() {
        return this.host
    }

    get _port() {
        return this.port
    }

    get _id() {
        return this.id
    }

    get _name() {
        return this.name
    }

    get _address() {
        return `${this.host}:${this.port}`
    }

    get _node_type() {
        return this.node_type
    }

    get _info(): NodeInfo {
        return {
            host: this.host,
            port: this.port,
            id: this.id,
            txs_len: this.txs_len,
            name: this.name,
            address: this._address,
            node_type: this.node_type,
        }
    }
}

export default MMCNode
