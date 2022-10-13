// import {WsaaSoapConnection} from "../src/application/infrastructure/wsaaSoapConnection/wsaaSoapConnection";
// import {Client, createClientAsync} from "soap";
import {WsSoapConnection} from "../src/application/infrastructure/wsSoapConnection";
// import {util} from "node-forge";
// import raw = module

describe('internal test', () => {
    jest.setTimeout(60000)
    it('fetch wsn', async () => {
        // let soapConnection: Client
        try {
            // https://wswhomo.afip.gov.ar/wsfexv1/service.asmx?WSDL
            // https://wsaahomo.afip.gov.ar/ws/services/LoginCms?wsdl
            // soapConnection = await createClientAsync('https://wswhomo.afip.gov.ar/wsfexv1/service.asmx?WSDL', {
            //     namespaceArrayElements: false,
            // })
            const soapConnection = await new WsSoapConnection('https://wswhomo.afip.gov.ar/wsfexv1/service.asmx?WSDL').SoapConnection()
            const paramsWithAuth = {
                Auth: {
                    Cuit: '20415892315',
                    Token: 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJjbj13c2ZleCxvPWFmaXAsYz1hciIgdW5pcXVlX2lkPSI0NTk4MTMxNjgiIGdlbl90aW1lPSIxNjY1NTk3ODkyIiBleHBfdGltZT0iMTY2NTY0MTE1MiIvPgogICAgPG9wZXJhdGlvbiB0eXBlPSJsb2dpbiIgdmFsdWU9ImdyYW50ZWQiPgogICAgICAgIDxsb2dpbiBlbnRpdHk9IjMzNjkzNDUwMjM5IiBzZXJ2aWNlPSJ3c2ZleCIgdWlkPSJTRVJJQUxOVU1CRVI9Q1VJVCAyMDQxNTg5MjMxNSwgQ049d3NhYWhvbW8iIGF1dGhtZXRob2Q9ImNtcyIgcmVnbWV0aG9kPSIyMiI+CiAgICAgICAgICAgIDxyZWxhdGlvbnM+CiAgICAgICAgICAgICAgICA8cmVsYXRpb24ga2V5PSIyMDQxNTg5MjMxNSIgcmVsdHlwZT0iNCIvPgogICAgICAgICAgICA8L3JlbGF0aW9ucz4KICAgICAgICA8L2xvZ2luPgogICAgPC9vcGVyYXRpb24+Cjwvc3NvPgo=',
                    Sign: 'G1o94py2LZ+FvPW+svzWVFCUbBVd2qe+jnxcT17edyJ9K+keQTbYDY1otACnx+U2lh9FQY+t9VBGv9cx/Mx2h3L8njV8+a/O81RYBWWTtVdwWpjDnkfsLj6Q2ZWrG7fwdnzd9TCyUcxi3Y/PX0Ytt263Bmn6yw5Hem4Dyob9V5k=',
                },
                Cmp: {},
            }
            // @ts-ignore
            const method = soapConnection['FEXAuthorize' + 'Async']
            console.log(method)
            const [result, rawResponse] = await method(paramsWithAuth)
            console.log(result)
            console.log(rawResponse)
        } catch (e) {
            console.error(e)
        }
    })
})
