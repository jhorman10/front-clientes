export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  createdAt: string;
  email: string;
}
export class Cliente {
  id!: number;
  nombre!: string;
  apellido!: string;
  createdAt!: string;
  email!: string;
}
