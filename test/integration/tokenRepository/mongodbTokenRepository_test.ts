import {MongodbTokenRepository} from "../../../src/application/infrastructure/token_repository/mongodbTokenRepository";
import * as dotenv from "dotenv";

dotenv.config();

describe('mongo db test', () => {
    it('insert document', async () => {
        const repository = new MongodbTokenRepository({
            pass: process.env.MONGO_DB_PASS,
            targetDb: process.env.MONGO_DB_DATABASE,
            user: process.env.MONGO_DB_USER
        })
        await repository.UpdateToken(schema)
        expect(await repository.GetToken('20415892311', 'wsfex')).toStrictEqual(schema)
        await repository.ClearAll()
    })
})

const schema = {
    cuit: "20415892311",
    destination: "SERIALNUMBER=CUIT 20415892311, CN=wsaahomo",
    expirationTime: "2022-10-12T05:13:18.864-03:00",
    generationTime: "2022-10-11T17:13:18.864-03:00",
    id: 396860779,
    service: "wsfex",
    sign: "nHkbCbrrv4apavv8689BkjHW8AUgRsiY0areJjmJcUoxY6EN39r35C4gUIzQVL33iE4X/MkUDE+2vSBOQE/8OUdkNYb/V0UrqtL40dvLGV2Els24sKD6mFm/vtG0KjiXOQVfCMX+A7AYnatS5os0nNf3rFoZwoAC8mvqB/yOOrQ=",
    source: "CN=wsaahomo, O=AFIP, C=AR, SERIALNUMBER=CUIT 33693450239",
    token: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJjbj13c2ZleCxvPWFmaXAsYz1hciIgdW5pcXVlX2lkPSIxMTk4MDI1NjI4IiBnZW5fdGltZT0iMTY2NTUxOTEzOCIgZXhwX3RpbWU9IjE2NjU1NjIzOTgiLz4KICAgIDxvcGVyYXRpb24gdHlwZT0ibG9naW4iIHZhbHVlPSJncmFudGVkIj4KICAgICAgICA8bG9naW4gZW50aXR5PSIzMzY5MzQ1MDIzOSIgc2VydmljZT0id3NmZXgiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjA0MTU4OTIzMTUsIENOPXdzYWFob21vIiBhdXRobWV0aG9kPSJjbXMiIHJlZ21ldGhvZD0iMjIiPgogICAgICAgICAgICA8cmVsYXRpb25zPgogICAgICAgICAgICAgICAgPHJlbGF0aW9uIGtleT0iMjA0MTU4OTIzMTUiIHJlbHR5cGU9IjQiLz4KICAgICAgICAgICAgPC9yZWxhdGlvbnM+CiAgICAgICAgPC9sb2dpbj4KICAgIDwvb3BlcmF0aW9uPgo8L3Nzbz4K",
}
