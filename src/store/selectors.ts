import {createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state';
import {OfferListItems} from '../types/offer-list-item';

const EMPTY_ARRAY: OfferListItems = [];

export const selectCity = (state: State) => state.cityProcess.city;

export const selectOffers = (state: State) => state.offersData.offers;
export const selectOriginalOffers = (state: State) => state.offersData.originalOffers;
export const selectIsOffersLoading = (state: State) => state.offersData.isLoading;

export const selectOffer = (state: State) => state.offerData.offer;
export const selectOfferNeighborhood = (state: State) => state.offerData.neighborhood;
export const selectIsOfferLoading = (state: State) => state.offerData.isLoading;
export const selectOfferError = (state: State) => state.offerData.hasError;

export const selectReviews = (state: State) => state.reviewsData.reviews;
export const selectAuthorizationStatus = (state: State) => state.userProcess.authorizationStatus;

export const selectOffersByCity = createSelector(
  [selectOffers],
  (offers) => offers.reduce<Record<string, OfferListItems>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {})
);

export const selectCurrentCityOffers = createSelector(
  [selectOffersByCity, selectCity],
  (groupedOffers, city) => groupedOffers[city] || EMPTY_ARRAY
);

export const selectOriginalOffersByCity = createSelector(
  [selectOriginalOffers],
  (offers) => offers.reduce<Record<string, OfferListItems>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {})
);

export const selectCurrentCityOffersForMap = createSelector(
  [selectOriginalOffersByCity, selectCity],
  (groupedOffers, city) => groupedOffers[city] || EMPTY_ARRAY
);

export const selectOffersCityCountStable = createSelector(
  [selectCurrentCityOffersForMap],
  (offers) => offers.length
);

export const selectAppLoadingState = createSelector(
  [selectAuthorizationStatus, selectIsOffersLoading],
  (authStatus, offersLoading) => ({
    authStatus,
    offersLoading
  })
);
