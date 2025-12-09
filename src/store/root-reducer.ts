import {combineReducers} from '@reduxjs/toolkit';
import {cityProcess} from './slices/city-process.ts';
import {offersData} from './slices/offers-data.ts';
import {offerData} from './slices/offer-data.ts';
import {reviewsData} from './slices/reviews-data.ts';
import {userProcess} from './slices/user-process.ts';

export const rootReducer = combineReducers({
  cityProcess: cityProcess.reducer,
  offersData: offersData.reducer,
  offerData: offerData.reducer,
  reviewsData: reviewsData.reducer,
  userProcess: userProcess.reducer,
});
