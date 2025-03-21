import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute, AuthStatus } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

type AppProps = {
  offers: Offer[];
  reviews: Review[];
};

function App({ offers, reviews }: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.root}
          element={
            <MainPage offers={offers} authorizationStatus={AuthStatus.Auth} />
          }
        />
        <Route
          path={`${AppRoute.offer}/:id`}
          element={
            <OfferPage
              offers={offers}
              reviews={reviews}
              authorizationStatus={AuthStatus.Auth}
            />
          }
        />
        <Route
          path={AppRoute.favorites}
          element={
            <PrivateRoute authorizationStatus={AuthStatus.Auth}>
              <FavoritesPage
                offers={offers}
                authorizationStatus={AuthStatus.Auth}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.login}
          element={<LoginPage authorizationStatus={AuthStatus.Auth} />}
        />
        <Route
          path={AppRoute.notFound}
          element={<NotFoundPage type="page" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
