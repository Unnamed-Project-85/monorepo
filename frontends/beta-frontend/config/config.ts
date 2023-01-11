import * as process from 'process'

export const NODE_ENV = process.env.NODE_ENV || ''

export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || ''
export const JWT_SECRET = process.env.JWT_SECRET || ''

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || ''
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_ID || ''

export const DEFAULT_USER_PICTURE_URL = '/img/anonymous.png'
export const DEFAULT_USER_LOCALE = process.env.DEFAULT_USER_LOCALE || 'en-US'

const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
export const API_HOST = `${BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL}`
export const AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID || ''
export const AUTH_CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET || ''
