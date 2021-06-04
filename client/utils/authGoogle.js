const getGoogleSigninUrl = () => {
  let oktaDomain = 'dev-50992024.okta.com';
  let idp = '0oalvcsv735tuaicF5d6';
  let googleClientId = '0oacfpvz1YDLAC7vt5d6';
  let redirectUrl = encodeURIComponent('http://localhost:3000/authorization-code/callback');
  return `https://${oktaDomain}/oauth2/default/v1/authorize?idp=${idp}&client_id=${googleClientId}&response_type=code&response_mode=fragment&scope=openid%20email%20profile&redirect_uri=${redirectUrl}&state=WM6D&nonce=YsG76jo`;
};

module.exports = getGoogleSigninUrl;


