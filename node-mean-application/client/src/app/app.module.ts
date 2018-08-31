import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducer } from './app.reducers';
import { HerosService } from './core/services/heros-service';
import { HerosModule } from './heros/heros.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HerosModule,
    SharedModule,
    StoreModule.forRoot({ shared: reducer }),
  ],
  providers: [HerosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
