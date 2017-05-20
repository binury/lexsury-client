import React from 'react';

/*
 TODO:
 Redirect after logout to proc RouteName (Nav) change
 react-router forceRefresh maybe
 */
export default () => {
  window.localStorage.removeItem('LEXSECRET');
  return (
    <div>
      <h2>You have been signed out</h2>
    </div>
  );
};
