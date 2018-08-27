import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  ActionReducer,
  combineReducers,
  compose,
  createSelector,
  State,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import * as shared from './shared/shared.reducers';

export interface State {
  router: RouterReducerState;
  shared: shared.State;
}

const reducers = {
  router: routerReducer,
  shared: shared.reducer,
};

const developmentReducer: ActionReducer<State> = compose(
  storeFreeze,
  combineReducers
)(reducers);

const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

/**
 * Shared Reducers
 */
export const getSharedState = (state: State) => state.shared;
export const getShowSidenav = createSelector(getSharedState, shared.getShowSidenav);
