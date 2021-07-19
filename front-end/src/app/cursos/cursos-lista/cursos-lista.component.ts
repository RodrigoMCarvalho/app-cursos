import { CursoService } from './../../services/curso.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../../models/curso-model';
import { BehaviorSubject, empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { TesteModalComponent } from './../../shared/teste-modal/teste-modal.component';
import { CursosFormModalComponent } from './../cursos-form-modal/cursos-form-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal;

  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  refreshCurso$ = new BehaviorSubject<boolean>(true);
  onClose$ = new Subject<Curso>();

  modalRef: BsModalRef;
  frutas: any[];
  idCurso: number;


  constructor(private cursoService: CursoService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.carregarCursos();
    this.frutas = ['laranja','maçã','pêra','melancia']
  }

  carregarCursos() {
    // this.cursoService.getCursos().subscribe(dados => this.cursos = dados);
    this.cursos$ = this.refreshCurso$.pipe(switchMap( _ => this.cursoService.getCursos()
      .pipe(
        catchError(error => {
          console.error(error);
          //this.error$.next(true);
          this.handleError();
          return empty();
        })
      )));
  }

  handleError() {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.tipo = 'danger';
    this.modalRef.content.mensagem = 'Erro ao carregar os cursos. Tente novamente mais tarde.';
  }

  handleErrorDelete() {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.tipo = 'danger';
    this.modalRef.content.mensagem = 'Erro ao excluir o curso';
  }

  testeModal() {
    this.modalRef = this.modalService.show(TesteModalComponent);
    this.modalRef.content.frutas = this.frutas;
  }

  atualizar(curso: Curso) {
    this.modalRef = this.modalService.show(CursosFormModalComponent);
    this.modalRef.content.curso = curso;
    this.modalRef.content.titulo = "Editar";

    this.modalRef.content.onClose = new Subject<Curso>();
    this.modalRef.content.onClose.subscribe( _ => this.refreshCurso$.next(true))
  }

  salvar() {
    this.modalRef = this.modalService.show(CursosFormModalComponent);
    this.modalRef.content.titulo = "Adicionar";
    this.modalRef.content.onClose = new Subject<Curso>();

    this.modalRef.content.onClose.subscribe(result => {  //result é o curso criado emitido do CursosFormModalComponent ao salvar
      console.log('result: ', result);
      this.refreshCurso$.next(true);  //atualiza o cursos$
     })
  }

  remover(id: number) {
    this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' }); //usando ng-template neste caso
    this.idCurso = id;
  }

  confirmarExclusao() {
    this.cursoService.remover(this.idCurso).subscribe(
      success => {
        this.refreshCurso$.next(true)
        this.modalRef.hide();
      },
      error => {
        this.handleErrorDelete();
        this.modalRef.hide();
      }
    );
  }

  cancelarExclusao() {
    this.modalRef.hide();
  }


}
