import {createSlice} from '@reduxjs/toolkit';
import {Offer} from '../../types/offer.ts';
import {OfferListItems} from '../../types/offer-list-item.ts';
import {fetchOfferAction, fetchOfferNeighbourhoodAction} from '../api-actions.ts';

type OfferDataState = {
  offer: Offer | null;
  neighborhood: OfferListItems;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: OfferDataState = {
  offer: null,
  neighborhood: [],
  isLoading: false,
  hasError: false,
};

export const offerData = createSlice({
  name: 'offerData',
  initialState,
  reducers: {
    clearOffer: (state) => {
      state.offer = null;
      state.neighborhood = [];
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offer = action.payload;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferNeighbourhoodAction.fulfilled, (state, action) => {
        state.neighborhood = action.payload;
      });
  },
});
