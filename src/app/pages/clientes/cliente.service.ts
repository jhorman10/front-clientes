import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cliente } from './cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private URL_ENDPOINT = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.URL_ENDPOINT)
      .pipe(map((res) => res as Cliente[]));
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.URL_ENDPOINT}/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.URL_ENDPOINT, cliente, {
      headers: this.httpHeader,
    });
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.URL_ENDPOINT}/${cliente.id}`,
      cliente,
      { headers: this.httpHeader }
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.URL_ENDPOINT}/${id}`, {
      headers: this.httpHeader,
    });
  }
}
