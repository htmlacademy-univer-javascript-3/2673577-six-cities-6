import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OfferListItems} from '../../types/offer-list-item.ts';
import {fetchOffersAction} from '../api-actions.ts';

type OffersDataState = {
  offers: OfferListItems;
  originalOffers: OfferListItems;
  isLoading: boolean;
}

const initialState: OffersDataState = {
  offers: [],
  originalOffers: [],
  isLoading: false,
};

export const offersData = createSlice({
  name: 'offersData',
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<OfferListItems>) => {
      state.offers = action.payload;
    },
    loadOriginalOffers: (state, action: PayloadAction<OfferListItems>) => {
      state.originalOffers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
        state.originalOffers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {loadOffers} = offersData.actions;
