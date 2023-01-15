import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente } from './cliente';
import { Observable,of,map } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:9090/api/clientes';
  //private urlEndPointCreated: string = 'http://localhost:9090/api/clientes/create';
  private httpsHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
   //return estatico
    // return of(CLIENTES);
   //una forma es hacer un cast de cliente a la urlEndPoint
   //return this.http.get<Cliente[]>(this.urlEndPoint);
    //otra forma es con MAP
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[])
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.urlEndPoint}/create`, cliente, {headers: this.httpsHeaders})
  }

  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }
  
  updateCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente, {headers: this.httpsHeaders})
  }

  deleteCliente(id: any): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpsHeaders})
  }
}
