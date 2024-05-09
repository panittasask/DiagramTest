import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayCheck'
})
export class DisplayCheckPipe implements PipeTransform {

  transform(value: any, list: any): any {
    let CheckValue = list[value.toUpperCase()];
    if(CheckValue  == true){
      return true;
    }else{
      return false;
    }

  }

}
