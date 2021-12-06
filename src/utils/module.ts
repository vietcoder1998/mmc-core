import CryptoJS from 'crypto-js'

function encode<T>(data: T, private_key?: string): string {
    try {
        const result: string = JSON.stringify(data)

        if (private_key) {
            return CryptoJS.AES.encrypt(result, private_key).toString()
        }
        
        return result
    } catch (error) {
        throw error
    }
}

function decode<T>(data: string, private_key?: string): T {
    try {
        if (private_key) {
            const output = CryptoJS.AES.decrypt(data, private_key).toString(
                CryptoJS.enc.Utf8
            )
            return JSON.parse(output)
        }

        return JSON.parse(data)
    } catch (error) {
        throw error
    }
}

export { encode, decode }
