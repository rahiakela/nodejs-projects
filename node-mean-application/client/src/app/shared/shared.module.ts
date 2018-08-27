import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class SharedModule {}
