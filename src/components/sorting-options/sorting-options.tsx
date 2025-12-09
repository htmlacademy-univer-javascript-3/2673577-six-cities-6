import React, {useState, useCallback} from 'react';
import {useStore} from 'react-redux';
import classNames from 'classnames';
import {loadOffers} from '../../store/slices/offers-data.ts';
import {OfferListItems} from '../../types/offer-list-item.ts';
import {useAppDispatch} from '../../hooks';
import {selectOffers, selectOriginalOffers} from '../../store/selectors';
import {State} from '../../types/state.ts';

export const SortingOptions = React.memo(() => {
  const dispatch = useAppDispatch();
  const store = useStore<State>();

  const [selectedSort, setSelectedSort] = useState('Popular');
  const [openedSort, setOpenedSort] = useState(false);

  const sortedOffers = useCallback((offers: OfferListItems, sortType: string) => {
    const sorted = [...offers];
    switch (sortType) {
      case 'Price: low to high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'Price: high to low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'Top rated first':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return sorted;
  }, []);

  const handleSortChange = useCallback((sortType: string, currentSort: string) => {
    setOpenedSort((prev) => !prev);

    if (currentSort === sortType) {
      return;
    }

    setSelectedSort(sortType);


    const state = store.getState();
    const currentOffers = selectOffers(state);
    const originalOffers = selectOriginalOffers(state);


    if (sortType === 'Popular') {
      dispatch(loadOffers(originalOffers));
    } else {
      dispatch(loadOffers(sortedOffers(currentOffers, sortType)));
    }
  }, [dispatch, sortedOffers, store]);

  const handleToggleSort = useCallback(() => {
    setOpenedSort((prev) => !prev);
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleToggleSort}>
        {selectedSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options', 'places__options--custom', {'places__options--opened': openedSort})}>
        {['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'].map((option) => (
          <li
            key={option}
            className={classNames('places__option', {'places__option--active': selectedSort === option})}
            tabIndex={0}
            onClick={() => handleSortChange(option, selectedSort)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
});

SortingOptions.displayName = 'SortingOptions';
