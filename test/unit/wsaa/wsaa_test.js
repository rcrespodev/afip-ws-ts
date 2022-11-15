"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wsaa_1 = require("../../../src/application/domain/wsaa/wsaa");
const mock_token_repository_1 = require("../../../src/application/infrastructure/token_repository/mock_token_repository");
const wsaaMockConnection_1 = require("../../../src/application/infrastructure/wsaaSoapConnection/wsaaMockConnection");
const wsaaResponseParser_1 = require("../../../src/application/domain/wsaa/wsaaResponseParser");
const xmlParser_1 = require("../../../src/application/domain/utils/xmlParser");
// @ts-ignore
const testData_1 = require("./testData");
let tokenRepository;
let soapConnection;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    tokenRepository = yield new mock_token_repository_1.MockTokenRepository(mockRepositroryData);
    soapConnection = yield new wsaaMockConnection_1.WsaaMockConnection();
}));
describe('Get Token And Sign unit test', () => {
    test.each(testData_1.TestData)('GetTokenAndSign() - $args.name', ({ args, expected }) => __awaiter(void 0, void 0, void 0, function* () {
        const wsaa = new wsaa_1.Wsaa(tokenRepository, soapConnection, new wsaaResponseParser_1.WsaaResponseParser(new xmlParser_1.XmlParser()));
        const actual = yield wsaa.GetTokenAndSign(args.cuit, args.service);
        expect(actual).toStrictEqual(expected);
        if (actual.error !== undefined) {
            return;
        }
        expect(yield tokenRepository.GetToken(args.cuit, args.service)).not.toBe(undefined);
    }));
});
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
];
