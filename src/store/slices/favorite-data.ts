import {createSlice} from '@reduxjs/toolkit';
import {OfferListItems} from '../../types/offer-list-item.ts';
import {changeFavoriteStatusAction, fetchFavoritesAction} from '../api-actions.ts';

type FavoriteDataState = {
  favorites: OfferListItems;
  favoriteCount: number;
  isLoading: boolean;
}

const initialState: FavoriteDataState = {
  favorites: [],
  favoriteCount: 0,
  isLoading: false,
};

export const favoriteData = createSlice({
  name: 'favoriteData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
        state.favoriteCount = action.payload.length;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const offer = action.payload;
        if (offer.isFavorite) {
          if (!state.favorites.some((fav) => fav.id === offer.id)) {
            state.favorites.push(offer);
          }
          state.favoriteCount += 1;
        } else {
          state.favorites = state.favorites.filter((fav) => fav.id !== offer.id);
          state.favoriteCount = Math.max(0, state.favoriteCount - 1);
        }
      });
  },
});
