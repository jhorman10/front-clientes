import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente.interface';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private URL_ENDPOINT = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get<Cliente[]>(this.URL_ENDPOINT).pipe(
      map(res => res as Cliente[])
    );
  }
}
