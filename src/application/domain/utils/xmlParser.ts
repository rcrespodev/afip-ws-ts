import {parseString} from "xml2js";

export class XmlParser {
    ParseFromString<T>(xml: string) {
        const options = {
            explicitArray: false,
        };
        return new Promise<T>((resolve, reject) => {
            parseString(xml, options, (err, parsed) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(parsed)
                }
            })
        })
    }
}
