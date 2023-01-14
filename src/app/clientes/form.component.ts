import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo: string = "Crear Cliente"

  constructor(private ClienteService: ClienteService,
              private router: Router){ }

  ngOnInit(): void {
    
  }

  public create():void{
    //console.log("Clicked")
    //console.log(this.cliente)
    this.ClienteService.create(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    )
  }
}
