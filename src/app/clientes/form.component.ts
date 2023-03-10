import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo: string = "Crear Cliente"
  errores:string[] = [];
  constructor(private clienteService: ClienteService,
              private router: Router,
              private activateRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarCliente()
  }

  public cargarCliente():void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
        }
    })
  }

  public create():void{
    //console.log("Clicked")
    //console.log(this.cliente)
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente',`Cliente ${this.cliente.nombre} creado con éxito`,'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error desde el backend: ' +err.status);
        console.error(err.error.errors);
      }
    );
  }

  public update():void{
    this.clienteService.updateCliente(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Actualizado',`Cliente ${this.cliente.nombre} actualizado con éxito!`,'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo de error desde el backend: ' +err.status);
      console.error(err.error.errors);
    }
    )
  }
}
