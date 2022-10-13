import {HttpServer} from "./httpServer";
import * as dotenv from "dotenv";

dotenv.config();

const httpServer = new HttpServer({
    host: process.env.API_HOST || '0.0.0.0',
    port: parseInt(process.env.API_PORT) || 8080
})

export async function Main() {
    httpServer.Run()
}

Main()
