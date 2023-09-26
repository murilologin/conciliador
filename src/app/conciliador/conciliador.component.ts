import { Component, OnInit } from '@angular/core';
import { ConciliadorService } from './conciliador.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

export class Dados {
  codigo: string = '';
  nome: string = '';
  obs: string = '';
}


@Component({
  selector: 'app-conciliador',
  templateUrl: './conciliador.component.html',
  styleUrls: ['./conciliador.component.css']
})
export class ConciliadorComponent implements OnInit {

    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: any = null; // Variable to store file
    header: boolean = false;
    csvRecords: any;
    menus:any;
    dados: any = undefined;
    lojas: any = undefined;
    inicio: number = 13;
    tipo: string = "v"; //v=venda p=pagamento

  
    // Inject service 
    constructor(
      private fileUploadService: ConciliadorService,
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
          
          for (let i = 0; i < this.csvRecords.length; i++) {            
            for (let y = 0; y < this.csvRecords[i].length; y++) {
              console.log(this.csvRecords[i][y]);  
            }            
          }
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });      
      
        this.file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.dados = fileReader.result;
        }
        fileReader.readAsText(this.file);
    }
  
    // OnClick of button Upload
    onUpload() {
        this.loading = true;
        console.log(this.file);
        this.fileUploadService.upload(this.file, this.inicio, this.tipo).subscribe({
          next: () => {
            alert("OK");
            this.loading = false;
          },
          error: (err) => {
            alert("Falha");
            this.loading = false;
            console.log(err);
          }
        });        
    }

    onTeste() {
      this.loading = true;
      this.fileUploadService.testa().subscribe({
        next: () => {
          this.loading = false;
          alert("OK");
        }, 
        error: (err) => {
          this.loading = false;
          alert("Falha");
          console.log(err);
        }
      })
    }

    onTestaBanco() {
      this.loading = true;
      this.fileUploadService.testaBanco().subscribe({
        next: (response) => {
          this.loading = false;
          this.lojas = response;
          alert("OK");
        }, 
        error: (err) => {
          this.loading = false;
          alert("Falha");
          console.log(err);
        }
      })
    }


}
