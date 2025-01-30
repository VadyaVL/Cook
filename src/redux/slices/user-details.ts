import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserModel } from '../../models/user';
import { dummyApiServiceInstance } from '../../services/dummy-api-service';

type UserDetailsSliceType = {
    data: IUserModel | undefined;
    loading: boolean;
    error: string | undefined;
};

export const getUserDetails = createAsyncThunk<any, number>(
    'getUserDetails',
    async (id, thunkAPI) => {
        const userDetails = await dummyApiServiceInstance.getUserDetail(id);
        return thunkAPI.fulfillWithValue(userDetails)
    }
);

export const userDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: {
        data: undefined,
        loading: false,
        error: undefined,
    } as UserDetailsSliceType,
    reducers: {
        reset: (state) => {
            state.data = undefined;
            state.loading = false;
            state.error = undefined;
        },
    },
    extraReducers: builder => {
        return builder
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<IUserModel>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.data = undefined;
                state.error = action.error.message;
            });
    },
});

export const { reset } = userDetailsSlice.actions;
