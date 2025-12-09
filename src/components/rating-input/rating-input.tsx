import {memo, useCallback} from 'react';

type RatingInputProps = {
  value: number;
  id: string;
  title: string;
  currentRating: number;
  onChange: (rating: number) => void;
}

const RatingInput = memo(({value, id, title, currentRating, onChange}: RatingInputProps) => {
  const handleChange = useCallback(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={id}
        type="radio"
        checked={currentRating === value}
        onChange={handleChange}
      />
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
});

RatingInput.displayName = 'RatingInput';

export default RatingInput;
