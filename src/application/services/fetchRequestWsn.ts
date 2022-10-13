import {ApplicationResponse} from "../domain/utils/applicationResponse";
import {Auth, Wsn} from "../domain/wsn/wsn";
import {Wsaa} from "../domain/wsaa/wsaa";
import {WsConnection} from "../domain/utils/wsConnection";
import {AppErrorHandler} from "../domain/utils/appErrorHandler";
import {WsSoapConnection} from "../infrastructure/wsSoapConnection";
import {GetUrlWsn} from "../domain/utils/getUrlWsn";

export type RequestCommand = {
    auth: {
        cuit: string
    }
    targetService: {
        wsnId: string
        method: string
    }
    body: any
}

export class FetchRequestWsn {
    private readonly _wsaa: Wsaa

    constructor(wssa: Wsaa) {
        this._wsaa = wssa
    }

    async Request(command: RequestCommand, soapConnection?: WsConnection): Promise<ApplicationResponse> {
        const tokenAndSign = await this._wsaa.GetTokenAndSign(command.auth.cuit, command.targetService.wsnId)
        if (tokenAndSign.error !== undefined) {
            return tokenAndSign
        }

        if (soapConnection === undefined) {
            soapConnection = new WsSoapConnection(GetUrlWsn(command.targetService.wsnId))
        }

        const response: ApplicationResponse = {
            status: {http_code: 200},
            headers: undefined,
            data: undefined,
            error: undefined,
        }

        const wsn = new Wsn(command.targetService.wsnId, soapConnection)
        const auth: Auth = {cuit: command.auth.cuit, sign: tokenAndSign.data.token.sign, token: tokenAndSign.data.token.token}
        try {
            response.data = await wsn.CallMethod(command.targetService.method, command.body, auth)
            return response
        } catch (e) {
            response.error = AppErrorHandler(e, 'Soap WSN Method execution').message
            response.status.http_code = 400
            return response
        }
    }
}
