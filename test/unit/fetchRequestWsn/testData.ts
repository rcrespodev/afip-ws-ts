// @ts-ignore
import {TableTest} from "../../utils/tableTest";
import {ApplicationResponse} from "../../../src/application/domain/utils/applicationResponse";
import {RequestCommand} from "../../../src/application/services/fetchRequestWsn";

export type Args = {
    name: string
    command: RequestCommand
}

export const TestData: TableTest<Args, ApplicationResponse> = [
    {
        args: {
            name: "Error. cuit no allowed", command: {
                auth: {cuit: "20415892310"},
                body: {Cmp: {}},
                targetService: {method: 'FEXAuthorize', wsnId: 'wsfex'}
            }
        },
        expected: {
            data: {
                FEXAuthorizeResult: {
                    FEXErr: {
                        ErrCode: 1000,
                        ErrMsg: "Usuario no autorizado a realizar esta operacion. ValidacionDeToken: No apareció CUIT en lista de relaciones: 20415892310"
                    }, FEXEvents: {EventCode: 0, EventMsg: "Ok"}
                }
            },
            error: undefined,
            headers: undefined, status: {wsn_http_code: 200}
        }
    },
    {
        args: {
            name: "Error. invalid payload", command: {
                auth: {cuit: "20415892311"},
                body: {Cmp: {}},
                targetService: {method: 'FEXAuthorize', wsnId: 'wsfex'}
            }
        },
        expected: {
            error: undefined,
            data: {
                "FEXAuthorizeResult": {
                    "FEXErr": {
                        "ErrCode": 1014,
                        "ErrMsg": "Campo auth.id invalido:0. Debe ser numerico mayor o igual  a 0 y menor de 100000000000000."
                    }, "FEXEvents": {"EventCode": 0, "EventMsg": "Ok"}
                }
            },
            headers: undefined, status: {wsn_http_code: 200}
        }
    },
]
