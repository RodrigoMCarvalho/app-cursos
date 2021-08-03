import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosListComponent } from './alunos-list/alunos-list.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunoResolverGuard } from './guards/aluno-resolver.guard';

const routes: Routes = [
  { path: '', component: AlunosListComponent},
  { path: 'novo', component: AlunosFormComponent,
  resolve: {
    aluno: AlunoResolverGuard   //aluno = nome do atributo que o componente vai usar para capturar o dado
  }
},
  { path: 'editar/:id', component: AlunosFormComponent,
  resolve: {
    aluno: AlunoResolverGuard   //aluno = nome do atributo que o componente vai usar para capturar o dado
  }
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class AlunosRoutingModule { }
