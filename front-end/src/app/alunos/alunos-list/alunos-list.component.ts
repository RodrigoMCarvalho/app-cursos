import { Component, OnInit } from '@angular/core';
import { AlunoService } from './../../services/aluno.service';
import { Aluno } from './../../models/aluno-model';
import { Observable, empty, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.scss'],
  preserveWhitespaces: true
})
export class AlunosListComponent implements OnInit {

  alunos: Aluno[];
  alunos$: Observable<Aluno[]>;
  refreshAlunos$ = new BehaviorSubject<boolean>(true);

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.getAlunos();
  }

  getAlunos() {
    this.alunos$ = this.refreshAlunos$.pipe(switchMap( response =>  this.alunoService.getAlunos()
    .pipe(
      catchError(error => {
        console.error(error);
        return empty();
      })
    )));
  }

}
