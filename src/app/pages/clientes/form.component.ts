import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente.interface';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public title: string = 'Crear Cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      id &&
        this.clienteService
          .getClienteById(id)
          .subscribe((cliente) => (this.cliente = cliente));
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      Swal.fire('Nuevo cliente', `${cliente.nombre} creado con exito!`, 'success');
      this.router.navigate(['/clients']);
    });
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe((cliente) => {
      Swal.fire(
        'Cliente Actualizado',
        `${cliente.nombre} fue Actualizado con exito!`,
        'success'
      );
      this.router.navigate(['/clients']);
    });
  }
}
