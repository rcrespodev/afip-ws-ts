export type ApplicationResponse = {
    headers: Record<string, string> | undefined
    status: {
        wsn_http_code: number
    }
    data: any
    error: string | undefined
}

