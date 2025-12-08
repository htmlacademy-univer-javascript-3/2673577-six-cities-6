import {MiddlewareAPI, Dispatch} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';
import browserHistory from '../../browser-history';
import {loginAction, checkAuthAction, fetchFavoritesAction} from '../api-actions';
import {AppRoute} from '../../const';

export const redirect = (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction): AnyAction => {
  if (loginAction.fulfilled.match(action)) {
    store.dispatch(fetchFavoritesAction() as never);
    browserHistory.push(AppRoute.Root);
  }

  if (checkAuthAction.fulfilled.match(action)) {
    store.dispatch(fetchFavoritesAction() as never);
  }

  return next(action);
};
