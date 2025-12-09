import {FormEvent, useState, useCallback} from 'react';
import {fetchReviewAction, postReviewAction} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks';
import ReviewTextarea from '../review-textarea/review-textarea.tsx';
import RatingInput from '../rating-input/rating-input.tsx';
import {addReview} from '../../store/slices/reviews-data.ts';

type Review = {
  rating: number;
  text: string;
  dateCreated: Date;
}

type OfferReviewFormProps = {
  offerId: string;
}

const RATING_OPTIONS = [
  { value: 5, id: '5-stars', title: 'perfect' },
  { value: 4, id: '4-stars', title: 'good' },
  { value: 3, id: '3-stars', title: 'not bad' },
  { value: 2, id: '2-stars', title: 'badly' },
  { value: 1, id: '1-star', title: 'terribly' },
];

const INITIAL_REVIEW_STATE: Review = {
  rating: 0,
  text: '',
  dateCreated: new Date()
};

export function OfferReviewForm({offerId} : OfferReviewFormProps) {
  const [review, setReview] = useState<Review>(INITIAL_REVIEW_STATE);

  const handleTextChange = useCallback((text: string) => {
    setReview((prevState) => ({
      ...prevState,
      text,
      dateCreated: new Date()
    }));
  }, []);

  const handleRatingChange = useCallback((rating: number) => {
    setReview((prevState) => ({
      ...prevState,
      rating,
      dateCreated: new Date()
    }));
  }, []);

  const dispatch = useAppDispatch();

  const handleAddReview = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (review.rating === 0 || review.text.length < 50) {
      return;
    }

    const newReview = {
      id: `temp-${Date.now()}`,
      date: new Date().toISOString(),
      user: {
        name: 'You',
        avatarUrl: 'img/avatar.svg',
        isPro: false
      },
      comment: review.text,
      rating: review.rating
    };

    dispatch(addReview(newReview));

    setReview(INITIAL_REVIEW_STATE);

    dispatch(postReviewAction({
      offerId,
      comment: review.text,
      rating: review.rating
    })).then(() => {
      dispatch(fetchReviewAction(offerId));
    });
  }, [review.rating, review.text, dispatch, offerId]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleAddReview}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_OPTIONS.map((option) => (
          <RatingInput
            key={option.id}
            value={option.value}
            id={option.id}
            title={option.title}
            currentRating={review.rating}
            onChange={handleRatingChange}
          />
        ))}
      </div>
      <ReviewTextarea value={review.text} onChange={handleTextChange} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}
