// @ts-ignore
import {TableTest} from "../../utils/tableTest";
import {ApplicationResponse} from "../../../src/application/domain/utils/applicationResponse";

export type Args = {
    name: string
    cuit: string
    service: string
}

export const TestData: TableTest<Args, ApplicationResponse> = [
    {
        args: {name: "Error. customer without pem cert", cuit: "20415892310", service: 'wsfex'},
        expected: {
            data: undefined,
            error: `Error on new token generation. Description: ENOENT: no such file or directory, open 'private/20415892310/MiLoginTicketRequest.xml'`,
            headers: undefined, status: {http_code: 500}
        }
    },
    {
        args: {name: "Error. bad target wsn service", cuit: "20415892310", service: 'wsfef'},
        expected: {
            data: undefined,
            error: `Error on new token generation. Description: service wsfef not allowed as WSN`,
            headers: undefined, status: {http_code: 400}
        }
    },
    {
        args: {name: "Success. Get token from repository", cuit: "20415892311", service: 'wsfex'},
        expected: {
            data: {
                token: {
                    cuit: "20415892311",
                    destination: "SERIALNUMBER=CUIT 20415892311, CN=wsaahomo",
                    expirationTime: "2022-10-12T05:13:18.864-03:00",
                    generationTime: "2022-10-11T17:13:18.864-03:00",
                    id: 396860779,
                    service: "wsfex",
                    sign: "nHkbCbrrv4apavv8689BkjHW8AUgRsiY0areJjmJcUoxY6EN39r35C4gUIzQVL33iE4X/MkUDE+2vSBOQE/8OUdkNYb/V0UrqtL40dvLGV2Els24sKD6mFm/vtG0KjiXOQVfCMX+A7AYnatS5os0nNf3rFoZwoAC8mvqB/yOOrQ=",
                    source: "CN=wsaahomo, O=AFIP, C=AR, SERIALNUMBER=CUIT 33693450239",
                    token: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJjbj13c2ZleCxvPWFmaXAsYz1hciIgdW5pcXVlX2lkPSIxMTk4MDI1NjI4IiBnZW5fdGltZT0iMTY2NTUxOTEzOCIgZXhwX3RpbWU9IjE2NjU1NjIzOTgiLz4KICAgIDxvcGVyYXRpb24gdHlwZT0ibG9naW4iIHZhbHVlPSJncmFudGVkIj4KICAgICAgICA8bG9naW4gZW50aXR5PSIzMzY5MzQ1MDIzOSIgc2VydmljZT0id3NmZXgiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjA0MTU4OTIzMTUsIENOPXdzYWFob21vIiBhdXRobWV0aG9kPSJjbXMiIHJlZ21ldGhvZD0iMjIiPgogICAgICAgICAgICA8cmVsYXRpb25zPgogICAgICAgICAgICAgICAgPHJlbGF0aW9uIGtleT0iMjA0MTU4OTIzMTUiIHJlbHR5cGU9IjQiLz4KICAgICAgICAgICAgPC9yZWxhdGlvbnM+CiAgICAgICAgPC9sb2dpbj4KICAgIDwvb3BlcmF0aW9uPgo8L3Nzbz4K",
                },
            }, error: undefined, headers: undefined, status: {http_code: 200}
        }
    },
    {
        args: {name: "Success. Get token and sign from network", cuit: "20415892315", service: 'wsfex'},
        expected: {
            data: {
                token: {
                    cuit: "20415892315",
                    destination: "SERIALNUMBER=CUIT 20415892315, CN=wsaahomo",
                    expirationTime: "2022-10-12T05:13:18.864-03:00",
                    generationTime: "2022-10-11T17:13:18.864-03:00",
                    id: "396860776",
                    service: "wsfex",
                    sign: "nHkbCbrrv4apavv8689BkjHW8AUgRsiY0areJjmJcUoxY6EN39r35C4gUIzQVL33iE4X/MkUDE+2vSBOQE/8OUdkNYb/V0UrqtL40dvLGV2Els24sKD6mFm/vtG0KjiXOQVfCMX+A7AYnatS5os0nNf3rFoZwoAC8mvqB/yOOrQ=",
                    source: "CN=wsaahomo, O=AFIP, C=AR, SERIALNUMBER=CUIT 33693450239",
                    token: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJjbj13c2ZleCxvPWFmaXAsYz1hciIgdW5pcXVlX2lkPSIxMTk4MDI1NjI4IiBnZW5fdGltZT0iMTY2NTUxOTEzOCIgZXhwX3RpbWU9IjE2NjU1NjIzOTgiLz4KICAgIDxvcGVyYXRpb24gdHlwZT0ibG9naW4iIHZhbHVlPSJncmFudGVkIj4KICAgICAgICA8bG9naW4gZW50aXR5PSIzMzY5MzQ1MDIzOSIgc2VydmljZT0id3NmZXgiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjA0MTU4OTIzMTUsIENOPXdzYWFob21vIiBhdXRobWV0aG9kPSJjbXMiIHJlZ21ldGhvZD0iMjIiPgogICAgICAgICAgICA8cmVsYXRpb25zPgogICAgICAgICAgICAgICAgPHJlbGF0aW9uIGtleT0iMjA0MTU4OTIzMTUiIHJlbHR5cGU9IjQiLz4KICAgICAgICAgICAgPC9yZWxhdGlvbnM+CiAgICAgICAgPC9sb2dpbj4KICAgIDwvb3BlcmF0aW9uPgo8L3Nzbz4K",
                },
            }, error: undefined, headers: undefined, status: {http_code: 200}
        }
    },
]
