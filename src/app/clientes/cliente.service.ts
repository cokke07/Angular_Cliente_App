import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import {CLIENTES} from './clientes.json';
import { Cliente } from './cliente';
import { Observable,of,map, catchError,throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:9090/api/clientes';
  //private urlEndPointCreated: string = 'http://localhost:9090/api/clientes/create';
  private httpsHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]>{
   //return estatico
    // return of(CLIENTES);
   //una forma es hacer un cast de cliente a la urlEndPoint
   //return this.http.get<Cliente[]>(this.urlEndPoint);
    //otra forma es con MAP
    return this.http.get(this.urlEndPoint).pipe(
      map( response => {
        
        let clientes = response as Cliente[];

        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre?.toUpperCase();
          cliente.apellido = cliente.apellido?.toUpperCase();
          cliente.email = cliente.email?.toUpperCase();
          let datePipe = new DatePipe('en-US')//otra forma
          //cliente.createAt = datePipe.transform(cliente.createAt,'dd-MM-yyyy');
          cliente.createAt = formatDate(cliente.createAt,'dd/MM/yyyy', 'en-US');
          return cliente;
        });
      })
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.urlEndPoint}/create`, cliente, {headers: this.httpsHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al Crear', e.error.mensaje, 'error');
        return throwError(e)
      })
    )
  }

  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al Editar', e.error.mensaje, 'error');
        return throwError(e)
      })
    )
  }
  
  updateCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente, {headers: this.httpsHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al Actualizar', e.error.mensaje, 'error');
        return throwError(e)
      })
    )
  }

  deleteCliente(id: any): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpsHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al Eliminar', e.error.mensaje, 'error');
        return throwError(e)
      })
    )
  }
}
