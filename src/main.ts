import {HttpServer} from "./httpServer";
import * as dotenv from "dotenv";

dotenv.config();

const httpServer = new HttpServer({
    apiHost: process.env.API_HOST || '0.0.0.0',
    apiPort: parseInt(process.env.API_PORT) || 8080,
    mongoDbPass: process.env.MONGO_DB_PASS,
    mongoDbUser: process.env.MONGO_DB_USER,
    mongoDbDataBase: process.env.MONGO_DB_DATABASE,
})

export async function Main() {
    httpServer.Run()
}

Main()
