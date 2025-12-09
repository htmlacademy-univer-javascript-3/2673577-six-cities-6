import React from 'react';
import {ListCities} from '../list-cities/list-cities.tsx';

export const TabsSection = React.memo(() => (
  <div className="tabs">
    <section className="locations container">
      <ListCities/>
    </section>
  </div>
));

TabsSection.displayName = 'TabsSection';
