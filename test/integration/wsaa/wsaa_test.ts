import {MockTokenRepository} from "../../../src/application/infrastructure/token_repository/mock_token_repository";
import {WsSoapConnection} from "../../../src/application/infrastructure/wsSoapConnection";
import {WsaaImplementation} from "../../../src/application/domain/wsaa/wsaaImplementation";
import {WsaaResponseParser} from "../../../src/application/domain/wsaa/wsaaResponseParser";
import {XmlParser} from "../../../src/application/domain/utils/xmlParser";
import {WsUrls} from "../../../src/application/domain/utils/wsUrls";

describe('FetchNewTokenAndSign', () => {
    jest.setTimeout(30000)
    it('just fetch new token from netwrok', async () => {
        const tokenRepository = new MockTokenRepository([])
        const soapConnection = new WsSoapConnection(WsUrls.testing.login)
        const wsaa = new WsaaImplementation(tokenRepository, soapConnection, new WsaaResponseParser(new XmlParser()))
        const token = await wsaa.GetTokenAndSign('20415892315', 'wsfex')
        if (token.error !== undefined) { // Error
            expect(token.data).toBe(undefined)
            expect(token.status.http_code).not.toBe(200)
            return
        }
        // console.log(token)
        expect(await tokenRepository.GetToken('20415892315', 'wsfex')).not.toBe(undefined)
        expect(token.data).not.toBe(undefined)
        expect(token.status.http_code).toBe(200)
    })
})
