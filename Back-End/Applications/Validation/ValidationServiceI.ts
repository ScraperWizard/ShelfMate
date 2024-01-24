import { ValidationService } from "./Validation.js";
import Ajv from "ajv";

class AjvValidationService implements ValidationService {
    // TODO correct type of ajvinstance
    ajvInstance: any;

    initialize() {
        this.ajvInstance = new Ajv.default();
        return this.ajvInstance;
    };

    compile(validationSchema: object): void {
        this.ajvInstance.compile(validationSchema)
    };

    validate(validationSchema: object, data: object): Boolean {
        return this.ajvInstance.validate(validationSchema, data);
    }
}


export default AjvValidationService;