import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {OfferListItems} from '../types/offer-list-item.ts';
import {APIRoute} from '../const.ts';
import {Reviews} from '../types/review.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {UserData} from '../types/user-data.ts';
import {AuthData} from '../types/auth-data.ts';
import {Offer} from '../types/offer.ts';

export const fetchOffersAction = createAsyncThunk<OfferListItems, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offersData/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferListItems>(APIRoute.Offers);
    return data;
  },
);

export const fetchReviewAction = createAsyncThunk<Reviews, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviewsData/fetchReviews',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${offerId}`);
    return data;
  },
);

export const postReviewAction = createAsyncThunk<void, {offerId: string; comment: string; rating: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviewsData/postReview',
  async ({offerId, comment, rating}, {extra: api}) => {
    await api.post<UserData>(`${APIRoute.Reviews}/${offerId}`, {comment, rating});
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerData/fetchOffer',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchOfferNeighbourhoodAction = createAsyncThunk<OfferListItems, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerData/fetchNeighbourhood',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferListItems>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'userProcess/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'userProcess/login',
  async ({login: email, password}, {extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'userProcess/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
