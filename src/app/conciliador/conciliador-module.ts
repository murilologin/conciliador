import { NgModule } from "@angular/core";
import { ConciliadorComponent } from "./conciliador.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ConciliadorService } from "./conciliador.service";


@NgModule({
    declarations: [
      ConciliadorComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      ReactiveFormsModule
    ],
    providers: [
      ConciliadorService
    ]
    
  })
  export class ConciliadorModule { }
  