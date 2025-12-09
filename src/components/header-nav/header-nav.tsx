import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions.ts';
import {selectAuthorizationStatus} from '../../store/selectors';

export const HeaderNav = React.memo(() => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();

  const handleLogout = useCallback((evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"/>
            {authorizationStatus === AuthorizationStatus.Auth && (
              <>
                <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                <span className="header__favorite-count">3</span>
              </>
            )}
          </Link>
        </li>
        {authorizationStatus === AuthorizationStatus.Auth ? (
          <li className="header__nav-item">
            <Link to={AppRoute.Root} className="header__nav-link" onClick={handleLogout}>
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        ) : (<Link to={AppRoute.Login}><span className="header__login">Sign in</span></Link>)}
      </ul>
    </nav>
  );
});

HeaderNav.displayName = 'HeaderNav';
