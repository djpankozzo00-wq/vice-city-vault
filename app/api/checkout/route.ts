import { NextResponse } from 'next/server'

const API_BASE = 'https://api.syncpayments.com.br/api/partner/v1'
const PRODUCT_PRICE = 419.9

export async function POST(request: Request) {
  try {
    const clientId = process.env.SYNCPAY_CLIENT_ID
    const clientSecret = process.env.SYNCPAY_CLIENT_SECRET
    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'A integração ainda não está configurada no servidor.' }, { status: 503 })
    }

    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const cpf = typeof body.cpf === 'string' ? body.cpf.replace(/\D/g, '') : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.replace(/\D/g, '') : ''
    if (name.length < 3 || cpf.length !== 11 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 10 || phone.length > 13) {
      return NextResponse.json({ error: 'Confira nome, CPF, e-mail e telefone informados.' }, { status: 400 })
    }

    const authResponse = await fetch(API_BASE + '/auth-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret }),
      cache: 'no-store',
    })
    const authData = await authResponse.json().catch(() => ({}))
    if (!authResponse.ok || typeof authData.access_token !== 'string') {
      console.error('SyncPay auth failed:', authResponse.status, authData)
      return NextResponse.json({ error: 'Falha na autenticação SyncPay. Confira as credenciais e a autorização do IP do servidor.' }, { status: 502 })
    }

    const chargeResponse = await fetch(API_BASE + '/cash-in', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + authData.access_token, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        amount: PRODUCT_PRICE,
        description: 'Grand Theft Auto VI - pedido digital',
        client: { name, cpf, email, phone },
      }),
      cache: 'no-store',
    })
    const chargeData = await chargeResponse.json().catch(() => ({}))
    if (!chargeResponse.ok || typeof chargeData.pix_code !== 'string' || typeof chargeData.identifier !== 'string') {
      console.error('SyncPay cash-in failed:', chargeResponse.status, chargeData)
      return NextResponse.json({ error: 'A SyncPay não conseguiu gerar a cobrança. Confira os dados e tente novamente.' }, { status: 502 })
    }

    return NextResponse.json({ pixCode: chargeData.pix_code, identifier: chargeData.identifier })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Erro interno ao iniciar o pagamento.' }, { status: 500 })
  }
}
