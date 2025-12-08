import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoriteStatusAction} from '../../store/api-actions.ts';
import {selectAuthorizationStatus, selectOfferById} from '../../store/selectors.ts';
import {AuthorizationStatus, AppRoute} from '../../const.ts';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';

type BookmarkButtonProps = {
  offerId: string;
  className: string;
  width?: number;
  height?: number;
}

const BookmarkButtonComponent: React.FC<BookmarkButtonProps> = ({
  offerId,
  className,
  width = 18,
  height = 19,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const offer = useAppSelector(selectOfferById(offerId));
  const isFavorite = offer?.isFavorite ?? false;

  const handleBookmarkClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(changeFavoriteStatusAction({
      offerId,
      isFavorite: !isFavorite,
    }));
  }, [offerId, isFavorite, authorizationStatus, navigate, dispatch]);

  return (
    <button
      className={classNames(`${className}__bookmark-button`, 'button', {
        [`${className}__bookmark-button--active`]: isFavorite,
      })}
      type="button"
      onClick={handleBookmarkClick}
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export const BookmarkButton = React.memo(BookmarkButtonComponent, (prevProps, nextProps) =>
  prevProps.offerId === nextProps.offerId &&
  prevProps.className === nextProps.className &&
  prevProps.width === nextProps.width &&
  prevProps.height === nextProps.height
);
