import React from 'react';

// TODO: Redirect after logout to proc RouteName (Nav) change
export default () => {
  window.localStorage.removeItem('LEXSECRET');
  return (
    <div>
      <h2>You have been signed out</h2>
    </div>
  );
};
