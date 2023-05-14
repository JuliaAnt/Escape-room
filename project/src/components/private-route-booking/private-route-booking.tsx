import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { useAppSelector } from '../../hooks/redux-hooks';

type PrivateRouteBookingProps = {
  children: JSX.Element;
}

function PrivateRouteBooking(props: PrivateRouteBookingProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRouteBooking;
