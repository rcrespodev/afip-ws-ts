import {WsaaConnection} from "../../domain/wsaa/wsaaConnection";

export class WsaaMockConnection implements WsaaConnection {
    async SoapConnection(): Promise<any> {
        return new MockConnection()
    }
}

class MockConnection {
    loginCmsAsync(body: any) {
        return [
        {
            loginCmsReturn: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
            '<loginTicketResponse version="1.0">\n' +
            '    <header>\n' +
            '        <source>CN=wsaahomo, O=AFIP, C=AR, SERIALNUMBER=CUIT 33693450239</source>\n' +
            '        <destination>SERIALNUMBER=CUIT 20415892315, CN=wsaahomo</destination>\n' +
            '        <uniqueId>396860776</uniqueId>\n' +
            '        <generationTime>2022-10-11T17:13:18.864-03:00</generationTime>\n' +
            '        <expirationTime>2022-10-12T05:13:18.864-03:00</expirationTime>\n' +
            '    </header>\n' +
            '    <credentials>\n' +
            '        <token>PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJjbj13c2ZleCxvPWFmaXAsYz1hciIgdW5pcXVlX2lkPSIxMTk4MDI1NjI4IiBnZW5fdGltZT0iMTY2NTUxOTEzOCIgZXhwX3RpbWU9IjE2NjU1NjIzOTgiLz4KICAgIDxvcGVyYXRpb24gdHlwZT0ibG9naW4iIHZhbHVlPSJncmFudGVkIj4KICAgICAgICA8bG9naW4gZW50aXR5PSIzMzY5MzQ1MDIzOSIgc2VydmljZT0id3NmZXgiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjA0MTU4OTIzMTUsIENOPXdzYWFob21vIiBhdXRobWV0aG9kPSJjbXMiIHJlZ21ldGhvZD0iMjIiPgogICAgICAgICAgICA8cmVsYXRpb25zPgogICAgICAgICAgICAgICAgPHJlbGF0aW9uIGtleT0iMjA0MTU4OTIzMTUiIHJlbHR5cGU9IjQiLz4KICAgICAgICAgICAgPC9yZWxhdGlvbnM+CiAgICAgICAgPC9sb2dpbj4KICAgIDwvb3BlcmF0aW9uPgo8L3Nzbz4K</token>\n' +
            '        <sign>nHkbCbrrv4apavv8689BkjHW8AUgRsiY0areJjmJcUoxY6EN39r35C4gUIzQVL33iE4X/MkUDE+2vSBOQE/8OUdkNYb/V0UrqtL40dvLGV2Els24sKD6mFm/vtG0KjiXOQVfCMX+A7AYnatS5os0nNf3rFoZwoAC8mvqB/yOOrQ=</sign>\n' +
            '    </credentials>\n' +
            '</loginTicketResponse>'
        },
        '<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soapenv:Body><loginCmsResponse xmlns="http://wsaa.view.sua.dvadac.desein.afip.gov"><loginCmsReturn>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; standalone=&quot;yes&quot;?&gt;\n' +
        '&lt;loginTicketResponse version=&quot;1.0&quot;&gt;\n' +
        '    &lt;header&gt;\n' +
        '        &lt;source&gt;CN=wsaahomo, O=AFIP, C=AR, SERIALNUMBER=CUIT 33693450239&lt;/source&gt;\n' +
        '        &lt;destination&gt;SERIALNUMBER=CUIT 20415892315, CN=wsaahomo&lt;/destination&gt;\n' +
        '        &lt;uniqueId&gt;396860776&lt;/uniqueId&gt;\n' +
        '        &lt;generationTime&gt;2022-10-11T17:13:18.864-03:00&lt;/generationTime&gt;\n' +
        '        &lt;expirationTime&gt;2022-10-12T05:13:18.864-03:00&lt;/expirationTime&gt;\n' +
        '    &lt;/header&gt;\n' +
        '    &lt;credentials&gt;\n' +
        '        &lt;token&gt;PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJjbj13c2ZleCxvPWFmaXAsYz1hciIgdW5pcXVlX2lkPSIxMTk4MDI1NjI4IiBnZW5fdGltZT0iMTY2NTUxOTEzOCIgZXhwX3RpbWU9IjE2NjU1NjIzOTgiLz4KICAgIDxvcGVyYXRpb24gdHlwZT0ibG9naW4iIHZhbHVlPSJncmFudGVkIj4KICAgICAgICA8bG9naW4gZW50aXR5PSIzMzY5MzQ1MDIzOSIgc2VydmljZT0id3NmZXgiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjA0MTU4OTIzMTUsIENOPXdzYWFob21vIiBhdXRobWV0aG9kPSJjbXMiIHJlZ21ldGhvZD0iMjIiPgogICAgICAgICAgICA8cmVsYXRpb25zPgogICAgICAgICAgICAgICAgPHJlbGF0aW9uIGtleT0iMjA0MTU4OTIzMTUiIHJlbHR5cGU9IjQiLz4KICAgICAgICAgICAgPC9yZWxhdGlvbnM+CiAgICAgICAgPC9sb2dpbj4KICAgIDwvb3BlcmF0aW9uPgo8L3Nzbz4K&lt;/token&gt;\n' +
        '        &lt;sign&gt;nHkbCbrrv4apavv8689BkjHW8AUgRsiY0areJjmJcUoxY6EN39r35C4gUIzQVL33iE4X/MkUDE+2vSBOQE/8OUdkNYb/V0UrqtL40dvLGV2Els24sKD6mFm/vtG0KjiXOQVfCMX+A7AYnatS5os0nNf3rFoZwoAC8mvqB/yOOrQ=&lt;/sign&gt;\n' +
        '    &lt;/credentials&gt;\n' +
        '&lt;/loginTicketResponse&gt;\n' +
        '</loginCmsReturn></loginCmsResponse></soapenv:Body></soapenv:Envelope>',
            undefined,
        '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:impl="https://wsaahomo.afip.gov.ar/ws/services/LoginCms" xmlns:intf="https://wsaahomo.afip.gov.ar/ws/services/LoginCms" xmlns:tns1="http://wsaa.view.sua.dvadac.desein.afip.gov"><soap:Body><tns1:loginCms xmlns:tns1="http://wsaa.view.sua.dvadac.desein.afip.gov" xmlns="http://wsaa.view.sua.dvadac.desein.afip.gov"><tns1:in0>MIIG7QYJKoZIhvcNAQcCoIIG3jCCBtoCAQExDTALBglghkgBZQMEAgEwggEcBgkq\n' +
        'hkiG9w0BBwGgggENBIIBCTxsb2dpblRpY2tldFJlcXVlc3Q+DQogICAgPGhlYWRl\n' +
        'cj4NCiAgICAgICAgPHVuaXF1ZUlkPjE5MDkyNjwvdW5pcXVlSWQ+DQogICAgICAg\n' +
        'IDxnZW5lcmF0aW9uVGltZT4yMDIyLTEwLTExVDEwOjA5OjIwPC9nZW5lcmF0aW9u\n' +
        'VGltZT4NCiAgICAgICAgPGV4cGlyYXRpb25UaW1lPjIwMjItMTAtMTFUMjI6Mjk6\n' +
        'MjA8L2V4cGlyYXRpb25UaW1lPg0KICAgIDwvaGVhZGVyPg0KICAgIDxzZXJ2aWNl\n' +
        'PndzZmV4PC9zZXJ2aWNlPg0KPC9sb2dpblRpY2tldFJlcXVlc3Q+DQqgggNMMIID\n' +
        'SDCCAjCgAwIBAgIIac8n85ID2tswDQYJKoZIhvcNAQENBQAwODEaMBgGA1UEAwwR\n' +
        'Q29tcHV0YWRvcmVzIFRlc3QxDTALBgNVBAoMBEFGSVAxCzAJBgNVBAYTAkFSMB4X\n' +
        'DTIyMTAxMTE3NTEyN1oXDTI0MTAxMDE3NTEyN1owLjERMA8GA1UEAwwId3NhYWhv\n' +
        'bW8xGTAXBgNVBAUTEENVSVQgMjA0MTU4OTIzMTUwggEiMA0GCSqGSIb3DQEBAQUA\n' +
        'A4IBDwAwggEKAoIBAQCyCZmU7Dewyk8VX5wWAxCtUod20vqFYPjHLGaK8k0N+gYq\n' +
        'oz3aG/LVvUwYTDXoHdK3pYlDvxcOfl9ckhLdU2nqjqGpHKOI/yUfTiSHniYkFSjd\n' +
        'UrdxzCtV/wwRgX56tI8FzAuV7lD5x8v/3n38cNIqvqtw47bJD4sLzGuzW231JUhU\n' +
        'YsL3fVB4bG8AUhv3CcyQAcnj5aNuAeG0cjkEF8uTpub0YuTFYj665UZQT2qMu9Mv\n' +
        'vIYqphY1Wi/PKecMCwq+ZThYALEmiUJk02CPSSfawFLO+lcLprVnSymFT6o3NxKy\n' +
        'e7eMcC46Wk0pN4H7g300SrE3j4LrZZwQUT5SyR1JAgMBAAGjYDBeMAwGA1UdEwEB\n' +
        '/wQCMAAwHwYDVR0jBBgwFoAUs7LT//3put7eja8RIZzWIH3yT28wHQYDVR0OBBYE\n' +
        'FBqBge1HSRJfR7fSyVQ+eoevDC2AMA4GA1UdDwEB/wQEAwIF4DANBgkqhkiG9w0B\n' +
        'AQ0FAAOCAQEAekqwOgGUGpxsiiBR1IxuY1Qn9m2s2KHsSexSrWOWyxs02u/65g4E\n' +
        'F7lPmenKgIVe0LskLfqOJvZ8/BOeiIjfq/bIliFUIju8uxNTg22y8g2ad+VRW+ep\n' +
        '7z6iSYuY8skY+d22cCeOHHLGV+kmJOcV0C/BLXdRm+S2xFhHPcTxati4QJn4+Wcs\n' +
        '0e839f672Qu9zwfZCFxJykjEFMkv8N1jhOjWeb41hpFdzaslAAhfyX0hfbFyp8zC\n' +
        'BQzZPzNMy2DPP/mM6chMghYlbXyCt4RLQWKrBK29P+IGCJ9jzsjZNGuLpf9OpFTg\n' +
        'NysOHZ8ECznGouMn59dtJ8nqFOZh3N3lIDGCAlQwggJQAgEBMEQwODEaMBgGA1UE\n' +
        'AwwRQ29tcHV0YWRvcmVzIFRlc3QxDTALBgNVBAoMBEFGSVAxCzAJBgNVBAYTAkFS\n' +
        'AghpzyfzkgPa2zALBglghkgBZQMEAgGggeQwGAYJKoZIhvcNAQkDMQsGCSqGSIb3\n' +
        'DQEHATAcBgkqhkiG9w0BCQUxDxcNMjIxMDExMTgxNTQxWjAvBgkqhkiG9w0BCQQx\n' +
        'IgQgWHsu0DtESN53pKPKHRTcaNTyB/vAGOV0FKv28iq+3ykweQYJKoZIhvcNAQkP\n' +
        'MWwwajALBglghkgBZQMEASowCwYJYIZIAWUDBAEWMAsGCWCGSAFlAwQBAjAKBggq\n' +
        'hkiG9w0DBzAOBggqhkiG9w0DAgICAIAwDQYIKoZIhvcNAwICAUAwBwYFKw4DAgcw\n' +
        'DQYIKoZIhvcNAwICASgwDQYJKoZIhvcNAQEBBQAEggEAJVzLNY1xSSTP10FlBLVN\n' +
        'bXLKQcoKMGCjD4Y44n0rT7TZQ0EiTrYLQ48U711JLUAMtkO9tUwxuSvuthRSfs1d\n' +
        '/SDhn5hanIayJ8bdEcXs0B/PnhjgdbiB0Ea2O+TwBSkvqVIIJPg7pip1x5pL6SKG\n' +
        '4DHTJFgzTF/2k/ZS775EA15KSkz7RALPwfCEpPMf+VnF31AJa33bAhrQb054NDIB\n' +
        'BXCr1PO43GYI9DSsB5+8QJmq0ZSU1g+tfZnJCuqMEekg/5dqmWkmW/XIFgujg9cb\n' +
        '1vzuMBGMsUoUTdLykLc+Lz5xiaEVNdPWwbPAM/zGiLV7YrBzEWMTmo+rM+o6gW2O\n' +
        'tw==</tns1:in0></tns1:loginCms></soap:Body></soap:Envelope>'
    ]
    }
}
