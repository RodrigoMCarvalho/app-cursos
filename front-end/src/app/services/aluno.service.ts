import { Injectable } from '@angular/core';
import { Aluno } from '../models/aluno-model';
import { CrudService } from './../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends CrudService<Aluno> {

  private readonly API = environment.API;

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/alunos`);
  }

  getAlunos() {
    return this.http.get<Aluno[]>(`${this.API}/alunos`)
      .pipe(
        delay(1000) //para testar loading
        //tap(console.log)
      );
  }

}
