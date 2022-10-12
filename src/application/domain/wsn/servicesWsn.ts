type AllowedServicesWsn = "wsfex" | "wsfe"

export class WsnService {
    private readonly _wsnId: AllowedServicesWsn

    constructor(service: string) {
        if (service === "wsfex" || service === "wsfe") {
            this._wsnId = service
            return
        }
        throw new Error(`service ${service} not allowed as WSN`)
    }

    GetWsnId(): string {
        return this._wsnId;
    }
}
