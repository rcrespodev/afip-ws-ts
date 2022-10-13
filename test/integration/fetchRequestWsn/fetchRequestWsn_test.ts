// import {WsaaMock} from "./wsaaMock";
import {RequestCommand} from "../../../src/application/services/fetchRequestWsn";
// import {WsConnection} from "../../../src/application/domain/utils/wsConnection";
import {TestData} from "./testData";
import {FetchRequestWsnController} from "../../../src/api/controllers/fetchRequestWsnController";
import {DependencyInjectionContainer} from "../../../src/api/dependencyInjectionContainer/dependencyInjectionContainer";
import {MongodbTokenRepository} from "../../../src/application/infrastructure/token_repository/mongodbTokenRepository";
import * as dotenv from "dotenv";

dotenv.config();
// @ts-ignore
let container = new DependencyInjectionContainer({
    mongoDbPass: process.env.MONGO_DB_PASS,
    mongoDbUser: process.env.MONGO_DB_USER,
    mongoDbDataBase: process.env.MONGO_DB_DATABASE,
})

describe('Fetch request controller test', () => {
    jest.setTimeout(30000)
    test.each(TestData)('Request() - $args.name', async ({args, expected}) => {
        const controller = new FetchRequestWsnController()
        const cmd: RequestCommand = {
            auth: {cuit: args.command.auth.cuit},
            body: args.command.body,
            targetService: {method: args.command.targetService.method, wsnId: args.command.targetService.wsnId}
        }
        const result = await controller.Fetch(cmd)
        console.log(result)
        if (result.error !== undefined) {
            expect(result.status.wsn_http_code).not.toBe(200)
            return
        }
        expect(result.status.wsn_http_code).toBe(200)

        const repository = container.GetTokenRepository()
        if (repository instanceof MongodbTokenRepository) {
            await repository.ClearAll()
        }
    })
})
