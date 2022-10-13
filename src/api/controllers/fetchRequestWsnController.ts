import {Controller, Post, Body} from '@nestjs/common';
import {ApplicationResponse} from "../../application/domain/utils/applicationResponse";
import {Instance} from "../dependencyInjectionContainer/dependencyInjectionContainer";
import {RequestCommand} from "../../application/services/fetchRequestWsn";

@Controller('v1/wsn')
export class FetchRequestWsnController {
    @Post()
    async Fetch(@Body() command: RequestCommand): Promise<ApplicationResponse> {
        return await Instance.GetFetchRequestWsn().Request(command)
    }
}
