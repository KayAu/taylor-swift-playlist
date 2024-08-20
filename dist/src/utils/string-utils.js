"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uppercaseFirstChar = uppercaseFirstChar;
function uppercaseFirstChar(input) {
    if (!input)
        return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
}
//# sourceMappingURL=string-utils.js.map