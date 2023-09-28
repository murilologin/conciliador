import { NgModule } from "@angular/core";
import { ConciliadorComponent } from "./conciliador.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ConciliadorService } from "./conciliador.service";
import { PoFieldModule, PoModule, PoSelectComponent } from '@po-ui/ng-components';
import { PoTemplatesModule } from "@po-ui/ng-templates";
import { AppComponent } from "../app.component";


@NgModule({
    declarations: [
      ConciliadorComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      ReactiveFormsModule,
      PoModule,
      PoTemplatesModule,
      PoFieldModule,
    ],
    providers: [
      ConciliadorService
    ]
    
   
    
  })
  export class ConciliadorModule { }
  