import {memo, useCallback, ChangeEvent} from 'react';

type ReviewTextareaProps = {
  value: string;
  onChange: (text: string) => void;
}

const ReviewTextarea = memo(({value, onChange}: ReviewTextareaProps) => {
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder="Tell how was your stay, what you like and what can be improved"
      onChange={handleChange}
      value={value}
    />
  );
});

ReviewTextarea.displayName = 'ReviewTextarea';

export default ReviewTextarea;
