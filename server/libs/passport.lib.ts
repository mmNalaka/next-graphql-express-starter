import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2'

import { config } from '../../config/app-config'
import { db } from '../../db/db-client'

const authOptions: GoogleStrategy.StrategyOptionsWithRequest = {
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: config.GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
}

const authVerifyCallback = async (
  _request: any,
  _accessToken: any,
  _refreshToken: any,
  profile: any,
  done: any
) => {
  if (profile._json.domain !== 'izettle.com') {
    return done('Unauthorized: Not an organization member!')
  }

  const now = new Date()
  const user = await db.user.upsert({
    where: {
      email: profile.email,
    },
    update: {
      picture: profile.picture,
      lastLoggedIn: now.toISOString(),
    },
    create: {
      email: profile.email,
      firstName: profile.given_name,
      lastName: profile.family_name,
      picture: profile.picture,
      lastLoggedIn: now.toISOString(),
    },
  })
  return done(null, user)
}

passport.use(new GoogleStrategy.Strategy(authOptions, authVerifyCallback))

passport.serializeUser((profile, done) => {
  done(null, profile)
})
passport.deserializeUser(async (profile: any, done) => {
  const user = await db.user.findUnique({ where: { email: profile.email } })
  done(null, user)
})

// Helper functions
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/google')
}

const initGoogleAuth = () =>
  passport.authenticate('google', { scope: ['email', 'profile'] })

const handleGoogleAuthCallback = () =>
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google',
  })
;(_req: Request, res: Response) => {
  res.redirect('/')
}

const passportUtils = {
  isAuthenticated,
  initGoogleAuth,
  handleGoogleAuthCallback,
}

export { passport, passportUtils }
