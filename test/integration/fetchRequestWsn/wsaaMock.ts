import {Wsaa} from "../../../src/application/domain/wsaa/wsaa";
import {ApplicationResponse} from "../../../src/application/domain/utils/applicationResponse";

export class WsaaMock implements Wsaa {
    async GetTokenAndSign(cuit: string, service: string): Promise<ApplicationResponse> {
        let response: ApplicationResponse
        response = {
            headers: undefined,
            status: {http_code: 200},
            data: {
                token: {
                    cuit: "20415892311",
                    service: "wsfex",
                    sign: "G1o94py2LZ+FvPW+svzWVFCUbBVd2qe+jnxcT17edyJ9K+keQTbYDY1otACnx+U2lh9FQY+t9VBGv9cx/Mx2h3L8njV8+a/O81RYBWWTtVdwWpjDnkfsLj6Q2ZWrG7fwdnzd9TCyUcxi3Y/PX0Ytt263Bmn6yw5Hem4Dyob9V5k=",
                    token: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJjbj13c2ZleCxvPWFmaXAsYz1hciIgdW5pcXVlX2lkPSI0NTk4MTMxNjgiIGdlbl90aW1lPSIxNjY1NTk3ODkyIiBleHBfdGltZT0iMTY2NTY0MTE1MiIvPgogICAgPG9wZXJhdGlvbiB0eXBlPSJsb2dpbiIgdmFsdWU9ImdyYW50ZWQiPgogICAgICAgIDxsb2dpbiBlbnRpdHk9IjMzNjkzNDUwMjM5IiBzZXJ2aWNlPSJ3c2ZleCIgdWlkPSJTRVJJQUxOVU1CRVI9Q1VJVCAyMDQxNTg5MjMxNSwgQ049d3NhYWhvbW8iIGF1dGhtZXRob2Q9ImNtcyIgcmVnbWV0aG9kPSIyMiI+CiAgICAgICAgICAgIDxyZWxhdGlvbnM+CiAgICAgICAgICAgICAgICA8cmVsYXRpb24ga2V5PSIyMDQxNTg5MjMxNSIgcmVsdHlwZT0iNCIvPgogICAgICAgICAgICA8L3JlbGF0aW9ucz4KICAgICAgICA8L2xvZ2luPgogICAgPC9vcGVyYXRpb24+Cjwvc3NvPgo=",
                }
            },
            error: undefined,
        }
        return response

    }
}
