import { Action } from '@ngrx/store';
import { Hero } from '../models/hero';

export enum HeroActions {
  LOAD_HEROS = '[heros] Load heros',
  LOAD_HEROS_ERROR = '[heros] Load heros error',
  LOAD_HEROS_SUCCESS = '[heros] Load heros success',
}

export class LoadHerosAction implements Action {
  readonly type = HeroActions.LOAD_HEROS;
}

export class LoadHerosErrorAction implements Action {
  readonly type = HeroActions.LOAD_HEROS_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class LoadHerosSuccessAction implements Action {
  readonly type = HeroActions.LOAD_HEROS_SUCCESS;
  constructor(public payload: { heros: Hero[] }) {}
}

export type Actions = LoadHerosAction | LoadHerosErrorAction | LoadHerosSuccessAction;
