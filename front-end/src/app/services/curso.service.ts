import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { delay, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso-model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }

  private readonly API = environment.API;

  getCursos() {
    return this.http.get<Curso[]>(`${this.API}/cursos`)
      .pipe(
        delay(2000) //para testar loading
        // tap(console.log)
      );
  }

  salvar(curso: Curso) {
    return this.http.post(`${this.API}/cursos`, curso)
      .pipe(take(1));
  }

  atualizar(curso: Curso) {
    return this.http.put(`${this.API}/cursos/${curso.id}`, curso)
      .pipe(take(1));
  }

  remover(id: number) {
    return this.http.delete(`${this.API}/cursos/${id}`)
      .pipe(take(1));
  }

}
