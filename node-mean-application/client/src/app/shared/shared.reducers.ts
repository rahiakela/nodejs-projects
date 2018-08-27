import { Actions, SIDENAV_CLOSE, SIDENAV_OPEN } from './shared.actions';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case SIDENAV_CLOSE:
      return { ...state, ...{ showSidenav: false } };

    case SIDENAV_OPEN:
      return { ...state, ...{ showSidenav: true } };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
