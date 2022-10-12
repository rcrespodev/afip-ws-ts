.PHONY: private_key
private_key:
	openssl genrsa -out private/private_key.key 2048

.PHONY: csr
csr:
	openssl req -new -key private/private_key.key -subj "/C=ar/O=afipwsts/CN=wsaahomo/serialNumber=CUIT $(CUIT)" -out private/$(CUIT)/afip.csr

run:
	docker-compose -f docker-compose.yaml up -d --build
