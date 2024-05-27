import { ChangeDetectorRef, Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { AppComponent } from '../../app.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { WebserviceService } from '../../services/webservice.service';
import { valueToCoefficient } from '@syncfusion/ej2-angular-charts';


@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrl: './topmenu.component.css'
})
export class TopmenuComponent {
  levelSearch:any=this.app.levelSearch;
  @Input() listLevel:any=2;
  listPath:any=this.app.listLevel;
  CurrentPath:any;
  MatrixSearch:[]=[];
  public SearchMatrixPermission:any;
  DiagramLevel:[];
  @Output() Expand = new EventEmitter();
  @Output() Collapse = new EventEmitter();
  @Output() Export = new EventEmitter();
  @Output() SelectLevel = new EventEmitter<any>();
  @Input() currentLevel=this.listLevel;
  matrixvalue:string='All';
  @Output() ChangeMatrix = new EventEmitter<string>();
  constructor(private cdr:ChangeDetectorRef,public route:ActivatedRoute,private router:Router,private app:AppComponent,private localstorage:LocalStorageService,private WebService:WebserviceService
,private localStorage:LocalStorageService
 ){
    this.CurrentPath = route.snapshot.routeConfig?.path;

  }
  public selectLayout(layout:any){
    let param = this.localstorage.getItem('queryParam')
    switch (layout.value){
      case 1:{
        this.router.navigate(['/PositionChartMinimal'],{
          queryParams:{q:param},
        });
        break;
      }
      case 2:{
        this.router.navigate(['/OrganizationUnitChart'],{
          queryParams:{q:param},

        });
        break;
      }
      case 3:{
        this.router.navigate(['/PositionChart'],{
          queryParams:{q:param,m:false,s:false},
        });
        break;
      }
      case 3.1:{
        this.router.navigate(['/PositionChartAllMatrix'],{
          queryParams:{q:param,m:true,s:false},
        });
        break;
      }
      case 3.2:{
        this.router.navigate(['/PositionChartMatrixOnly'],{
          queryParams:{q:param,m:true,s:true},
        });
        break;
      }
      case 4:{
        this.router.navigate(['/OrganizationUnitAndPositionChart'],{
          queryParams:{q:param}
        });
        break;
      }
      case 4.1:{
        this.router.navigate(['/OrganizationUnitAndPositionChartAllMatrix'],{
          queryParams:{q:param,m:true,s:false}
        });
        break;
      }
      case 4.2:{
        this.router.navigate(['/OrganizationUnitAndPositionChartMatrixOnly'],{
          queryParams:{q:param,m:true,s:true}
        });
        break;
      }
    }
  }
  change(){
    this.SearchMatrixPermission = !this.SearchMatrixPermission;
  }
  setMatrixSearch(set:any){
    this.SearchMatrixPermission = set;
  }
  selectMatrix(value:string){
    this.ChangeMatrix.emit(value);
  }
  selectLevel(level:any){
    this.SelectLevel.emit(level);
  }
  cleartoken(){
    let token = window.sessionStorage.getItem('token')
    window.sessionStorage.removeItem('token');
    console.log("TokenBefore",token)
    // window.sessionStorage.clear();

  }
  ExpandAll(){
    this.Expand.emit();
  }
  CollapsAll(){
    this.Collapse.emit();
  }
  ExportOptions(){
   this.Export.emit();
  }
  setRouting(){

    let model = this.WebService.model;
    if(model['positionid'] != null && this.router.url != '/'){
      this.levelSearch =   [
        {
         value:1,text:"Position Chart Minimal"
        },
        {
         value:3,text:"Position Chart Color"
        },
        {
          value:2,text:"Organization Unit Chart"
        },
        {
          value:4,text:"Organization Unit and Position Chart"
         }
       ];
    }
    else if(model['positionid'] == null && this.router.url != '/')
    {
      this.levelSearch =   [
        {
         value:2,text:"Organization Unit Chart"
        }
       ];
    }
    else{
      // this.router.navigate(['/Unauthorize']);
    }

    // this.topmenuComp.setRouingItem(this.levelSearch);
    this.WebService.menu = this.levelSearch;
  }
}
