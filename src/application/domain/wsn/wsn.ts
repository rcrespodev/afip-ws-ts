import {WsConnection} from "../utils/wsConnection";

export type Auth = {
    cuit: string
    token: string
    sign: string
}

export class Wsn {
    private readonly _wsSoapConnection: WsConnection

    // private readonly _wsnService: WsnService

    constructor(service: string, wsConnection: WsConnection) {
        // this._wsnService = new WsnService(service)
        this._wsSoapConnection = wsConnection
    }

    async CallMethod(method: string, args: any, auth: Auth): Promise<any> {
        const soapConnection = await this._wsSoapConnection.SoapConnection()
        const call = soapConnection[method + 'Async']
        const argsWithAuth = {
            Auth: {
                Cuit: auth.cuit,
                Token: auth.token,
                Sign: auth.sign,
            },
            ...args,
        }
        const [err, result] = await call(argsWithAuth)
        if (err !== undefined) {
            console.log(typeof err)
            throw new Error(JSON.stringify(err))
        }
        return result
    }
}
