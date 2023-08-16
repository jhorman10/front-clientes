import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
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
    this.clienteService.create(this.cliente).subscribe((response) => {
      swal('Nuevo cliente', `${response.nombre} creado con exito!`, 'success');
      this.router.navigate(['/clients']);
    });
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe((cliente) => {
      swal(
        'Cliente Actualizado',
        `Cliente ${cliente.nombre} Actualizado con exito!`,
        'success'
      );
      this.router.navigate(['/clients']);
    });
  }
}
