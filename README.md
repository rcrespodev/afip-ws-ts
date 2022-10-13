# Afip-ws-ts
Consume Afip Ws using an abstraction layer Rest Http as middleware.

# Table of contents:
- [Architecture Afip WS](#arquitectura_ws_afip)
- [Features](#features)
- [Usage](#usage)
  - [Manual Steps](#manual_steps)
    - [Install]
    - [Test]
    - [Run]
    - [Consume]


## Architecture Afip WS. <a name="arquitectura_ws_afip"></a>

El intercambio de información entre AFIP y los Entes Externos (EE) se implementa a través de Web Services SOAP.
Existen dos tipos de Web Services:
- **WSAA**: Web Service de Autenticación y Autorización.
- **WSN**: Web Services de negocio(_wsseg - R.G. N° 2.668, wsfexv1 - R.G. N° 2.758, wsct - R.G. N° 3.971",
wsfev1 - R.G. N° 4.291, wsmtxca - R.G. N° 2.904 Y wsbfev1- R.G. N° 2.557_).

Los WSN son públicos y accesible directamente a través de Internet.
Todos contienen una cabecera **Auth** donde se deben enviar los tres datos clave que componen el objeto de autorización:
```javascript
// cabecera auth
{
    cuit: '30415892315'
    token: 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI...'
    sign: 'CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOS...'
}
```
Para conseguir el token y el sign, los clientes deben comunicarse con el WSAA, quien response con el objeto Auth.
Cada combinación de token, sign y cuit es válida para un WSN en particular y tiene una validez limitada de 24hs.

La autenticación del cliente se realiza utilizando criptografía de clave pública basada en certificados digitales X.509.
Esto significa que para conseguir el objeto Auth, se debe solicitar a Afip el certificado digital correspondiente bajo
la CUIT que desea consumir el WSN como una EE.

## Features. <a name="features"></a>

El servicio _Afip-ws-ts_ tiene las siguiente responsabilidades:
- Proprcionar al cliente una capa de abstracción sobre los WSN. Permitiendo comunicarse con ellos mediante
protocolo Http, en vez de SOAP.
- Actuar como middleaware entre el Cliente Http y el WSAA. Si el cliente proporciona un certificado digital válido para
una cuit determinada, la aplicación gestiona la capa de autenticación, recuperando o generando nuevos objetos Auth, 
según sea necesario, para ejecutar las llamadas a los WSN objetivo.

## Usage. <a name="usage"></a>

### Manual Steps. <a name="manual_steps"></a>

Para obtener el certificado digital el primer paso es generar una clave privada junto con un certificado CSR.
```shell
# private key:
openssl genrsa -out private/private_key.key 2048 
# or:
make private_key

# Csr:
openssl req -new -key private/private_key.key -subj "/C=ar/O=afipwsts/CN=wsaahomo/serialNumber=CUIT $CUIT" -out private/afip.csr
# or:
CUIT=$CUIT make csr
```

En el siguiente [instructivo](https://www.afip.gob.ar/ws/WSASS/WSASS_como_adherirse.pdf) se detalla
como adherirse al servicio de testing.
El certificado obtenido debe ser guardado en private/$CUIT/cert.pem .

Creación de request de acceso a partir de certificado .pem
```shell
openssl cms -sign -in private/MiLoginTicketRequest.xml -out private/MiLoginTicketRequest.xml.cms -signer private/20415892315/cert.pem -inkey private/private_key.key -nodetach -outform PEM
```
