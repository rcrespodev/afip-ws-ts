import { Module } from '@nestjs/common';
import {DependencyInjectionContainer} from "./api/dependencyInjectionContainer/dependencyInjectionContainer";
import {FetchRequestWsnController} from "./api/controllers/fetchRequestWsnController";

@Module({
    controllers: [FetchRequestWsnController],
    providers: [DependencyInjectionContainer],
})
export class AppModule {}
