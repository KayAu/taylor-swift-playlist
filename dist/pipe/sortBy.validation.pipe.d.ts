import { PipeTransform } from '@nestjs/common';
export declare class SortByValidationPipe implements PipeTransform {
    private readonly validSortFields;
    transform(value: string): string;
}
