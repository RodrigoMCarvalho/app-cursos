import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { TesteModalComponent } from './teste-modal/teste-modal.component';


@NgModule({
  declarations: [AlertModalComponent, TesteModalComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertModalComponent, TesteModalComponent]
})
export class SharedModule { }
