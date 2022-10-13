import {WsaaMock} from "../../integration/fetchRequestWsn/wsaaMock";
import {FetchRequestWsn, RequestCommand} from "../../../src/application/services/fetchRequestWsn";
import {WsConnection} from "../../../src/application/domain/utils/wsConnection";
import {TestData} from "./testData";
import {WsaaMockConnection} from "../../../src/application/infrastructure/wsaaSoapConnection/wsaaMockConnection";

let soapConnection: WsConnection

beforeEach(async () => {
    soapConnection = new WsaaMockConnection()
})

describe('Fetch request unit test', () => {
    test.each(TestData)('Request() - $args.name', async ({args, expected}) => {
        const wsaa = new WsaaMock()
        const fetchWsn = new FetchRequestWsn(wsaa)
        const cmd: RequestCommand = {
            auth: {cuit: args.command.auth.cuit},
            body: args.command.body,
            targetService: {method: args.command.targetService.method, wsnId: args.command.targetService.wsnId}
        }
        const result = await fetchWsn.Request(cmd, soapConnection)
        expect(result).toStrictEqual(expected)
    })
})
