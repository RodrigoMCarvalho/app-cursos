import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Curso } from './cursos-lista/curso-model';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

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
