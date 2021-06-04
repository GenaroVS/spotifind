import express from 'express';
import axios from 'axios';
const okta = require('@okta/okta-sdk-nodejs')
const OktaJwtVerifier = require('@okta/jwt-verifier');
const router = express.Router();
import { insertUser } from '../../database/models';
import { addUserInfo } from '../middleware/extendUser';
import { OktaError } from '../types';

const client = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN
})

const verifier = new OktaJwtVerifier({
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`
})

router.use(addUserInfo);

router.get('/', (req: any, res) => {
  if (req.userContext && req.user) {
    res.status(200).send({...req.userContext.userinfo, ...req.user});
  } else if (req.userContext) {
    res.status(200).send(req.userContext.userinfo);
  } else {
    res.status(200).send(false);
  }
});

// Take the user to the homepage if they're already logged in
router.use('/register', (req: any, res, next) => {
  if (req.userContext) {
    return res.redirect('/user')
  }
  next()
});

router.post('/register', async (req: any, res: any) => {
  const { body } = req

  try {
    var user = await client.createUser({
      profile: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        login: body.email
      },
      credentials: {
        password: {
          value: body.password
        }
      }
    })

    await insertUser({ id: user.id, status: user.status, ...user.profile });
    res.status(200).send('Registration Complete: please login');
  } catch (err) {
    const errors: string[] = []

    if (err.errorCauses) {
      err.errorCauses.forEach(({ errorSummary }: OktaError) => {
        errors.push(errorSummary)
      });
    } else {
      console.error(err);
    };

    res.status(200).send(errors);
  }
})

router.post('/social', async (req: any, res) => {
  let { code } = req.body;

  try {
    let { data } = await axios({
      method: 'post',
      url: `${process.env.OKTA_ORG_URL}/oauth2/default/v1/token`,
      params: {
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
        code: code
      },
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.OKTA_CLIENT_ID+':'+process.env.OKTA_CLIENT_SECRET)
          .toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });
    let { claims } = await verifier.verifyIdToken(data.id_token, process.env.OKTA_CLIENT_ID, 'YsG76jo');
    //await insertUser({ id: claims.sub, status: user.status, ...user.profile });
    res.status(200).redirect(process.env.HOST_URL);
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else if (error.message) {
      console.error('Error', error.message);
    } else {
      console.error('Error', error);
    }
    res.status(500).redirect(process.env.HOST_URL);
  }

});

module.exports = router;

// CLIENT SIDE SOCIAL LOGIN CODE
/* let authCodeRegex = new RegExp(/((?<=#code=)[0-9a-zA-Z_\-\.]*)|((?<=state=)[a-zA-z0-9_-]*)/, 'g');
    let matches = window.location.href.match(authCodeRegex);
    if (matches) {
      await axios.post('/user/social', {
        code: matches[0],
        state: matches[1]
      })
        .catch(err => console.error(err));
    } */