import { PipeTransform } from '@nestjs/common';
export declare class MonthValidationPipe implements PipeTransform {
    private readonly months;
    transform(value: string): string;
}
