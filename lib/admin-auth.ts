import { createHmac, timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'vcv_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 12

function signature(timestamp: string) {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) throw new Error('Admin password is not configured')
  return createHmac('sha256', secret).update(timestamp).digest('hex')
}

export function createAdminSession() {
  const timestamp = String(Math.floor(Date.now() / 1000))
  return { value: `${timestamp}.${signature(timestamp)}`, maxAge: SESSION_TTL_SECONDS }
}

export function isAdminRequest(request: NextRequest) {
  try {
    if (!process.env.ADMIN_PASSWORD) return false
    const value = request.cookies.get(COOKIE_NAME)?.value
    if (!value) return false
    const [timestamp, supplied] = value.split('.')
    if (!timestamp || !supplied || !/^\d+$/.test(timestamp)) return false
    const age = Math.floor(Date.now() / 1000) - Number(timestamp)
    if (age < 0 || age > SESSION_TTL_SECONDS) return false
    const expected = signature(timestamp)
    const a = Buffer.from(supplied)
    const b = Buffer.from(expected)
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME
