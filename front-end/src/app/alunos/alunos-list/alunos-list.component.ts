import { Component, OnInit, ViewChild } from '@angular/core';
import { AlunoService } from './../../services/aluno.service';
import { Aluno } from './../../models/aluno-model';
import { Observable, empty, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.scss'],
  preserveWhitespaces: true
})
export class AlunosListComponent implements OnInit {

  alunos: Aluno[];
  idAluno: number;
  alunos$: Observable<Aluno[]>;
  refreshAlunos$ = new BehaviorSubject<boolean>(true);

  modalRef: BsModalRef;

  @ViewChild('deleteModal') deleteModal;

  constructor(private alunoService: AlunoService,
              private modalService: BsModalService,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getAlunos();
  }

  getAlunos() {
    this.alunos$ = this.refreshAlunos$.pipe(switchMap( response =>  this.alunoService.getAlunos()
    .pipe(
      catchError(error => {
        this.handleError();
        console.error(error);
        return empty();
      })
    )));
  }

  remover(id: number) {
    this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' }); //usando ng-template neste caso
    this.idAluno = id;
  }

  confirmarExclusao() {
    this.alunoService.remove(this.idAluno).subscribe(
      success => {

        //2 FORMAS DE ATUALIZAR A LISTA
        //this.refreshAlunos$.next(true);
        this.getAlunos();

        this.modalRef.hide();
        this.toastr.success("Aluno(a) excluído(a) com sucesso!");
      },
      error => {
        this.handleErrorDelete();
        this.modalRef.hide();
        this.toastr.error("Erro para excluir o(a) aluno(a).")
      }
    );
  }

  cancelarExclusao() {
    this.modalRef.hide();
  }

  editar(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  handleError() {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.tipo = 'danger';
    this.modalRef.content.mensagem = 'Erro ao carregar os alunos. Tente novamente mais tarde.';
  }

  handleErrorDelete() {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.tipo = 'danger';
    this.modalRef.content.mensagem = 'Erro ao excluir o(a) aluno(a)';
  }

}
