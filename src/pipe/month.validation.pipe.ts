import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class MonthValidationPipe implements PipeTransform {
  private readonly months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  transform(value: string) {
    if (value) {
      // Check if any month contains the value
      const month = this.months.find(m => m.toLowerCase().includes(value.toLowerCase()));

      if (!month) {
        throw new BadRequestException(`"${value}" is not a valid month.`);
      }

      return month; // Return the matched month
    }
    return value;
  }
}
