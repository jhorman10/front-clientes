import { Component } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css'],
})
export class DirectivesComponent {
  listaCurso: String[] = ['TypeScript', 'JavaScript', 'Java', 'C#', 'Python'];

  habilitar: boolean = true;

  btnString: String = 'Ocultar'

  constructor() {}

  setHabilitar(): void {
    this.habilitar = !this.habilitar
    this.habilitar ? this.btnString = 'Ocultar' : this.btnString = 'Mostrar';
  }
}
