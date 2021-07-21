import { Injectable } from '@angular/core';
import { Aluno } from '../models/aluno-model';
import { CrudService } from './../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends CrudService<Aluno> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}alunos`);
  }

}
