export function AppErrorHandler(e: unknown, on: string): Error {
    const err = e as Error
    return new Error(`Error on ${on}. Description: ${err.message}`)
}
