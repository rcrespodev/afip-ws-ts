// import {WsaaMock} from "./wsaaMock";
import {RequestCommand} from "../../../src/application/services/fetchRequestWsn";
// import {WsConnection} from "../../../src/application/domain/utils/wsConnection";
import {TestData} from "./testData";
import {FetchRequestWsnController} from "../../../src/api/controllers/fetchRequestWsnController";
import {DependencyInjectionContainer} from "../../../src/api/dependencyInjectionContainer/dependencyInjectionContainer";

// let soapConnection: WsConnection

beforeEach(async () => {
})

describe('Fetch request controller test', () => {
    jest.setTimeout(30000)
    test.each(TestData)('Request() - $args.name', async ({args, expected}) => {
        const controller = new FetchRequestWsnController(new DependencyInjectionContainer())
        const cmd: RequestCommand = {
            auth: {cuit: args.command.auth.cuit},
            body: args.command.body,
            targetService: {method: args.command.targetService.method, wsnId: args.command.targetService.wsnId}
        }
        const result = await controller.Fetch(cmd)
        if (result.error !== undefined) {
            expect(result.status.http_code).not.toBe(200)
            return
        }
        expect(result.status.http_code).toBe(200)
    })
})
