import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Curso } from '../../models/curso-model';

@Component({
  selector: 'app-teste-modal',
  templateUrl: './teste-modal.component.html',
  styleUrls: ['./teste-modal.component.scss']
})
export class TesteModalComponent implements OnInit {

  @Input() frutas: any[];
  @Input() curso: Curso;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  fechar() {
    this.bsModalRef.hide();
  }
}
