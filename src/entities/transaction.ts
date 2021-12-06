import CryptoJS from 'crypto-js'
import { CoinUnit, TransactionType } from '../enums/type'
import { TransactionInfo } from '../typings'
import { m_address } from '../utils/address'

class Transaction {
    private type: TransactionType
    private from: string
    private to: string
    private value: number
    private unit: CoinUnit
    private create_at: number
    private data: string
    private hash: string
    private status: string = 'call'
    private block_height: number
    private address?: string
    private gas: number
    private gas_price: number

    constructor(
        address: string,
        block_height: number,
        from: string,
        to: string,
        value: number,
        type: TransactionType,
        unit: CoinUnit,
        gas: number,
        gas_price: number,
        data: any
    ) {
        this.block_height = block_height
        this.value = value
        this.from = from
        this.to = to
        this.unit = unit
        this.type = type
        this.data = data
        this.gas_price = gas_price
        this.create_at = new Date().getTime()
        this.hash = this.gen_hash()
        this.gas = gas
        if (!address) {
            this.address = m_address(64)
        }
    }

    get _type() {
        return this.type
    }

    gen_hash(): string {
        const info = this._info
        delete info['hash']
        const zip = JSON.stringify(info)
        const hash = CryptoJS.SHA256(zip).toString()
        return hash
    }

    get _address() {
        return this.address
    }

    set _address(address: string) {
        this.address = address
    }

    get _from() {
        return this.from
    }

    get _to() {
        return this.to
    }

    get _value() {
        return this.value
    }

    get _unit() {
        return this.unit
    }

    get _data() {
        return this.data
    }

    get _hash() {
        return this.hash
    }

    get _create_at() {
        return this.create_at
    }

    get _status() {
        return this.status
    }

    get _block_height() {
        return this.block_height
    }

    set _status(status: string) {
        this.status = status
    }

    get _gas() {
        return this.gas
    }

    set _gas(gas: number) {
        this.gas = gas
    }

    get _gas_price() {
        return this.gas_price
    }

    get _info(): TransactionInfo {
        return {
            address: this._address,
            type: this._type,
            from: this._from,
            to: this._to,
            value: this._value,
            unit: this._unit,
            hash: this._hash,
            data: this._data,
            create_at: this._create_at,
            status: this._status,
            block_height: this._block_height,
            gas_price: this._gas_price,
            gas: this._gas,
        }
    }
}

export default Transaction
