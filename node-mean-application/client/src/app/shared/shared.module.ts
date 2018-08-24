import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ToolbarComponent],
})
export class SharedModule {}
