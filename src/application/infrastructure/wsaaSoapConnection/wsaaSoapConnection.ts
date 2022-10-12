import {WsaaConnection} from "../../domain/wsaa/wsaaConnection";
import {createClientAsync} from "soap";

export class WsaaSoapConnection implements WsaaConnection {
    private readonly _wsdlUrl: string

    constructor(wsdlUrl: string) {
        this._wsdlUrl = wsdlUrl
    }

    async SoapConnection(): Promise<any> {
        return await createClientAsync(this._wsdlUrl, {
            namespaceArrayElements: false,
        })
    }
}
