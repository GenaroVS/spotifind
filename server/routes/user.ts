import express from 'express';
const okta = require('@okta/okta-sdk-nodejs')
const router = express.Router();
import { addUserInfo } from '../middleware/extendUser';

const client = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN
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
    const errors: string[] = []

    errorCauses.forEach(({ errorSummary }: error) => {
      errors.push(errorSummary)
    })

    res.status(200).send(errors);
  }
})

module.exports = router