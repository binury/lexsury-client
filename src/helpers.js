/* eslint-disable import/prefer-default-export */
import decode from 'jwt-decode';

const URL = (process.env.NODE_ENV === 'production') ?
  process.env.PUBLIC_URL :
  'http://localhost:3030';
const getToken = () => window.localStorage.getItem('LEXSECRET');
const remToken = () => localStorage.removeItem('LEXSECRET');
const remCookie = () => {
  document.cookie = 'lexsury-jwt="";expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

const checkAndPurgeGuestToken = () => {
  if (!getToken()) return;
  let email;

  try {
    email = decode(getToken()).email;
  } catch (e) {
    // Malformed normal user
    remToken();
    remCookie();
    window.location.assign('/login');
    return;
  }
  // Guest users
  if (email.includes('@lxr.io') || email == null) {
    remToken();
    remCookie();
    window.location.assign('/signup');
  }
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

export {
  getToken,
  remToken,
  checkAndPurgeGuestToken,
  checkAndStoreInvitation,
  getCookie,
  remCookie,
  URL,
};
