import {TokenRepository, TokenSchema} from "../../domain/wsaa/token_repository";
import {MongoClient} from "mongodb";

export type MongoConf = {
    user: string
    pass: string
    targetDb: string
}

export class MongodbTokenRepository implements TokenRepository {
    private _client: MongoClient
    private readonly _user: string
    private readonly _pass: string
    private readonly _targetDb: string
    private readonly _targetCollection: string

    constructor(conf: MongoConf) {
        this._pass = conf.pass
        this._user = conf.user
        this._targetDb = conf.targetDb
        this._targetCollection = 'wsaa-token-repository'
    }

    async GetToken(cuit: string, service: string): Promise<TokenSchema | undefined> {
        try {
            this.connect()
            const repository = this._client.db(this._targetDb).collection(this._targetCollection)
            const token = await repository.findOne({key: this.buildKey(cuit, service)})
            return {
                cuit: token.cuit,
                source: token.source,
                destination: token.destination,
                id: token.id,
                generationTime: token.generationTime,
                expirationTime: token.expirationTime,
                token: token.token,
                sign: token.sign,
                service: token.service,
            }
        } catch (e) {
            return undefined
        } finally {
            await this._client.close()
        }
    }

    async UpdateToken(schema: TokenSchema): Promise<void> {
        try {
            this.connect()
            const repository = this._client.db(this._targetDb).collection(this._targetCollection)
            const actualToken = await this.GetToken(schema.cuit, schema.service)
            console.log(actualToken)
            if (actualToken !== undefined) {
                await repository.updateOne(
                    {key: this.buildKey(schema.cuit, schema.service)},
                    {
                        $set: {
                            key: this.buildKey(schema.cuit, schema.service),
                            cuit: schema.cuit,
                            source: schema.source,
                            destination: schema.destination,
                            id: schema.id,
                            generationTime: schema.generationTime,
                            expirationTime: schema.expirationTime,
                            token: schema.token,
                            sign: schema.sign,
                            service: schema.service
                        }
                    },
                    {upsert: true});
                return
            }
            await repository.insertOne({
                key: this.buildKey(schema.cuit, schema.service),
                cuit: schema.cuit,
                source: schema.source,
                destination: schema.destination,
                id: schema.id,
                generationTime: schema.generationTime,
                expirationTime: schema.expirationTime,
                token: schema.token,
                sign: schema.sign,
                service: schema.service,
            })
        } catch (e) {
            console.log(e)
            return undefined
        } finally {
            await this._client.close()
        }
    }

    async ClearAll() {
        try {
            this.connect()
            const repository = this._client.db(this._targetDb).collection(this._targetCollection)
            await repository.deleteMany({})
        } finally {
            await this._client.close()
        }
    }

    private buildKey(cuit: string, service: string): string {
        return service.concat('-', cuit)
    }

    private connect() {
        const uri = `mongodb+srv://${this._user}:${this._pass}@afip-ws-ts-mongocluster.dq0zjmn.mongodb.net/?retryWrites=true&w=majority`
        this._client = new MongoClient(uri);
    }
}
