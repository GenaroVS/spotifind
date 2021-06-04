import express = require('express');
import path = require('path');
const session = require('express-session');
const compression = require('compression');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const allowCrossOrigin = require('./middleware/allowCrossOrigin');
const app = express();
const rootPath = path.join(__dirname, '../');
const cacheOptions = {
  etag: true, // Just being explicit about the default.
  lastModified: true,  // Just being explicit about the default.
  setHeaders: (res: any, path: string) => {
    const hashRegExp = new RegExp('\\.[0-9a-f]{20}\\.');
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (hashRegExp.test(path)) {
      res.setHeader('Cache-Control', 'max-age=31536000');
    }
  }
}

app.use(allowCrossOrigin);
app.use(express.json());
app.use(compression());

app.use(session({
  secret: process.env.SESH_SECRET,
  resave: true,
  saveUninitialized: false,
}));

const oidc = new ExpressOIDC({
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  appBaseUrl: process.env.HOST_URL,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile'
})

app.use(oidc.router);

app.get('/authorization-code/callback', (req:any, res) => {
  res.redirect('/');
});

app.post('/logout', oidc.forceLogoutAndRevoke(), (req: any, res) => {
  if (req.userContext) {
    const idToken = req.userContext.tokens.id_token;
    const to = encodeURI(process.env.HOST_URL);
    const params = `id_token_hint=${idToken}&post_logout_redirect_uri=${to}`;
    req.logout();
    res.redirect(`${process.env.OKTA_ORG_URL}/oauth2/default/v1/logout?${params}`);
  } else {
    res.redirect('/user');
  }
});

app.use('/user', require('./routes/user'));
app.use('/api', require('./routes/api'));
app.use('/auth', oidc.ensureAuthenticated(), require('./routes/auth'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootPath, '../public'), cacheOptions));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(rootPath, '../public/index.html'));
  });
} else {
  app.use(express.static(path.join(rootPath, 'public'), cacheOptions));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(rootPath, 'public/index.html'));
  });
}

export = app;