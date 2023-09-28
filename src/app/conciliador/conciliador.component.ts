import { Component, OnInit } from '@angular/core';
import { ConciliadorService } from './conciliador.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { PoButtonGroupItem, PoCheckboxGroupOption, PoDropdownAction, PoNotificationService, PoSelectOption, PoSelectOptionGroup } from '@po-ui/ng-components';

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
    
    file: any; // Variable to store file
    header: boolean = false;
    csvRecords: any;
    menus:any;
    dados: any = undefined;
    lojas: any = undefined;
    inicio: number = 13;
    tipo: string = "v"; //v=venda r=recebimento

    isHideLoading = true;
    
    readonly propertiesOptions: Array<PoCheckboxGroupOption> = [
      { value: 'v', label: 'VENDAS' },
      { value: 'r', label: 'RECEBIMENTOS' }
    ];
   
    buttons: Array<PoButtonGroupItem> = [
      { label: 'Testa comunicação com API', action: this.onTeste.bind(this) },
      { label: 'Testa banco de dados', action: this.onTestaBanco.bind(this) },
      { label: 'Conciliar arquivo', action: this.onUpload.bind(this)}
    ];
  
    // Inject service 
    constructor(
      private fileUploadService: ConciliadorService,
      private ngxCsvParser: NgxCsvParser,
      public poNotification: PoNotificationService
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
      if (this.csvRecords == undefined) {
        this.poNotification.warning("Selecione o arquivo");        
      } else {        
        this.isHideLoading = false;
          console.log(this.file);
          this.fileUploadService.upload(this.file, this.inicio, this.tipo).subscribe({
            next: () => {
              this.isHideLoading = true;
              this.poNotification.success("Arquivo enviado com sucesso");            
            },
            error: (err) => {
              this.isHideLoading = true;
              this.poNotification.error(err);
              console.log(err);
            }
          });        
      }
    }

    onTeste() {
      this.isHideLoading = false;
      this.fileUploadService.testa().subscribe({
        next: () => {
          this.isHideLoading = true;
          this.poNotification.success("OK");          
        }, 
        error: (err) => {
          this.isHideLoading = true;
          this.poNotification.error(err);
          console.log(err);
        }
      })
    }

    onTestaBanco() {
      this.isHideLoading = false;
      this.fileUploadService.testaBanco().subscribe({
        next: (response) => {
          this.isHideLoading = true;
          this.lojas = response;
          this.poNotification.success("OK");
        }, 
        error: (err) => {
          this.isHideLoading = true;
          this.poNotification.error(err);
          console.log(err);
        }
      })
    }


}
