import {WsUrls} from "./wsUrls";

export function GetUrlWsn(targetService: string): string {
    const srv = WsUrls.testing.service
    return srv.replace('{name}', targetService.concat('v1'))
}
