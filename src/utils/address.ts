function m_address(length: number): string {
    let base = 'mmc'
    const alphabet = 'abcdef1234567890'
    for (let i = 0; i < length ? length - 1 : 0; i++) {
        base += alphabet[Math.floor(Math.random() * (alphabet.length - 1))]
    }
    return base
}

function random_hash(length: number): string {
    let hash = ''
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890'

    for (let i = 0; i < length ? length - 1 : 0; i++) {
        hash += alphabet[Math.floor(Math.random() * (alphabet.length - 1))]
    }

    return hash
}

function get_cut_hash(hash: string) {
    return hash.slice(0, 3)
}

type Address = ReturnType<typeof m_address>

export { m_address, Address, random_hash, get_cut_hash }
