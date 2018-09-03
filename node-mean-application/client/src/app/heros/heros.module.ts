import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatSnackBarModule, SharedModule],
  declarations: [IndexComponent],
})
export class HerosModule {}
