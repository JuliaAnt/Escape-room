import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { useAppSelector } from '../../hooks/redux-hooks';

type PrivateRouteBookedQuestsProps = {
  children: JSX.Element;
}

function PrivateRouteBookedQuests(props: PrivateRouteBookedQuestsProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRouteBookedQuests;
