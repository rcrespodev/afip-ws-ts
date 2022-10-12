import {openssl} from "openssl-ts";
import {create} from 'xmlbuilder';
import * as fs from "fs";
import {NTPClient} from "ntpclient";
import moment from "moment";
import {AppErrorHandler} from "../utils/appErrorHandler";

export class TokenRequest {
    private readonly _cuit: string

    constructor(cuit: string) {
        this._cuit = cuit
    }

    async NewRequest(service: string): Promise<string | Error> {
        const loginRequest = await this.writeLoginTicketRequest(service)
        if (loginRequest instanceof Error) {
            return loginRequest
        }

        const str = await this.certOutput()
        if (str instanceof Error) {
            return str
        }

        const regex = /(-+BEGIN CMS-+)(.*?)(-+END CMS-+)/s;
        const match = regex.exec(str)
        if (match === null) {
            console.error('Fail to parse Cms string')
            throw new Error('Internal server Error')
        }

        return match[2].trim()
    }

    private async writeLoginTicketRequest(service: string): Promise<Error | undefined> {
        const AfipTime = await new NTPClient('time.afip.gov.ar', 123).getNetworkTime()
        const expirationTime = moment(AfipTime).add(
            12,
            'hours'
        )
        const xmlRequest = create('loginTicketRequest', {encoding: 'utf-8'})
            .ele('header')
            .ele('uniqueId', moment().format('X')).up()
            .ele('generationTime', this.formatOutputDate(AfipTime)).up()
            .ele('expirationTime', this.formatOutputDate(expirationTime)).up()
            .up()
            .ele('service', service).up()
            .end({pretty: true})

        try {
            await fs.writeFileSync(`private/${this._cuit}/MiLoginTicketRequest.xml`, xmlRequest)
        } catch (e) {
            return AppErrorHandler(e, 'new token generation')
        }
    }

    private formatOutputDate(date: Date | moment.Moment): string {
        return moment(date).format().replace('-03:00', '')
    }

    async certOutput(): Promise<string | Error> {
        try {
            const output = await openssl(['cms', '-sign', '-in', `private/${this._cuit}/MiLoginTicketRequest.xml`,
                '-signer', `private/${this._cuit}/cert.pem`, '-inkey', `private/${this._cuit}/private_key.key`, '-nodetach', '-outform', 'PEM'])
            return output.toString()
        } catch (e) {
            return AppErrorHandler(e, 'new token generation')
        }
    }
}
