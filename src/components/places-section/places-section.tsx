import React from 'react';
import {SortingOptions} from '../sorting-options/sorting-options.tsx';
import {PlacesFound} from '../places-found/places-found.tsx';
import {OffersList} from '../offers-list/offers-list.tsx';
import {OfferListItem, OfferListItems} from '../../types/offer-list-item.ts';

type PlacesSectionProps = {
  offers: OfferListItems;
  count: number;
  city: string;
  onMouseOverOffer: (offer: OfferListItem | null) => void;
}

export const PlacesSection = React.memo<PlacesSectionProps>(
  ({ offers, count, city, onMouseOverOffer }) => (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <PlacesFound count={count} city={city} />
      <SortingOptions/>
      <OffersList
        offers={offers}
        onMouseOverOffer={onMouseOverOffer}
      />
    </section>
  ),
  (prevProps, nextProps) =>
    prevProps.offers === nextProps.offers &&
    prevProps.count === nextProps.count &&
    prevProps.city === nextProps.city &&
    prevProps.onMouseOverOffer === nextProps.onMouseOverOffer
);

PlacesSection.displayName = 'PlacesSection';
