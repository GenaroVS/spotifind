import express from 'express';
const okta = require('@okta/okta-sdk-nodejs')
const router = express.Router();
import axios from 'axios';

const client = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN
})

router.get('/', (req: any, res) => {
  if (req.userContext) {
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

router.post('/register', async (req, res) => {
  const { body } = req
  interface error {
    errorCode: number;
    errorSummary: string;
    errorLink: string;
    errorId: number;
    errorCauses?: object;
  }

  try {
    await client.createUser({
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

    res.redirect('/user')
  } catch ({ errorCauses }) {
    type errorsT = {
      [index:string]: string;
    }
    const errors: errorsT = {}

    errorCauses.forEach(({ errorSummary }: error) => {
      const [field, error] = /^(.+?): (.+)$/.exec(errorSummary)
      errors[field] = error
    })

    res.status(501).send(errors);
  }
})

module.exports = router