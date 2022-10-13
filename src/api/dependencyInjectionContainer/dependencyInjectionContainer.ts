import {FetchRequestWsn} from "../../application/services/fetchRequestWsn";
import {Wsaa} from "../../application/domain/wsaa/wsaa";
import {WsaaImplementation} from "../../application/domain/wsaa/wsaaImplementation";
import {TokenRepository} from "../../application/domain/wsaa/token_repository";
import {MockTokenRepository} from "../../application/infrastructure/token_repository/mock_token_repository";
import {WsConnection} from "../../application/domain/utils/wsConnection";
import {WsaaResponseParser} from "../../application/domain/wsaa/wsaaResponseParser";
import {WsSoapConnection} from "../../application/infrastructure/wsSoapConnection";
import {WsUrls} from "../../application/domain/utils/wsUrls";
import {XmlParser} from "../../application/domain/utils/xmlParser";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DependencyInjectionContainer {
    private readonly _fetchRequestWsn: FetchRequestWsn
    private readonly _wsaa: Wsaa
    private readonly _tokenRepository: TokenRepository
    private readonly _wsConnection: WsConnection
    private readonly _wsaaResponseParser: WsaaResponseParser

    constructor() {
        this._tokenRepository = new MockTokenRepository([])
        this._wsConnection = new WsSoapConnection(WsUrls.testing.login)
        this._wsaaResponseParser = new WsaaResponseParser(new XmlParser())
        this._wsaa = new WsaaImplementation(this._tokenRepository, this._wsConnection, this._wsaaResponseParser)
        this._fetchRequestWsn = new FetchRequestWsn(this._wsaa)
    }

    GetFetchRequestWsn(): FetchRequestWsn {
        return this._fetchRequestWsn;
    }
}
