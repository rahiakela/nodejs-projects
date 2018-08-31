import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatSnackBarModule, SharedModule],
  declarations: [],
})
export class HerosModule {}
