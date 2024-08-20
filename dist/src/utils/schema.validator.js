"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFieldExists = checkFieldExists;
function checkFieldExists(schema, fieldName) {
    return schema.paths[fieldName] !== undefined;
}
//# sourceMappingURL=schema.validator.js.map