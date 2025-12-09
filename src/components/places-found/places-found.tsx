import React from 'react';

type PlacesFoundProps = {
  count: number;
  city: string;
}

export const PlacesFound = React.memo<PlacesFoundProps>(({ count, city }) => (
  <b className="places__found">{count} places to stay in {city}</b>
));

PlacesFound.displayName = 'PlacesFound';
