import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';
import { AlunosComponent } from './alunos/alunos.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'bem-vindo'
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  { path: 'bem-vindo', component: BemVindoComponent },
  { path: 'alunos', component: AlunosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
