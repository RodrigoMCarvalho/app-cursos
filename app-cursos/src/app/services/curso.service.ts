import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Curso } from '../cursos/cursos-lista/curso-model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }

  private readonly API = environment.API;

  getCursos() {
    return  this.http.get<Curso[]>(`${this.API}/cursos`)
      .pipe(
        // tap(console.log)
      );
  }
}
