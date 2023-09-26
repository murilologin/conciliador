import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { PoCheckboxGroupOption, PoUploadFileRestrictions, PoUploadLiterals } from '@po-ui/ng-components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: any = null; // Variable to store file
    header: boolean = false;
    csvRecords: any;
    menus:any;
  
   
}
