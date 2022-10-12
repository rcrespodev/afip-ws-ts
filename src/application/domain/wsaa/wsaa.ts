import {TokenRepository, TokenSchema} from "./token_repository";
import {WsaaConnection} from "./wsaaConnection";
import {TokenRequest} from "./tokenRequest";
import {WsaaResponseParser} from "./wsaaResponseParser";
import {ApplicationResponse} from "../utils/applicationResponse";
import {AppErrorHandler} from "../utils/appErrorHandler";
import {WsnService} from "../wsn/servicesWsn";

export class Wsaa {
    private readonly _tokenRepository: TokenRepository
    private readonly _wsaaSoapConnection: WsaaConnection
    private readonly _wsaaResponseParser: WsaaResponseParser

    constructor(tokenRepository: TokenRepository, wsaaSoapConnection: WsaaConnection, wsaaResponseParser: WsaaResponseParser) {
        this._tokenRepository = tokenRepository
        this._wsaaSoapConnection = wsaaSoapConnection
        this._wsaaResponseParser = wsaaResponseParser
    }

    async GetTokenAndSign(cuit: string, service: string): Promise<ApplicationResponse> {
        const response: ApplicationResponse = {
            status: {http_code: 200},
            headers: undefined,
            data: undefined,
            error: undefined,
        }

        let wsnService: WsnService
        try {
            wsnService = new WsnService(service)
        } catch (e) {
            response.error = AppErrorHandler(e, 'new token generation').message
            response.status = {http_code: 400}
            return response
        }

        const schema = await this._tokenRepository.GetToken(cuit, wsnService.GetWsnId())
        if (schema !== undefined) {
            response.data = {token: schema}
            return response
        }

        try {
            const newToken = await this.getTokenAndSignFromNetwork(cuit, wsnService.GetWsnId())
            if (newToken instanceof Error) {
                response.status = {http_code: 500}
                response.error = newToken.message
                return response
            }

            await this._tokenRepository.UpdateToken(newToken)
            response.data = {token: newToken}
            return response
        } catch (e) {
            response.error = AppErrorHandler(e, 'new token generation').message
            response.status = {http_code: 500}
            return response
        }
    }

    private async getTokenAndSignFromNetwork(cuit: string, service: string): Promise<TokenSchema | Error> {
        const xmlBody = await new TokenRequest(cuit).NewRequest(service)
        if (xmlBody instanceof Error) {
            return xmlBody
        }

        try {
            const client = await this._wsaaSoapConnection.SoapConnection()
            const result: [any] = await client.loginCmsAsync({in0: xmlBody});
            return await this._wsaaResponseParser.Parse(cuit, service, result)
        } catch (e) {
            return AppErrorHandler(e, 'new token generation')
        }
    }
}
