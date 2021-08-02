import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Aluno } from './../../models/aluno-model';
import { AlunoService } from './../../services/aluno.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoResolverGuard implements Resolve<Aluno>{

  constructor(private alunoService: AlunoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Aluno> {

    if(route.params && route.params['id']) {
      return this.alunoService.loadByID(route.params['id']);
    }

    return of({ id: null, nome: null });
  }

}
