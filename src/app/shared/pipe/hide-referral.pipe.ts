import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideReferralPipe'
})
export class HideReferralPipe implements PipeTransform {
  transform(value: string, ): string {
    let chars = 3;
    return value
     ? value.replace(/[a-z0-9\-_.]+@/ig, (c) => c.substr(0, chars) + c.split('').slice(chars, -1).map(v => '*').join('') + '@')
     : value;
  }
}
