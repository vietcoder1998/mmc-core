import { Code } from '../enums'

export default class Response<T> {
    code: Code
    msg?: string
    data: T | string

    constructor(code?: Code, data?: T | string) {
        if (data) {
            this.data = data
        }

        if (code) {
            this.code = code
        }
    }
}
