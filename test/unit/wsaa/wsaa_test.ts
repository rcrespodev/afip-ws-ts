import {Wsaa} from "../../../src/application/domain/wsaa/wsaa";
import {MockTokenRepository} from "../../../src/application/infrastructure/token_repository/mock_token_repository";
import {WsaaMockConnection} from "../../../src/application/infrastructure/wsaaSoapConnection/wsaaMockConnection";
import {WsaaResponseParser} from "../../../src/application/domain/wsaa/wsaaResponseParser";
import {XmlParser} from "../../../src/application/domain/utils/xmlParser";
// @ts-ignore
import {TestData} from './testData';
import {TokenRepository} from "../../../src/application/domain/wsaa/token_repository";
import {WsaaConnection} from "../../../src/application/domain/wsaa/wsaaConnection";

let tokenRepository: TokenRepository
let soapConnection: WsaaConnection

beforeEach(async () => {
    tokenRepository = await new MockTokenRepository(mockRepositroryData)
    soapConnection = await new WsaaMockConnection()
})

describe('Get Token And Sign unit test', () => {
    test.each(TestData)('GetTokenAndSign() - $args.name', async ({args, expected}) => {
        const wsaa = new Wsaa(tokenRepository, soapConnection, new WsaaResponseParser(new XmlParser()))
        const actual = await wsaa.GetTokenAndSign(args.cuit, args.service)
        expect(actual).toStrictEqual(expected)
        if (actual.error !== undefined) {
            return
        }
        expect(await tokenRepository.GetToken(args.cuit, args.service)).not.toBe(undefined)
    })
})

const mockRepositroryData = [
    {
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
]
