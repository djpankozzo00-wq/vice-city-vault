import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { callAnalyticsRpc } from '@/lib/analytics'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  try {
    const data = await callAnalyticsRpc('vcv_admin_analytics')
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
  } catch {
    return NextResponse.json({ error: 'Não foi possível carregar as estatísticas. Verifique a configuração do Supabase.' }, { status: 503 })
  }
}
