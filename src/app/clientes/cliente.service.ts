import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import { Cliente } from './cliente';
import { Observable,of,map } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:9090/api/clientes';
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
}
