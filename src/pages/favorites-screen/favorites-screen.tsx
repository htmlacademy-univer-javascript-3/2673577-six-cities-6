import {ListFavoritesCards} from '../../components/list-favorites-cards/list-favorites-cards.tsx';
import {Header} from '../../components/header/header.tsx';
import {useAppSelector} from '../../hooks';
import {selectFavorites} from '../../store/selectors.ts';

function FavoritesScreen() {
  const favorites = useAppSelector(selectFavorites);

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {favorites.length > 0 ? (
              <ListFavoritesCards offers={[...favorites].sort((a, b) => a.city.name.localeCompare(b.city.name))}/>
            ) : (
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="markup/main.html">
          <img className="footer__logo" src="markup/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
