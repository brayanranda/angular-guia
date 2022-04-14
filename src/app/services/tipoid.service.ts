import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoidService {
  uri = `${global.url}/tipoIdentificacion`;
  
  constructor(public http:HttpClient) { }

  public getTipoId():Observable<any>{
    return this.http.get(this.uri);

  }
  public listarTipo():Observable<any>{
    return this.http.get<any>(this.uri)
  }

  public post(tipo:any):Observable<any>{
    return this.http.post<any>(this.uri, tipo)
  }
}
