'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Check, Copy, LoaderCircle, LockKeyhole, X } from 'lucide-react'

type PixResult = { pixCode: string; identifier: string }

export default function CheckoutModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pix, setPix] = useState<PixResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(30)

  useEffect(() => {
    const show = () => {
      setOpen(true)
      setError('')
      setPix(null)
      setCopied(false)
      setSecondsLeft(30)
    }
    window.addEventListener('open-checkout', show)
    return () => window.removeEventListener('open-checkout', show)
  }, [])

  useEffect(() => {
    if (!pix || secondsLeft <= 0) return
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [pix, secondsLeft > 0])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const form = new FormData(event.currentTarget)
    const payload = {
      name: String(form.get('name') || '').trim(),
      cpf: String(form.get('cpf') || '').replace(/\\D/g, ''),
      email: String(form.get('email') || '').trim(),
      phone: String(form.get('phone') || '').replace(/\\D/g, ''),
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível gerar o Pix. Tente novamente.')
      setPix({ pixCode: data.pixCode, identifier: data.identifier })
      setSecondsLeft(30)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao gerar o Pix.')
    } finally {
      setLoading(false)
    }
  }

  async function copyPix() {
    if (!pix || secondsLeft <= 0) return
    try {
      await navigator.clipboard.writeText(pix.pixCode)
      setCopied(true)
    } catch {
      setError('Não foi possível copiar automaticamente. Selecione e copie o código Pix.')
    }
  }

  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={() => setOpen(false)}>
      <section className="checkout-modal checkout-modal-wide" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={() => setOpen(false)} aria-label="Fechar"><X size={18} /></button>
        <span className="edition-overline">COMPRA DIGITAL · PAGAMENTO VIA PIX</span>
        {!pix ? (
          <>
            <h2 id="checkout-title">Finalize sua<br /><em>compra.</em></h2>
            <p>Informe seus dados para gerar a cobrança Pix. Após a confirmação do pagamento, o código de resgate será enviado para o e-mail informado. Valor promocional: R$ 289,90.</p>
            <form className="checkout-form" onSubmit={submit}>
              <label>Nome completo<input name="name" autoComplete="name" required minLength={3} placeholder="Seu nome completo" /></label>
              <label>CPF<input name="cpf" inputMode="numeric" autoComplete="off" required minLength={11} maxLength={14} placeholder="000.000.000-00" /></label>
              <label>E-mail<input name="email" type="email" autoComplete="email" required placeholder="voce@email.com" /></label>
              <label>Telefone<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={15} placeholder="(00) 00000-0000" /></label>
              <div className="modal-total"><span>Grand Theft Auto VI · Código digital</span><strong>R$ 289,90</strong></div>
              {error && <p className="checkout-error" role="alert">{error}</p>}
              <button className="button button-buy" type="submit" disabled={loading}>
                {loading ? <>Gerando Pix <LoaderCircle className="spin" size={16} /></> : <>Gerar Pix <LockKeyhole size={16} /></>}
              </button>
            </form>
            <span className="modal-footnote"><LockKeyhole size={13} /> Confira seu e-mail: é nele que você receberá o código de resgate após a confirmação do pagamento.</span>
          </>
        ) : (
          <>
            <h2 id="checkout-title">Pix <em>gerado.</em></h2>
            {secondsLeft > 0 ? (
              <>
                <p>Escaneie o QR Code ou copie o código Pix. Após a confirmação do pagamento, o código do jogo será enviado para o e-mail informado no pedido.</p>
                <div className="pix-countdown" role="timer" aria-live="off">Expira em <strong>00:{String(secondsLeft).padStart(2, '0')}</strong></div>
                <div className="pix-qr">
                  <img src={'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' + encodeURIComponent(pix.pixCode)} alt="QR Code para pagamento Pix" />
                </div>
                <label className="pix-code-label">PIX COPIA E COLA<textarea readOnly value={pix.pixCode} rows={4} /></label>
                <button className="button button-buy" type="button" onClick={copyPix}>{copied ? <>Copiado <Check size={16} /></> : <>Copiar código Pix <Copy size={16} /></>}</button>
              </>
            ) : (
              <p className="pix-expired" role="status">Tempo esgotado. Esta cobrança expirou nesta tela.</p>
            )}
            <span className="modal-footnote">Identificador do pedido: {pix.identifier}</span>
          </>
        )}
      </section>
    </div>
  )
}
