import {AppModule} from "./appModule";
import {NestExpressApplication} from "@nestjs/platform-express";
import {NestFactory} from "@nestjs/core";
import {DependencyInjectionContainer} from "./api/dependencyInjectionContainer/dependencyInjectionContainer";

export type NewHttpServerCommand = {
    apiHost: string
    apiPort: number
    mongoDbUser: string
    mongoDbPass: string
    mongoDbDataBase: string
}

export class HttpServer {
    private readonly _port: number
    private readonly _host: string
    private readonly _appModule: AppModule

    constructor(command: NewHttpServerCommand) {
        this._port = command.apiPort
        this._host = command.apiHost
        this._appModule = AppModule
        new DependencyInjectionContainer({
            mongoDbUser: command.mongoDbUser,
            mongoDbPass: command.mongoDbPass,
            mongoDbDataBase: command.mongoDbDataBase
        })
    }

    Run() {
        const bootstrap = async () => {
            const app = await NestFactory.create<NestExpressApplication>(this._appModule);
            await app.listen(this._port, this._host, () => {
                console.log(`Afip Ws Ts listening on ${this._host}:${this._port}`)
                return
            });
        }
        bootstrap()
    }
}
