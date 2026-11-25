import { NextResponse } from 'next/server'
import { callAnalyticsRpc } from '@/lib/analytics'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const visitorId = typeof body.visitorId === 'string' ? body.visitorId : ''
    if (!/^[a-f0-9-]{36}$/i.test(visitorId)) return NextResponse.json({ error: 'Invalid visitor id' }, { status: 400 })
    await callAnalyticsRpc('vcv_track_visitor', {
      p_visitor_id: visitorId,
      p_user_agent: request.headers.get('user-agent') || null,
      p_referrer: typeof body.referrer === 'string' ? body.referrer.slice(0, 1000) : null,
    })
    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: 'Analytics unavailable' }, { status: 503 })
  }
}
