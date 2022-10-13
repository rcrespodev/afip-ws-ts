import {Wsaa} from "../../../src/application/domain/wsaa/wsaa";
import {ApplicationResponse} from "../../../src/application/domain/utils/applicationResponse";

export class WsaaMock implements Wsaa {
    async GetTokenAndSign(cuit: string, service: string): Promise<ApplicationResponse> {
        let response: ApplicationResponse
        response = {
            headers: undefined,
            status: {wsn_http_code: 200},
            data: {
                token: {
                    cuit: "20415892315",
                    service: "wsfex",
                    sign: "Sjj77BEE08vGkbaOf6kTXf2KcyKsulb7srm+/bKyJh/uLJDCJYYfWGumrK+o6gGwcpgTtXIQKzVF6LmYkpOeKTbrlQI+njIkRIC2BJD0ZDc0Aag4ByEg1p+OZcygLsaMSFwCjYCI0drw5xz7PSJ0h1F8z+jAZ82mvnvJdjKiAqo=",
                    token: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJjbj13c2ZleCxvPWFmaXAsYz1hciIgdW5pcXVlX2lkPSI0MDE1NTI2NTUiIGdlbl90aW1lPSIxNjY1Njg1NjgwIiBleHBfdGltZT0iMTY2NTcyODk0MCIvPgogICAgPG9wZXJhdGlvbiB0eXBlPSJsb2dpbiIgdmFsdWU9ImdyYW50ZWQiPgogICAgICAgIDxsb2dpbiBlbnRpdHk9IjMzNjkzNDUwMjM5IiBzZXJ2aWNlPSJ3c2ZleCIgdWlkPSJTRVJJQUxOVU1CRVI9Q1VJVCAyMDQxNTg5MjMxNSwgQ049d3NhYWhvbW8iIGF1dGhtZXRob2Q9ImNtcyIgcmVnbWV0aG9kPSIyMiI+CiAgICAgICAgICAgIDxyZWxhdGlvbnM+CiAgICAgICAgICAgICAgICA8cmVsYXRpb24ga2V5PSIyMDQxNTg5MjMxNSIgcmVsdHlwZT0iNCIvPgogICAgICAgICAgICA8L3JlbGF0aW9ucz4KICAgICAgICA8L2xvZ2luPgogICAgPC9vcGVyYXRpb24+Cjwvc3NvPgo=",
                }
            },
            error: undefined,
        }
        return response

    }
}
