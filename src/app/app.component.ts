import { Component, OnInit } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { PoCheckboxGroupOption, PoUploadFileRestrictions, PoUploadLiterals } from '@po-ui/ng-components';
import { FileUploadService } from './FileUploadService';
import { NgxCSVParserError, NgxCsvParser, NgxCsvParserModule } from 'ngx-csv-parser';


export class Dados {
  codigo!: string;
  nome!: string;
  obs!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: any = null; // Variable to store file
    header: boolean = false;
    csvRecords: any;
    menus:any;
    dados: any[] = [];

  
    // Inject service 
    constructor(
      private fileUploadService: FileUploadService,
      private ngxCsvParser: NgxCsvParser
      ) { }
  
    ngOnInit(): void {
    }
  
    // On file Select
    onChange(event:any) { 
      this.header = (this.header as unknown as string) === 'true' || this.header === true;
      
      const files = event.srcElement.files;

      this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): void => {
          this.csvRecords = result;          
          console.log(this.csvRecords);
          for (let i = 0; i < this.csvRecords.length; i++) {
            let linha: Dados = this.csvRecords[i];
            //console.log(linha);
            //console.log(this.csvRecords[i]);
            this.dados.push(linha);
          }
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });      
        /*
        this.file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          //console.log(fileReader.result);
          //let lista: Dados[] = fileReader.result;
          //console.log(lista);
        }
        fileReader.readAsText(this.file);
        */
    }
  
    // OnClick of button Upload
    onUpload() {
        /*
        this.loading = !this.loading;
        console.log(this.file);
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
  
                    // Short link via api response
                    this.shortLink = event.link;
  
                    this.loading = false; // Flag variable 
                }
            }
        );
        */
    }

}
