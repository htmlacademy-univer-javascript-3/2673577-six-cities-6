import React, {useCallback} from 'react';
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/slices/city-process.ts';
import {CITIES} from '../../const.ts';
import {selectCity} from '../../store/selectors';

export const ListCities = React.memo(() => {
  const cityState = useAppSelector(selectCity);
  const dispatch = useAppDispatch();

  const handleCityChange = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <ul className="locations__list tabs__list">
      {Object.values(CITIES).map((city) => (
        <li key={city} className="locations__item">
          <a
            className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': cityState === city})}
            onClick={() => handleCityChange(city)}
            href="#"
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
});

ListCities.displayName = 'ListCities';
