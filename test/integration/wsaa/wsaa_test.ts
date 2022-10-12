import {MockTokenRepository} from "../../../src/application/infrastructure/token_repository/mock_token_repository";
import {WsaaSoapConnection} from "../../../src/application/infrastructure/wsaaSoapConnection/wsaaSoapConnection";
import {Wsaa} from "../../../src/application/domain/wsaa/wsaa";
import {WsaaResponseParser} from "../../../src/application/domain/wsaa/wsaaResponseParser";
import {XmlParser} from "../../../src/application/domain/utils/xmlParser";
import {WsUrls} from "../../../src/application/domain/utils/wsUrls";

describe('FetchNewTokenAndSign', () => {
    jest.setTimeout(30000)
    it('just fetch new token from netwrok', async () => {
        const tokenRepository = new MockTokenRepository([])
        const soapConnection = new WsaaSoapConnection(WsUrls.testing.login)
        const wsaa = new Wsaa(tokenRepository, soapConnection, new WsaaResponseParser(new XmlParser()))
        const token = await wsaa.GetTokenAndSign('20415892315', 'wsfex')
        console.log(token)
        if (token.error !== undefined) { // Error
            expect(token.data).toBe(undefined)
            expect(token.status.http_code).not.toBe(200)
            return
        }

        expect(token.data).not.toBe(undefined)
        expect(token.status.http_code).toBe(200)
    })
})
