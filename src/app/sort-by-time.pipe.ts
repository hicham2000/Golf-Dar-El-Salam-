import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByTime'
})
export class SortByTimePipe implements PipeTransform {
  transform(array: any[]): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    return array.sort((a, b) => {
      // Split and parse the reservation times
      const timeA = a.date.split(':').map(Number);
      const timeB = b.date.split(':').map(Number);

      // Compare the times
      if (timeA[0] !== timeB[0]) {
        return timeA[0] - timeB[0];
      } else {
        return timeA[1] - timeB[1];
      }
    });
  }
}
