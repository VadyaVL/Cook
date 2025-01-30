import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRecipeModel, IRecipesFeedModel } from '../../models/recipe';
import { dummyApiServiceInstance } from '../../services/dummy-api-service';

type RecipeListSliceType = {
    limit: number;
    skip: number;
    total: number;
    data: IRecipeModel[];
    loading: boolean;
    error: string | undefined;
};

export const getRecipeList = createAsyncThunk<any, { searchTerm: string, limit: number; skip: number; }>(
    'getRecipeList',
    async ({ searchTerm, limit, skip }, thunkAPI) => {
        const recipeList = await dummyApiServiceInstance.getRecipeList(searchTerm, limit, skip);
        return thunkAPI.fulfillWithValue(recipeList)
    }
);

export const recipeListSlice = createSlice({
    name: 'recipeList',
    initialState: {
        limit: 0,
        skip: 0,
        total: 0,
        data: [],
        loading: false,
        error: undefined,
    } as RecipeListSliceType,
    reducers: {
        
    },
    extraReducers: builder => {
        return builder
            .addCase(getRecipeList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecipeList.fulfilled, (state, action: PayloadAction<IRecipesFeedModel>) => {
                state.loading = false;
                //state.limit = action.payload.limit;
                state.skip = action.payload.skip;
                state.total = action.payload.total;
                state.data = action.payload.recipes;
            })
            .addCase(getRecipeList.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export const { } = recipeListSlice.actions;
