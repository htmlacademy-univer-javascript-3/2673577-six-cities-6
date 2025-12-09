import React from 'react';
import {OfferListItem, OfferListItems} from '../../types/offer-list-item.ts';
import CitiesCard from '../cities-card/cities-card.tsx';

type ListCitiesCardsProps = {
  offers: OfferListItems | null;
  handleMouseOverOffer?: (offer: OfferListItem | null) => void;
  className: string;
}

export const ListCitiesCards = React.memo<ListCitiesCardsProps>(
  ({offers, handleMouseOverOffer, className}) => (
    offers?.map((offer) => (
      <CitiesCard
        className={className}
        key={offer.id}
        offer={offer}
        sizeImg='large'
        handleMouseOverOffer={handleMouseOverOffer}
      />
    ))
  )
);

ListCitiesCards.displayName = 'ListCitiesCards';
