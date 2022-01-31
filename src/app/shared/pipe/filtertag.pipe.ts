import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../models/Company';

@Pipe({
  name: 'filterTag'
})
export class FiltertagPipe implements PipeTransform {

  transform(items: Tag[], filter: any[]): Tag[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out

    const tag: Tag[] = [];
    filter.forEach( f => {
      tag.push(items.filter( i => i.id == f)[0])
    })
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return tag;
  }

}
