import CityMap from '../map/map.tsx';
import {OfferListItem} from '../../types/offer-list-item.ts';
import {useAppSelector} from '../../hooks';
import {selectCurrentCityOffersForMap} from '../../store/selectors';

type MapSectionProps = {
  selectedOffer: OfferListItem | null;
}

export function MapSection({ selectedOffer }: MapSectionProps) {
  const currentCityOffersForMap = useAppSelector(selectCurrentCityOffersForMap);

  return (
    <div className="cities__right-section">
      <section className="cities__map map">
        <CityMap screen='main' offers={currentCityOffersForMap} selectedOffer={selectedOffer}/>
      </section>
    </div>
  );
}
