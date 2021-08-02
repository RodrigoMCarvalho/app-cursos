import { Component, OnInit } from '@angular/core';
import { AlunoService } from './../../services/aluno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.scss']
})
export class AlunosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private alunoService: AlunoService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
    this.atualizar();
    this.formulario();
  }

  formulario() {
    const aluno = this.route.snapshot.data['aluno']; //obtém o "aluno" usando Resolve ao carregar o componente, ganha em performance
    this.form = this.fb.group({
      id: [aluno.id],
      nome: [aluno.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    })
  }

  updateForm(aluno) {
    this.form.patchValue({
      id: aluno.id,
      nome: aluno.nome
    })
  }

  atualizar() {
    // --------------  1ª FORMA DE FAZER
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     this.alunoService.loadByID(id).subscribe(
    //       aluno => this.updateForm(aluno)
    //     )
    //   }
    // )

    // -------------  2ª FORMA DE FAZER
    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']), //retorna o ID da rota
    //   switchMap(id => this.alunoService.loadByID(id)) //retorna o aluno
    // )
    // .subscribe( aluno => this.updateForm(aluno) )
  }

  salvar() {
    this.alunoService.save(this.form.value).subscribe(
      success => {
        this.toastr.success("Aluno cadastrado com sucesso!");
        this.location.back();
      },
      error => {
        this.toastr.error("Erro para cadastrar o aluno!");
      }
    )
  }

  cancelar() {
    this.location.back();
  }

}
