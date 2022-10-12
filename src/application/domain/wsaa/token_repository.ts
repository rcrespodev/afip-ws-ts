export interface TokenRepository {
    UpdateToken(schema: TokenSchema): Promise<void>
    GetToken(cuit: string, service: string): Promise<TokenSchema | undefined>
}

export type TokenSchema = {
    cuit: string
    source: string
    destination: string
    id: number
    generationTime: string
    expirationTime: string
    token: string
    sign: string
    service: string
}
