import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class ConciliadorService {
	

    baseApiUrl = "http://localhost:8082/api/concilia";
    private corsHeaders: HttpHeaders | undefined;
        
    constructor(private http:HttpClient) {
        this.corsHeaders = new HttpHeaders({
            //'Content-Type': 'multipart/form-data;application/json',
            //'Accept': '*/*',
            //'Access-Control-Allow-Origin': 'http://localhost:4200',
            //'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            //'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent'
        });
    }

    // Returns an observable
    upload(file: Blob, inicio: number, tipo: string):Observable<any> {

        // Create form data
        const formData = new FormData();
            
        // Store form name as "file" with file datas
        formData.append("arquivo", file, file.name);
        formData.append("inicio", inicio.toString());
        formData.append("colunas", "3");
        formData.append("tipo", tipo);
            
        // Make http post request over api
        // with formData as req
        console.log(this.baseApiUrl);
        console.log(formData);
        return this.http.put(this.baseApiUrl + "/arquivo", formData);
    }

    testa():Observable<any> {
        return this.http.get(this.baseApiUrl + "/teste");
    }

    testaBanco():Observable<any> {
        return this.http.get(this.baseApiUrl + "/banco");
    }    

    
}
