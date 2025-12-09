import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Review, Reviews} from '../../types/review.ts';
import {fetchReviewAction} from '../api-actions.ts';

type ReviewsDataState = {
  reviews: Reviews;
  isLoading: boolean;
}

const initialState: ReviewsDataState = {
  reviews: [],
  isLoading: false,
};

export const reviewsData = createSlice({
  name: 'reviewsData',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews = [action.payload, ...state.reviews];
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {addReview} = reviewsData.actions;
