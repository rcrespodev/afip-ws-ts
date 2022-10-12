// import {Wsaa} from "../domain/wsaa";

export type RequestCommand = {
    auth: {
        cuit: string
    }
    targetWsn : {
        url: string
    }
    body: any
}

// export class Fetch_request_wsn {
//     private readonly _wsaa: Wsaa
//
//     constructor(wssa: Wsaa) {
//         this._wsaa = wssa
//     }
//
//     async Request(command: RequestCommand): Promise<void> {
//         const tokenAndSign = await this._wsaa.GetTokenAndSign(command.auth.cuit)
//     }
// }
