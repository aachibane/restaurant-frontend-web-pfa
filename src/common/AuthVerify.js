import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = ({ logOut }) => {
  const location = useLocation();
  const logOutRef = useRef(logOut);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      const now = Date.now();
      if (decodedJwt.exp * 1000 < now) {
        logOutRef.current();
      }
    }
  }, [location]);

  return <div></div>;
};

AuthVerify.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default AuthVerify;
