import { Pipe,PipeTransform } from "@angular/core";
@Pipe({
  name:'CheckVisible'
})
export class PipeComponent implements PipeTransform{
  transform(value2: any,value3:any) {
    let check = value3.filter((x:any)=>x.name.toUpperCase() == value2.toUpperCase())
    if(check.length > 0)
      return check[0].visible;
    else
      return false;
  }
}
