import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { useAppSelector } from '../../hooks/redux-hooks';

type PrivateRouteLoginProps = {
  children: JSX.Element;
}

function PrivateRouteLogin(props: PrivateRouteLoginProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.NoAuth ? children : <Navigate to={AppRoute.Main} />
  );
}

export default PrivateRouteLogin;
