import {Controller, Post, Body} from '@nestjs/common';
import {ApplicationResponse} from "../../application/domain/utils/applicationResponse";
import {DependencyInjectionContainer} from "../dependencyInjectionContainer/dependencyInjectionContainer";
import {RequestCommand} from "../../application/services/fetchRequestWsn";

@Controller('wsn')
export class FetchRequestWsnController {
    private container: DependencyInjectionContainer

    constructor(container: DependencyInjectionContainer) {
        this.container = container
    }

    @Post()
    async Fetch(@Body() command: RequestCommand): Promise<ApplicationResponse> {
        if (this.container === undefined) {
            this.container = new DependencyInjectionContainer()
        }
        return await this.container.GetFetchRequestWsn().Request(command)
    }
}
