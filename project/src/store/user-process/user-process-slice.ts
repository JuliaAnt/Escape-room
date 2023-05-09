import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../consts';
// import { getToken } from '../../services/token';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

// const token = getToken();

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  login: string | null;
}

const initialState: InitialState = {
  // authorizationStatus: token ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth,
  authorizationStatus: AuthorizationStatus.Auth,
  login: '',
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.login = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
