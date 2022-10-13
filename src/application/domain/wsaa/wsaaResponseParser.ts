import {TokenSchema} from "./token_repository";
import {XmlParser} from "../utils/xmlParser";
import {Injectable} from "@nestjs/common";

@Injectable()
export class WsaaResponseParser {
    private readonly _xmlParser: XmlParser

    constructor(xmlParser: XmlParser) {
        this._xmlParser = xmlParser
    }
    async Parse(cuit: string, service: string, response: [any]): Promise<TokenSchema> {
        const loginCmsReturn: string = response[0].loginCmsReturn;
        const res = await this._xmlParser.ParseFromString<{
            loginTicketResponse: {
                header: {
                    source: string
                    destination: string
                    uniqueId: number
                    generationTime: string
                    expirationTime: string
                }
                credentials: {
                    token: string;
                    sign: string;
                };
            };
        }>(loginCmsReturn);
        return {
            cuit: cuit,
            source: res.loginTicketResponse.header.source,
            destination: res.loginTicketResponse.header.destination,
            id: res.loginTicketResponse.header.uniqueId,
            generationTime: res.loginTicketResponse.header.generationTime,
            expirationTime: res.loginTicketResponse.header.expirationTime,
            token: res.loginTicketResponse.credentials.token,
            sign: res.loginTicketResponse.credentials.sign,
            service: service
        }
    }
}
