function query<T>(
    page?: number,
    size?: number,
    arr?: T[]
): { result: T[]; total: number } {
    const start = page | 0
    const end = (start === 0 ? 1 : start) * (size | 10)
    const result = arr
        .filter((v: any, i: number) => start <= i && i < end)
        .map((item: T) => item)

    return {
        result,
        total: arr.length,
    }
}

export default query
