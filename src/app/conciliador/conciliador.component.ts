import { Component, OnInit, numberAttribute } from '@angular/core';
import { ConciliadorService } from './conciliador.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { PoButtonGroupItem, PoCheckboxGroupOption, PoDropdownAction, PoNotificationService, PoSelectOption, PoSelectOptionGroup } from '@po-ui/ng-components';


@Component({
  selector: 'app-conciliador',
  templateUrl: './conciliador.component.html',
  styleUrls: ['./conciliador.component.css']
})
export class ConciliadorComponent implements OnInit {
    
    file: any; // Variable to store file   
    header: any; 
    csvRecords: any;
    menus:any;
    dados: any = undefined;
    lojas: any = undefined;
    
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

    columnsGrid: any[] = [
      { property: 'dados', label: 'Dados'}
    ];
  
    dataGrid: any[] = [];
    //lista de dados
    //[{dados: 'kjkjlj'}, {dados: 'kfjslkfj'}] enviar assim para o backend

  
    // Inject service 
    constructor(
      private fileUploadService: ConciliadorService,
      private ngxCsvParser: NgxCsvParser,
      public poNotification: PoNotificationService
      ) { }
  
    ngOnInit(): void {
      
    }

    changeTipo(event:any) {
      this.dataGrid = [];
    }
  
    // On file Select
    onChange(event:any) { 
      this.dataGrid = [];
      let linha:string = '';
      let valendo: boolean = false;
      this.header = (this.header as unknown as string) === 'true' || this.header === true;
      
      const files = event.srcElement.files;

      this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): void => {
          this.csvRecords = result; 

          if (this.tipo == 'v') {
            for (let i = 0; i < this.csvRecords.length; i++) {                                  
              linha = '';
              for (let y = 0; y < 27; y++) {
                linha = linha + this.csvRecords[i][y] + ';';
              }            
              if (valendo) {
                this.dataGrid.push({dados: linha})
              }
              if (linha.substring(0, 20) == 'C�d. Estabelecimento' && valendo == false) {valendo = true;}            
            }
            if (valendo) {
              this.poNotification.success('Arquivo carregado com sucesso');
            } else {
              this.poNotification.warning('Arquivo fora do padrão');
            } 
          }
          if (this.tipo == 'r') {
            for (let i = 0; i < this.csvRecords.length; i++) {                                  
              linha = '';
              for (let y = 0; y < 18; y++) {
                linha = linha + this.csvRecords[i][y] + ';';
              }            
              if (valendo) {
                if (linha.includes('Saldo anterior')) {
                  //ignora
                } else if (linha.includes('o vencimento')) {
                  //ignora
                } else if (linha.includes('Valor Liquidado (R$)')) {
                  //ignora
                } else {
                  this.dataGrid.push({dados: linha});
                }
              }
              if (linha.substring(0, 20) == 'C�DIGO CENTRALIZADOR' && valendo == false) {valendo = true;}            
            }
            if (valendo) {
              this.poNotification.success('Arquivo carregado com sucesso');
            } else {
              this.poNotification.warning('Arquivo fora do padrão');
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
          if (this.tipo == 'v') {
            this.fileUploadService.uploadVendas(this.dataGrid).subscribe({
              next: () => {
                this.isHideLoading = true;
                this.poNotification.success("Arquivo conciliado com sucesso");            
              },
              error: (err) => {
                this.isHideLoading = true;
                this.poNotification.error(err);
                console.log(err);
              }
            });
          } else if (this.tipo == 'r') {
            this.fileUploadService.uploadRecebimentos(this.dataGrid).subscribe({
              next: () => {
                this.isHideLoading = true;
                this.poNotification.success("Arquivo conciliado com sucesso");            
              },
              error: (err) => {
                this.isHideLoading = true;
                this.poNotification.error(err);
                console.log(err);
              }
            });
          }
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
