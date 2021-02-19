const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const environmentVariables = {
  BASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  GOOGLE_CALLBACK_URL: `${BASE_URL}/auth/google/callback`,
}

const baseConfigs = {
  IS_PROD: process.env.NODE_ENV === 'production',
  AUTH_SCOPES: ['profile', 'email'],
}

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'qwer1234',
  resave: true,
  saveUninitialized: true,
}

export const config = {
  ...environmentVariables,
  ...baseConfigs,
  sessionConfig,
}
