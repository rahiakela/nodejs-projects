import { Hero } from '../models/hero';
import { ActionTypes, HeroActions } from './heros.actions';

export interface State {
  error?: any;
  heros: Hero[];
}

const initialState: State = {
  heros: [],
};

export function reducer(state = initialState, action: HeroActions): State {
  switch (action.type) {
    case ActionTypes.LOAD_HEROS:
      return { ...state, ...{ error: undefined, heros: [] } };

    case ActionTypes.LOAD_HEROS_ERROR:
      return { ...state, ...{ error: action.payload.error } };

    case ActionTypes.LOAD_HEROS_SUCCESS:
      return { ...state, ...{ heros: action.payload.heros } };

    default:
      return state;
  }
}

export const getHeros = (state: State) => state.heros;
