import express from 'express';
const okta = require('@okta/okta-sdk-nodejs')
const router = express.Router();
import { insertUser } from '../../database/models';
import { addUserInfo } from '../middleware/extendUser';
import { OktaError } from '../types';

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

module.exports = router