import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const.ts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions.ts';

type UserProcessState = {
  authorizationStatus: AuthorizationStatus;
}

const initialState: UserProcessState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: 'userProcess',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
