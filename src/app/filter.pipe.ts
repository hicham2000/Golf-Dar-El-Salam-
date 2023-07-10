import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value:any, filterString:string, propName:string): any {
    filterString = filterString.toUpperCase();

    if(value.length === 0){
      return value;
    }
    const resulArray = [];
    for (const item of value){
      if (item[propName].includes(filterString)){
        resulArray.push(item)
      }
    }
    return resulArray;
  }

}
