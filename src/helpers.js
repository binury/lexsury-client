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

const checkAndStoreInvitation = () => {
  const urlParams = new window.URLSearchParams(window.location.search);
  if (urlParams.has('invite_code')) {
    window.localStorage.setItem('invite_code', urlParams.get('invite_code'));
  }
};

const getCookie = needle => document.cookie.split(';').map((cookiestring) => {
  const cs = cookiestring.trim().split('=');
  if (cs.length === 2) return { name: cs[0], value: cs[1] };
  return { name: '', value: '' };
}).filter(cookieObject => (cookieObject.name === needle))[0];

export { getToken, checkAndPurgeGuestToken, checkAndStoreInvitation, getCookie };
