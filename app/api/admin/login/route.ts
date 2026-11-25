import { NextRequest, NextResponse } from 'next/server'
import { createAdminSession, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const configured = process.env.ADMIN_PASSWORD
    if (!configured) return NextResponse.json({ error: 'A senha administrativa não está configurada no servidor.' }, { status: 503 })
    const body = await request.json()
    const password = typeof body.password === 'string' ? body.password : ''
    if (password !== configured) return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 })
    const session = createAdminSession()
    const response = NextResponse.json({ ok: true })
    response.cookies.set(ADMIN_COOKIE_NAME, session.value, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', path: '/', maxAge: session.maxAge,
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Não foi possível entrar.' }, { status: 400 })
  }
}
