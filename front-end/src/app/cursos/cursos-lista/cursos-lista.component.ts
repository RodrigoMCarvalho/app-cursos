import { CursoService } from './../../services/curso.service';

import { Component, OnInit } from '@angular/core';
import { Curso } from './curso-model';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.carregarCursos();
  }

  carregarCursos() {
    // this.cursoService.getCursos().subscribe(dados => this.cursos = dados);
    this.cursos$ = this.cursoService.getCursos()
      .pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();
        })
      );
  }


}
