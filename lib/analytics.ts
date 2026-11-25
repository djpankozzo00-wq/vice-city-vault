import { NextResponse } from 'next/server'

const supabaseUrl = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function callAnalyticsRpc<T>(name: string, args: Record<string, unknown> = {}): Promise<T> {
  if (!supabaseUrl || !serviceKey) throw new Error('Analytics database is not configured')
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(args),
    cache: 'no-store',
  })
  if (!response.ok) {
    const detail = await response.text()
    console.error('Analytics RPC error:', name, response.status, detail)
    throw new Error('Analytics database request failed')
  }
  return response.json() as Promise<T>
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}
