import {Navigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import classNames from 'classnames';
import {ClipLoader} from 'react-spinners';
import {OfferReviewForm} from '../../components/offer-review-form/offer-review-form.tsx';
import {OfferListReviews} from '../../components/offer-list-reviews/offer-list-reviews.tsx';
import {ListCitiesCards} from '../../components/list-cities-cards/list-cities-cards.tsx';
import CityMap from '../../components/map/map.tsx';
import {OfferListItems} from '../../types/offer-list-item.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOfferAction, fetchOfferNeighbourhoodAction, fetchReviewAction} from '../../store/api-actions.ts';
import {Header} from '../../components/header/header.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {selectAuthorizationStatus, selectIsOfferLoading, selectOffer, selectOfferError, selectOfferNeighborhood, selectReviews} from '../../store/selectors.ts';

type OfferScreenProps = {
  offers: OfferListItems;
}

function OfferScreen({offers}: OfferScreenProps) {
  const {id} = useParams<{ id: string }>();

  const currentOffer = useAppSelector(selectOffer);
  const offerLoading = useAppSelector(selectIsOfferLoading);
  const offerError = useAppSelector(selectOfferError);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const reviews = useAppSelector(selectReviews);
  const offerNeighbourhood = useAppSelector(selectOfferNeighborhood);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviewAction(id));
    dispatch(fetchOfferAction(id));
    dispatch(fetchOfferNeighbourhoodAction(id));
  }, [dispatch, id]);

  if (!offerLoading && offerError) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (offerLoading || !currentOffer) {
    return <ClipLoader size={100} color="#4481c3" />;
  }

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer?.images.map((image) => (
                <div className="offer__image-wrapper" key={image}><img className="offer__image" src={image} alt="Photo studio"/>
                </div>))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer?.isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer?.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  {currentOffer && <span style={{width: `${currentOffer?.rating * 20}%`}}></span>}
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer?.type && currentOffer.type.charAt(0).toUpperCase() + currentOffer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer?.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer?.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={classNames(
                    'offer__avatar-wrapper',
                    'user__avatar-wrapper',
                    { 'offer__avatar-wrapper--pro': currentOffer?.host.isPro }
                  )}
                  >
                    <img className="offer__avatar user__avatar" src={currentOffer?.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {currentOffer?.host.name}
                  </span>
                  <span className="offer__user-status">
                    {currentOffer?.host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer?.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <OfferListReviews reviews={reviews}/>
                {authorizationStatus === AuthorizationStatus.Auth && <OfferReviewForm offerId={currentOffer.id}/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <CityMap screen='offer' offers={offers} selectedOffer={currentOffer}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <ListCitiesCards offers={offerNeighbourhood} className={'near-places'}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
