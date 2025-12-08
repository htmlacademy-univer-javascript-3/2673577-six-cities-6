import {createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state';
import {OfferListItems} from '../types/offer-list-item';

const EMPTY_ARRAY: OfferListItems = [];

const offersByCity: Record<string, OfferListItems> = {};
let cachedGroupedOffers: Record<string, OfferListItems> = {};
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
export const selectUser = (state: State) => state.userProcess.user;

export const selectFavorites = (state: State) => state.favoriteData.favorites;
export const selectFavoriteCount = (state: State) => state.favoriteData.favoriteCount;

export const selectOfferById = (offerId: string) =>
  createSelector(
    [selectOffers],
    (offers) => offers.find((offer) => offer.id === offerId)
  );
export const selectOffersByCity = createSelector(
  [selectOffers],
  (offers) => {
    const newGrouping: Record<string, OfferListItems> = {};

    offers.forEach((offer) => {
      const cityName = offer.city.name;
      if (!newGrouping[cityName]) {
        newGrouping[cityName] = [];
      }
      newGrouping[cityName].push(offer);
    });

    Object.keys(newGrouping).forEach((cityName) => {
      const oldArray = offersByCity[cityName];
      const newArray = newGrouping[cityName];

      if (oldArray && oldArray.length === newArray.length) {

        const changedIndices: number[] = [];
        newArray.forEach((offer, idx) => {
          if (offer.id !== oldArray[idx]?.id || offer.isFavorite !== oldArray[idx]?.isFavorite) {
            changedIndices.push(idx);
          }
        });

        if (changedIndices.length === 0) {
          newGrouping[cityName] = oldArray;
        } else {
          newGrouping[cityName] = oldArray.map((offer, idx) =>
            changedIndices.includes(idx) ? newArray[idx] : offer
          );
        }
      }
    });

    Object.keys(newGrouping).forEach((cityName) => {
      offersByCity[cityName] = newGrouping[cityName];
    });


    const hasChanges = Object.keys(newGrouping).some((cityName) =>
      newGrouping[cityName] !== cachedGroupedOffers[cityName]
    );

    if (!hasChanges && Object.keys(cachedGroupedOffers).length === Object.keys(newGrouping).length) {
      return cachedGroupedOffers;
    }

    cachedGroupedOffers = newGrouping;
    return newGrouping;
  }
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
