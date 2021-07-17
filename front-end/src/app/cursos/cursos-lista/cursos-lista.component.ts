import { CursoService } from './../../services/curso.service';

import { Component, OnInit } from '@angular/core';
import { Curso } from './curso-model';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { TesteModalComponent } from './../../shared/teste-modal/teste-modal.component';

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

  modalRef: BsModalRef;
  frutas: any[];

  constructor(private cursoService: CursoService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.carregarCursos();
    this.frutas = ['laranja','maçã','pêra','melancia']
  }

  carregarCursos() {
    // this.cursoService.getCursos().subscribe(dados => this.cursos = dados);
    this.cursos$ = this.cursoService.getCursos()
      .pipe(
        catchError(error => {
          console.error(error);
          //this.error$.next(true);
          this.handleError();
          return empty();
        })
      );
  }

  handleError() {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.tipo = 'danger';
    this.modalRef.content.mensagem = 'Erro ao carregar os cursos. Tente novamente mais tarde.';
  }

  testeModal() {
    this.modalRef = this.modalService.show(TesteModalComponent);
    this.modalRef.content.frutas = this.frutas;
  }

  atualizarCurso(curso: Curso) {
    this.modalRef = this.modalService.show(TesteModalComponent);
    this.modalRef.content.curso = curso;
  }


}
