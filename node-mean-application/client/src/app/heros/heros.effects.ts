import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { empty, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HerosService } from '../core/services/heros-service';
import * as HeroActions from './heros.actions';

@Injectable()
export class HeroEffects {
  constructor(
    private actions: Actions,
    private herosService: HerosService,
    private matDialog: MatDialog,
    private matSnackbar: MatSnackBar
  ) {}

  @Effect()
  loadHerosEffect$: Observable<Action> = this.actions.pipe(
    ofType<HeroActions.LoadHerosAction>(HeroActions.ActionTypes.LOAD_HEROS),
    switchMap(action =>
      this.herosService.list().pipe(
        map(heros => new HeroActions.LoadHerosSuccessAction({ heros: heros })),
        catchError(error => of(new HeroActions.LoadHerosErrorAction({ error: error })))
      )
    )
  );

  @Effect()
  loadHerosErrorEffect$: Observable<Action> = this.actions.pipe(
    ofType<HeroActions.LoadHerosErrorAction>(HeroActions.ActionTypes.LOAD_HEROS_ERROR),
    switchMap(action => {
      this.matSnackbar.open('Oops. Something went wrong.', null, { duration: 1000 });
      return empty();
    })
  );
}
