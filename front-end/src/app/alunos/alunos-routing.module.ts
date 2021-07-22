import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosListComponent } from './alunos-list/alunos-list.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';

const routes: Routes = [
  { path: '', component: AlunosListComponent},
  { path: 'novo', component: AlunosFormComponent},
  { path: 'editar:/id', component: AlunosFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class AlunosRoutingModule { }
