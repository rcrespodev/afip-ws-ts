import {AppModule} from "./appModule";
import {NestExpressApplication} from "@nestjs/platform-express";
import {NestFactory} from "@nestjs/core";

export type NewHttpServerCommand = {
    host: string
    port: number
}

export class HttpServer {
    private readonly _port: number
    private readonly _host: string
    private readonly _appModule: AppModule

    constructor(command: NewHttpServerCommand) {
        this._port = command.port
        this._host = command.host
        this._appModule = AppModule
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
