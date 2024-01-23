import AjvValidation from "./AjvValidation.js";

interface ValidationService {
    initialize: Function;
    compile: Function;
    validate: Function;
}

function createValidationService(): ValidationService | null {
    return new AjvValidation().initialize();
}

export {
    ValidationService,
    createValidationService
}

