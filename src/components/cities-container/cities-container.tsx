import React, {useState, useCallback} from 'react';
import {PlacesSection} from '../places-section/places-section.tsx';
import {MapSection} from '../map-section/map-section.tsx';
import {OfferListItem} from '../../types/offer-list-item.ts';
import {useAppSelector} from '../../hooks';
import {
  selectCity,
  selectCurrentCityOffers,
  selectOffersCityCountStable
} from '../../store/selectors';

export const CitiesContainer = React.memo(() => {
  const [activeOffer, setActiveOffer] = useState<OfferListItem | null>(null);

  const handleMouseOverOffer = useCallback((offer: OfferListItem | null) => {
    setActiveOffer(offer);
  }, []);

  const cityState = useAppSelector(selectCity);
  const currentCityOffers = useAppSelector(selectCurrentCityOffers);
  const offersCount = useAppSelector(selectOffersCityCountStable);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <PlacesSection
          offers={currentCityOffers}
          count={offersCount}
          city={cityState}
          onMouseOverOffer={handleMouseOverOffer}
        />
        <MapSection
          selectedOffer={activeOffer}
        />
      </div>
    </div>
  );
});

CitiesContainer.displayName = 'CitiesContainer';
