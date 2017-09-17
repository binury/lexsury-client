/* eslint-disable import/prefer-default-export */
import decode from 'jwt-decode';

const checkAndPurgeGuestToken = () => {
  const email = decode(window.localStorage.getItem('LEXSECRET')).email;
  if (email.includes('@lxr.io')) {
    window.localStorage.removeItem('LEXSECRET');
    window.location.assign('/signup');
    return true;
  }
  return false;
};
export { checkAndPurgeGuestToken };
