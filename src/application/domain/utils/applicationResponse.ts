export type ApplicationResponse = {
    headers: Record<string, string> | undefined
    status: {
        http_code: number
    }
    data: any
    error: string | undefined
}

