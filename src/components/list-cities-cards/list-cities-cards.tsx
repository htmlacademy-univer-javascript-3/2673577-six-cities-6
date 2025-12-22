import React from 'react';
import {OfferListItem, OfferListItems} from '../../types/offer-list-item.ts';
import {useAppSelector} from '../../hooks';
import {selectOfferById} from '../../store/selectors';
import CitiesCard from '../cities-card/cities-card.tsx';

type ListCitiesCardsProps = {
  offers: OfferListItems | null;
  handleMouseOverOffer?: (offer: OfferListItem | null) => void;
  className: string;
}

type CardItemProps = {
  offerId: string;
  handleMouseOverOffer?: (offer: OfferListItem | null) => void;
  className: string;
}

const CardItem = React.memo<CardItemProps>(
  ({offerId, handleMouseOverOffer, className}) => {
    const offer = useAppSelector(selectOfferById(offerId));

    if (!offer) {
      return null;
    }

    return (
      <CitiesCard
        className={className}
        offer={offer}
        sizeImg='large'
        handleMouseOverOffer={handleMouseOverOffer}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.offerId === nextProps.offerId &&
    prevProps.className === nextProps.className &&
    prevProps.handleMouseOverOffer === nextProps.handleMouseOverOffer
);

CardItem.displayName = 'CardItem';

export const ListCitiesCards = React.memo<ListCitiesCardsProps>(
  ({offers, handleMouseOverOffer, className}) =>
    offers?.map((offer) => (
      <CardItem
        key={offer.id}
        offerId={offer.id}
        handleMouseOverOffer={handleMouseOverOffer}
        className={className}
      />
    )),
  (prevProps, nextProps) =>
    prevProps.offers === nextProps.offers &&
    prevProps.className === nextProps.className &&
    prevProps.handleMouseOverOffer === nextProps.handleMouseOverOffer
);

ListCitiesCards.displayName = 'ListCitiesCards';
