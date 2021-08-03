import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Aluno } from './../../models/aluno-model';
import { AlunoService } from './../../services/aluno.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoResolverGuard implements Resolve<Aluno>{

  constructor(private alunoService: AlunoService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Aluno> {

    const alunoId = route.params['id'];
    //se existir um ID na rota (editar), busca o aluno
    if(route.params && alunoId) {
      return this.alunoService.loadByID(alunoId)
        .pipe(
          map(resultado => {
            if (resultado) return resultado;
          }),
          catchError( () => {
            this.router.navigate(['alunos']);
            return of(null);
          })
        );
    }

    //caso seja um novo aluno, retorna null
    return of({ id: null, nome: null });
  }

}
