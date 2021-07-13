import { CursoService } from './../../services/curso.service';

import { Component, OnInit } from '@angular/core';
import { Curso } from './curso-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];
  cursos$: Observable<Curso[]>;

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    // this.cursoService.getCursos().subscribe(dados => this.cursos = dados);
    this.cursos$ = this.cursoService.getCursos();
  }


}
