/* eslint-disable import/prefer-default-export */
import decode from 'jwt-decode';

const getToken = () => window.localStorage.getItem('LEXSECRET');

const checkAndPurgeGuestToken = () => {
  if (!getToken()) return false;
  const email = decode(getToken()).email;
  if (email == null) {
    localStorage.removeItem('LEXSECRET');
    window.location.assign('/login');
    return false;
  }
  if (email.includes('@lxr.io')) {
    window.localStorage.removeItem('LEXSECRET');
    window.location.assign('/signup');
    return true;
  }
  return false;
};
export { checkAndPurgeGuestToken };
