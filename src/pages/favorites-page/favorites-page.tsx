import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import OfferCard from '../../components/offer-card/offer-card';
import { AuthStatus } from '../../const';
import { Offer } from '../../types/offer';
import { groupOffersByLocation } from '../../utils/offer';

type FavoritesPageProps = {
  offers: Offer[];
  authorizationStatus: AuthStatus;
};

function FavoritesPage({ offers, authorizationStatus }: FavoritesPageProps) {
  const favorites = offers.filter((item) => item.isFavorite);
  const favoritesByLocation = groupOffersByLocation(favorites);

  return (
    <div className="page">
      <Header isAuth={authorizationStatus} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByLocation).map(
                ([location, groupedOffers]) => (
                  <li className="favorites__locations-items" key={location}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{location}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {groupedOffers.map((offer) => (
                        <OfferCard
                          key={offer.id}
                          offer={offer}
                          block="favorites"
                          size="small"
                        />
                      ))}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
