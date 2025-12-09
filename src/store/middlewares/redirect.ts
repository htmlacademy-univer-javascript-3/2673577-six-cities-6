import {Dispatch} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';
import browserHistory from '../../browser-history';
import {loginAction} from '../api-actions';
import {AppRoute} from '../../const';

export const redirect = () => (next: Dispatch) => (action: AnyAction): AnyAction => {
  if (loginAction.fulfilled.match(action)) {
    browserHistory.push(AppRoute.Root);
  }

  return next(action);
};
