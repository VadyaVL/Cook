import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { dummyApiServiceInstance } from '../../services/dummy-api-service';
import { IAccountModel } from '../../models/account';
import { ISignInArgs } from '../../models/sign-in-request';

type AccountSliceType = {
    isAutorized: boolean;
    data: IAccountModel | undefined;
    loading: boolean;
    error: string | undefined;
};

export const signIn = createAsyncThunk<any, ISignInArgs>(
    'signIn',
    async ({ username, password }, thunkAPI) => {
        const account = await dummyApiServiceInstance.signIn(username, password);
        return thunkAPI.fulfillWithValue(account)
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isAutorized: false,
        data: undefined,
        loading: false,
        error: undefined,
    } as AccountSliceType,
    reducers: {
        signOut: (state) => {
            state.isAutorized = false;
            state.data = undefined;
            state.loading = false;
            state.error = undefined;
        },
    },
    extraReducers: builder => {
        return builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<IAccountModel>) => {
                state.loading = false;
                state.data = action.payload;
                state.isAutorized = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.data = undefined;
                state.error = action.error.message;
            });
    },
});

export const { signOut } = accountSlice.actions;
