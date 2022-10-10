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

Los WSN son públicos y accesible directamente a través de Internet. La autencticación para los WSN está regulada por
el WSSA, que autentica a las aplicaciones clientes y les concede permiso de acceso a cada WSN mediante el otorgamiento
de un Token de Acceso (TA).

Cada TA es válido para un WSN en particular y tiene una validez limitada en el tiempo (actualmente, 12 horas).
La aplicación cliente es la responsable de presentar al WSN el TA otorgado por el WSAA, de lo contrario el WSN
rechaza la solicitud de acceso.

La autenticación del cliente se realiza utilizando criptografía de clave pública basada en certificados digitales X.509.
Esto significa que para conseguir un TA, se debe solicitar a Afip el certificado digital correspondiente bajo la CUIT
que desea consumir el WSN como una EE.

## Features. <a name="features"></a>

La presente API tiene como objetivo:
- Proprcionar al cliente una capa de abstracción sobre los WSN.
- Actuar como middleaware entre el Cliente Http y el WSAA. Si el cliente proporciona un certificado digital válido para
una cuit determinada, la aplicación gestiona la capa de autenticación, recuperando o generando nuevos TA según sea
necesario para ejecutar las llamadas a los WSN objetivo.

## Usage. <a name="usage"></a>

### Manual Steps. <a name="manual_steps"></a>

Para obtener el certificado digital el primer paso es generar una clave privada junto con un certificado CSR.
```shell
# private key:
openssl genrsa -out private/private_key.key 2048 

# Csr:
openssl req -new -key private/private_key.key -subj "/C=ar/O=afip/CN=wsaahomo/serialNumber=CUIT $CUIT" -out private/afip.csr
```

En el siguiente [instructivo](https://www.afip.gob.ar/ws/WSASS/WSASS_como_adherirse.pdf) se detalla
como adherirse al servicio de testing.
El certificado obtenido debe ser guardado en private/$CUIT/cert.pem .
