// @ts-ignore
import {TableTest} from "../../utils/tableTest";
import {ApplicationResponse} from "../../../src/application/domain/utils/applicationResponse";
import {RequestCommand} from "../../../src/application/services/fetchRequestWsn";

export type Args = {
    name: string
    command: RequestCommand
}

export const TestData: TableTest<Args, ApplicationResponse> = [
    // {
    //     args: {
    //         name: "wsfex-Success. Good request", command: {
    //             auth: {cuit: "20415892315"},
    //             body: {
    //                 Cmp: {
    //                     Id: 1,
    //                     Fecha_cbte: 20221013,
    //                     Cbte_Tipo: 19,
    //                     Punto_vta: 2,
    //                     Cbte_nro: 1,
    //                     Tipo_expo: 1,
    //                     Permiso_existente: "S",
    //                     Permisos: [
    //                         {
    //                             Permiso: {
    //                                 Id_permiso: '09052EC01006154G',
    //                                 Dst_merc: 203,
    //                             },
    //                         },
    //                         {
    //                             Permiso: {
    //                                 Id_permiso: '09052EC01006154G',
    //                                 Dst_merc: 202,
    //                             },
    //                         },
    //                     ],
    //                     Dst_cmp: 203,
    //                     Cliente: 'Joao Da Silva',
    //                     Cuit_pais_cliente: 50000000016,
    //                     Domicilio_cliente: 'Rua 76 km 34.5 Alagoas',
    //                     Id_impositivo: 'PJ54482221-l',
    //                     Moneda_Id: '012',
    //                     Moneda_ctz: 150,
    //                     Obs_comerciale: 'Sin observaciones',
    //                     Imp_total: "500",
    //                     Obs: "",
    //                     Forma_pago: "Contado",
    //                     Incoterms: "CIF",
    //                     Incoterms_Ds: "Texto",
    //                     Idioma_cbte: "1",
    //                     Items: [
    //                         {
    //                             Item: {
    //                                 Pro_codigo: "PRO1",
    //                                 Pro_ds: "Producto",
    //                                 Pro_qty: "2",
    //                                 Pro_umed: "7",
    //                                 Pro_precio_uni: "250", Pro_total_item: "500"
    //                             },
    //                         },
    //                     ],
    //                 },
    //             },
    //             targetService: {method: 'FEXAuthorize', wsnId: 'wsfex'}
    //         }
    //     },
    //     expected: {
    //         data: undefined,
    //         error: undefined,
    //         headers: undefined, status: {http_code: 200}
    //     }
    // },
    {
        args: {
            name: "Error. invalid payload", command: {
                auth: {cuit: "20415892315"},
                body: {Cmp: {}},
                targetService: {method: 'FEXAuthorize', wsnId: 'wsfex'}
            }
        },
        expected: {
            data: undefined,
            error: `Error on Soap WSN Method execution. Description: {"FEXAuthorizeResult":{"FEXErr":{"ErrCode":1000,"ErrMsg":"Usuario no autorizado a realizar esta operacion. ValidacionDeToken: No apareció CUIT en lista de relaciones: 20415892311"},"FEXEvents":{"EventCode":0,"EventMsg":"Ok"}}}`,
            headers: undefined, status: {http_code: 400}
        }
    },
]
