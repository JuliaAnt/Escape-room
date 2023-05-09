import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../consts';
import MainPage from '../../pages/main-page/main-page';
import QuestPage from '../../pages/quest-page/quest-page';
import BookingPage from '../../pages/booking-page/booking-page';
import PrivateRouteBooking from '../private-route-booking/private-route-booking';
import PrivateRouteLogin from '../private-route-login/private-route-login';
import LoginPage from '../../pages/login-page/login-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Quest} element={<QuestPage />} />
          <Route path={AppRoute.Booking} element={
            <PrivateRouteBooking>
              <BookingPage />
            </PrivateRouteBooking>
          }
          />
          <Route path={AppRoute.Login} element={
            <PrivateRouteLogin>
              <LoginPage />
            </PrivateRouteLogin>
          }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
