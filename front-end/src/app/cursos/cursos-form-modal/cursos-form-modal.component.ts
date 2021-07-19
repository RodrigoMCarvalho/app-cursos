import { Component, Input, OnInit } from '@angular/core';
import { Curso } from './../../models/curso-model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CursoService } from './../../services/curso.service';

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
    private cursoService: CursoService
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
    this.cursoService.salvar(this.form.value).subscribe(curso =>
      this.bsModalRef.content.onClose.next(curso)    //subject emitindo o curso criado para a chamada do modal
    );
    this.bsModalRef.hide();
  }

  hasError(field: string) {
    return this.form.get('nome').errors;
  }

  fechar() {
    this.submitted = false;
    this.form.reset();
    this.bsModalRef.hide();
  }

}
