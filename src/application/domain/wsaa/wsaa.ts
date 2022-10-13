import {ApplicationResponse} from "../utils/applicationResponse";

export interface Wsaa {
    GetTokenAndSign(cuit: string, service: string): Promise<ApplicationResponse>
}
