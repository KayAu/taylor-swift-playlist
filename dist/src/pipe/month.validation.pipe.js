"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let MonthValidationPipe = class MonthValidationPipe {
    constructor() {
        this.months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
    }
    transform(value) {
        if (value) {
            const month = this.months.find(m => m.toLowerCase().includes(value.toLowerCase()));
            if (!month) {
                throw new common_1.BadRequestException(`"${value}" is not a valid month.`);
            }
            return month;
        }
        return value;
    }
};
exports.MonthValidationPipe = MonthValidationPipe;
exports.MonthValidationPipe = MonthValidationPipe = __decorate([
    (0, common_1.Injectable)()
], MonthValidationPipe);
//# sourceMappingURL=month.validation.pipe.js.map