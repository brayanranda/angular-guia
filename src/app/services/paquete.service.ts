import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from 'global'

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  uri=`${global.url}/paquete/`;
  act:string='/actividades/'

  constructor(private http: HttpClient) { }

  public listar():Observable<any>{
    return this.http.get<any>(this.uri);
  }

  // public listarPaqEstadia():Observable<any>{
  //   return this.http.get<any>(this.uri+'estadia');
  // }

  // public listarPaqPasadia():Observable<any>{
  //   return this.http.get<any>(this.uri+'pasadia');
  // }

  public encontrar(id:number):Observable<any>{
    return this.http.get<any>(`${this.uri}${id}`);
  }

  public encontrarAct(id:number):Observable<any>{
    return this.http.get<any>(`${this.uri}${id}${this.act}`);
  }
  

}
