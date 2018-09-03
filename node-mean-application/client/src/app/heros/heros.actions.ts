import { Action } from '@ngrx/store';
import { Hero } from '../models/hero';

export enum ActionTypes {
  LOAD_HEROS = '[heros] Load heros',
  LOAD_HEROS_ERROR = '[heros] Load heros error',
  LOAD_HEROS_SUCCESS = '[heros] Load heros success',
}

export class LoadHerosAction implements Action {
  readonly type = ActionTypes.LOAD_HEROS;
}

export class LoadHerosErrorAction implements Action {
  readonly type = ActionTypes.LOAD_HEROS_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class LoadHerosSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_HEROS_SUCCESS;
  constructor(public payload: { heros: Hero[] }) {}
}

export type HeroActions = LoadHerosAction | LoadHerosErrorAction | LoadHerosSuccessAction;
