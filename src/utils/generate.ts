import { MonsterStats } from '../typings/monster'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import CryptoJS from 'crypto-js'
import { random_hash } from './address'

function random_id(value: number, range: number) {
    return (value | 0) + Math.floor(Math.random() * (range | 0))
}

function create_stats(
    k: string,
    min?: number,
    range?: number,
    value1?: number,
    value2?: number
): { [k: string]: number } {
    const value = (value1 + value2) / 2
    return { [k]: (value | min) + Math.floor(Math.random() * (range | 0)) }
}

function generate_stats(
    min?: number,
    range?: number,
    stats_1?: MonsterStats,
    stats_2?: MonsterStats
) {
    let stats: MonsterStats = {
        dmg: 20,
        amr: 20,
        spe: 20,
        skl: 20,
        hea: 20,
    }

    if (stats_1 && stats_2) {
        Object.keys(stats_1).forEach((k: string) => {
            Object.assign(
                stats,
                create_stats(k, min, range, stats_1[k], stats_2[k])
            )
        })
    } else {
        Object.keys(stats).forEach((k: string) => {
            stats[k] = stats[k] + Math.floor(Math.random() * 10)
        })
    }

    return stats
}

function generate_public_private_key(password: string): {
    address: string
    private_key: string
    seed: string
} {
    try {
        const words = password + random_hash(12)

        // rent private_key from password
        const private_key = mnemonicToSeedSync(words).toString('hex')

        // convert private key to binary
        const strength = Number(Buffer.from(private_key).toString('binary'))

        // generate seed to save into client
        const seed = generateMnemonic(strength)

        // zip public_key into address
        const public_key = CryptoJS.SHA256(private_key).toString(
            CryptoJS.enc.Hex
        )
        const address = 'mmc' + public_key

        return {
            address,
            private_key,
            seed,
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export { random_id, create_stats, generate_stats, generate_public_private_key }
