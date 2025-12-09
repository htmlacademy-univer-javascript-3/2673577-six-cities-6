import React from 'react';
import { ClipLoader } from 'react-spinners';
import {TabsSection} from '../../components/tabs-section/tabs-section.tsx';
import {CitiesContainer} from '../../components/cities-container/cities-container.tsx';
import {AuthorizationStatus} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header.tsx';
import {selectAppLoadingState} from '../../store/selectors';

const MainScreen = React.memo(() => {
  const { authStatus, offersLoading } = useAppSelector(selectAppLoadingState);

  if (offersLoading || authStatus === AuthorizationStatus.Unknown) {
    return <ClipLoader size={100} color="#4481c3" />;
  }
  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <TabsSection />
        <CitiesContainer />
      </main>
    </div>
  );
});

MainScreen.displayName = 'MainScreen';

export default MainScreen;
