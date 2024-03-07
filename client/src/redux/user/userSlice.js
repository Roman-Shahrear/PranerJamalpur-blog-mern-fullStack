import { createSlice } from "@reduxjs/toolkit";
// import { produce } from "immer";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    successMessage: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true,
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          signoutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
          },
          forgotPasswordStart: (state) => {
            state.error = null;
            state.successMessage = null;
          },
          forgotPasswordSuccess: (state, action) => {
            state.error = null;
            state.successMessage = action.payload;
            setTimeout(() => {
              state.successMessage = null;
            }, 5000);
          },
          forgotPasswordFailure: (state, action) => {
            state.error = action.payload;
            state.successMessage = null;
          },
          setPasswordStart: (state) => {
            state.error = null;
            state.successMessage = null;
          },
          setPasswordSuccess: (state, action) => {
            state.error = null;
            state.successMessage = action.payload;
            setTimeout(() => {
              state.successMessage = null;
            }, 5000);
          },
          setPasswordFailure: (state, action) => {
            state.error = action.payload;
            state.successMessage = null;
          },
    },
});

export const { signInStart ,signInFailure, signInSuccess, updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signoutSuccess, forgotPasswordStart, forgotPasswordSuccess,  forgotPasswordFailure, setPasswordStart, setPasswordSuccess, setPasswordFailure } = userSlice.actions;

export default userSlice.reducer;