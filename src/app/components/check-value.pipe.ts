import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkValue'
})
export class CheckValuePipe implements PipeTransform {
  transform(value2: any,value3:any) {
    let check = value3.nodes.find((x:any)=>x.id == value2);
    if(check != null){
      return check.isExpanded;
    }
    else{
      return false;
    }
  }

}
