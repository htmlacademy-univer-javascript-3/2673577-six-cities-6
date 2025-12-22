import React from 'react';

type MainEmptyProps = {
  city: string;
}

export const MainEmpty = React.memo<MainEmptyProps>(({ city }) => (
  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
    </div>
  </section>
));

MainEmpty.displayName = 'MainEmpty';
