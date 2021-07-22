import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosListComponent } from './alunos-list/alunos-list.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';


@NgModule({
  declarations: [AlunosListComponent, AlunosFormComponent],
  imports: [
    CommonModule,
    AlunosRoutingModule
  ]
})
export class AlunosModule { }
