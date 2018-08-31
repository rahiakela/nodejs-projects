import { Hero } from '../models/hero';
import { Actions, HeroActions } from './heros.actions';

export interface State {
  error?: any;
  heros: Hero[];
}

const initialState: State = {
  heros: [],
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case HeroActions.LOAD_HEROS:
      return { ...state, ...{ error: undefined, heros: [] } };

    case HeroActions.LOAD_HEROS_ERROR:
      return { ...state, ...{ error: action.payload.error } };

    case HeroActions.LOAD_HEROS_SUCCESS:
      return { ...state, ...{ heros: action.payload.heros } };

    default:
      return state;
  }
}

export const getHeros = (state: State) => state.heros;
