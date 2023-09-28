import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoFieldModule, PoModule, PoUploadComponent } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FormsModule } from '@angular/forms';

import { ConciliadorModule } from './conciliador/conciliador-module';
import { ConciliadorRoutingModule } from './conciliador/conciliador-routing.module';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    PoModule,
    PoTemplatesModule,
    PoFieldModule,
    NgxCsvParserModule,
    ConciliadorModule,
    ConciliadorRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
