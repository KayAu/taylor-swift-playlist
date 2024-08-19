"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortByValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let SortByValidationPipe = class SortByValidationPipe {
    constructor() {
        this.validSortFields = ['Song', 'Artist', 'Album', 'Year', 'TotalPlays', 'PlaysJune', 'PlaysJuly', 'PlaysAugust'];
    }
    transform(value) {
        if (!this.validSortFields.includes(value)) {
            throw new common_1.BadRequestException(`Invalid sortBy field: ${value}. Valid fields are: ${this.validSortFields.join(', ')}`);
        }
        return value;
    }
};
exports.SortByValidationPipe = SortByValidationPipe;
exports.SortByValidationPipe = SortByValidationPipe = __decorate([
    (0, common_1.Injectable)()
], SortByValidationPipe);
//# sourceMappingURL=sortBy.validation.pipe.js.map