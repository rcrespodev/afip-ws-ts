import {WsConnection} from "../domain/utils/wsConnection";
import {Client, createClientAsync} from "soap";
import {Injectable} from "@nestjs/common";

@Injectable()
export class WsSoapConnection implements WsConnection {
    private readonly _wsdlUrl: string

    constructor(wsdlUrl: string) {
        this._wsdlUrl = wsdlUrl
    }

    async SoapConnection(): Promise<Client> {
        return await createClientAsync(this._wsdlUrl, {
            namespaceArrayElements: false,
        })
    }
}
