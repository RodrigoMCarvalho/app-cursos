import { Component, OnInit } from '@angular/core';
import { AlunoService } from './../../services/aluno.service';
import { Aluno } from './../../models/aluno-model';
import { Observable, empty, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

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

  modalRef: BsModalRef;

  constructor(private alunoService: AlunoService,
              private modalService: BsModalService,
              private router: Router,
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

  editar(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  handleError() {
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.tipo = 'danger';
    this.modalRef.content.mensagem = 'Erro ao carregar os alunos. Tente novamente mais tarde.';
  }

}
