import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SortByValidationPipe implements PipeTransform {
  private readonly validSortFields = ['Song', 'Artist', 'Album', 'Year', 'TotalPlays', 'PlaysJune', 'PlaysJuly', 'PlaysAugust'];

  transform(value: string) {
    if (!this.validSortFields.includes(value)) {
      throw new BadRequestException(`Invalid sortBy field: ${value}. Valid fields are: ${this.validSortFields.join(', ')}`);
    }
    return value;
  }
}
