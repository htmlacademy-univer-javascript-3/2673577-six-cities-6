import React from 'react';
import {ListCitiesCards} from '../list-cities-cards/list-cities-cards.tsx';
import {OfferListItem, OfferListItems} from '../../types/offer-list-item.ts';

type OffersListProps = {
  offers: OfferListItems;
  onMouseOverOffer: (offer: OfferListItem | null) => void;
}

export const OffersList = React.memo<OffersListProps>(
  ({ offers, onMouseOverOffer }) => (
    <div className='cities__places-list places__list tabs__content'>
      <ListCitiesCards
        offers={offers}
        handleMouseOverOffer={onMouseOverOffer}
        className={'cities'}
      />
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.offers === nextProps.offers &&
    prevProps.onMouseOverOffer === nextProps.onMouseOverOffer
);

OffersList.displayName = 'OffersList';
