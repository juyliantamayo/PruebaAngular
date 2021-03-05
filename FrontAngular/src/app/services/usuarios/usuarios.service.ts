import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  updateUsuarios(Usuario: any, id: number) {
    return this.http.post('/api/usuarioUpdate', Usuario, { params: { 'id': id.toString() } });
  }

  constructor(private http: HttpClient) { }
  getUsuarios(): Observable<any> {
    return this.http.get('/api/usuarios');
  }
  postUsuarios(Usuario: any): Observable<any> {
    return this.http.post('/api/usuario', Usuario);
  }
}
