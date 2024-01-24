import ValidationServiceI from "./ValidationServiceI.js";

interface ValidationService {
    initialize: Function;
    compile: Function;
    validate: Function;
}

function createValidationService(): ValidationService | null {
    return new ValidationServiceI().initialize();
}

export {
    ValidationService,
    createValidationService
}

