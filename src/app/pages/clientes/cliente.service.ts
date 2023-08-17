import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Cliente } from './cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private URL_ENDPOINT = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.URL_ENDPOINT)
      .pipe(map((res) => res as Cliente[]));
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.URL_ENDPOINT}/${id}`).pipe(
      catchError((e) => {
        console.error(e.error.mensaje);
        this.router.navigate(['/clients']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.URL_ENDPOINT, cliente, {
        headers: this.httpHeader,
      })
      .pipe(
        map((res: any) => res.cliente as Cliente),
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire('Error al crear', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(`${this.URL_ENDPOINT}/${cliente.id}`, cliente, {
        headers: this.httpHeader,
      })
      .pipe(
        map((res: any) => res.cliente as Cliente),
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire('Error al actualizar', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.URL_ENDPOINT}/${id}`, {
        headers: this.httpHeader,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire('Error al borrar', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }
}
