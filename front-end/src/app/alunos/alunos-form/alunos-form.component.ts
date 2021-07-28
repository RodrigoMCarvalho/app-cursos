import { Component, OnInit } from '@angular/core';
import { AlunoService } from './../../services/aluno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    })
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
