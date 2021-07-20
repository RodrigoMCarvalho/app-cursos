import { Component, Input, OnInit } from '@angular/core';
import { Curso } from './../../models/curso-model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from './../../services/curso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cursos-form-modal',
  templateUrl: './cursos-form-modal.component.html',
  styleUrls: ['./cursos-form-modal.component.scss']
})
export class CursosFormModalComponent implements OnInit {

  // @Input() frutas: any[];
  @Input() curso: Curso;
  @Input() titulo: string;

  form: FormGroup;
  submitted = false;

  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private cursoService: CursoService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      if(this.curso) {
        this.updateForm(); //usado desta forma para evitar undefined
      }
    });
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    })
  }

  updateForm() {
    this.form.patchValue({
      id: this.curso.id,
      nome: this.curso.nome
    })
  }

  salvar() {
    this.submitted = true;

    if (this.form.valid) {
      if (this.form.value.id) {
        this.cursoService.atualizar(this.form.value).subscribe(
        sucess  => {
          this.bsModalRef.content.onClose.next()
          this.toastr.success("Curso editado com sucesso!")
        },
        error => {
          this.toastr.error("Erro para editar o curso.")
        });
      } else {
        this.cursoService.salvar(this.form.value).subscribe(curso => {
          this.bsModalRef.content.onClose.next(curso)    //subject emitindo o curso criado para a chamada do modal
          this.toastr.success("Curso salvo com sucesso!")
        },
        error => {
          this.toastr.error("Erro para salvar o curso.")
        });
      }
      this.bsModalRef.hide();
    }
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  fechar() {
    this.submitted = false;
    this.bsModalRef.hide();
  }

}
