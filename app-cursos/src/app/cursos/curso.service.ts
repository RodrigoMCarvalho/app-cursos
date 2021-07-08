import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Curso } from './cursos-lista/curso-model';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }

  private readonly API = 'http://localhost:3000/cursos';

  getCursos() {
    return this.http.get<Curso[]>(this.API);
  }
}
