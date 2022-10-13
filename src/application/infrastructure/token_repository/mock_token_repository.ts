import {TokenRepository, TokenSchema} from "../../domain/wsaa/token_repository";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MockTokenRepository implements TokenRepository{
    private readonly _data: Map<string, TokenSchema>
    constructor(data: TokenSchema[]) {
        this._data = new Map
        data.forEach((schema) => {
            const key = this.buildKey(schema.cuit, schema.service)
            this._data.set(key, schema)
        })
    }

    async UpdateToken(schema: TokenSchema): Promise<void> {
        const key = this.buildKey(schema.cuit, schema.service)
        this._data.set(key, schema)
    }

    async GetToken(cuit: string, service: string): Promise<TokenSchema | undefined> {
        return this._data.get(this.buildKey(cuit, service))
    }

    buildKey(cuit: string, service: string): string {
        return service.concat('-', cuit)
    }
}
