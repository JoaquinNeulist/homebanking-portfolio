import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const SecureRoute = ( route ) => {
  const loggedIn = useSelector(store => store.auth.loggedIn);

  return loggedIn && <Route key={route.key} path={route.path} element={route.element} /> 

};

export default SecureRoute;