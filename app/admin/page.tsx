'use client'

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Activity, Eye, MousePointerClick, RefreshCw, ShieldCheck, Users, LogOut } from 'lucide-react'

type Visitor = { visitorId: string; firstSeenAt: string; lastSeenAt: string; visitCount: number; userAgent: string | null; referrer: string | null; online: boolean }
type Click = { visitorId: string; clickedAt: string; pagePath: string }
type Dashboard = { totalVisitors: number; onlineNow: number; totalPurchaseClicks: number; visitors: Visitor[]; purchaseClicks: Click[] }

const date = (value: string) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium' }).format(new Date(value))
const shortId = (value: string) => value.slice(0, 8).toUpperCase()
const browser = (ua: string | null) => !ua ? 'Desconhecido' : /android/i.test(ua) ? 'Android' : /iphone|ipad/i.test(ua) ? 'iOS' : /windows/i.test(ua) ? 'Windows' : /macintosh|mac os/i.test(ua) ? 'Mac' : /linux/i.test(ua) ? 'Linux' : 'Outro dispositivo'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [logged, setLogged] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<Dashboard | null>(null)
  const [loading, setLoading] = useState(false)
  const [updated, setUpdated] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/analytics', { cache: 'no-store' })
      if (response.status === 401) { setLogged(false); return }
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Falha ao carregar dados')
      setData(result)
      setUpdated(new Date().toLocaleTimeString('pt-BR'))
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar painel')
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    if (!logged) return
    void load()
    const timer = window.setInterval(() => void load(), 15000)
    return () => window.clearInterval(timer)
  }, [logged, load])

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
    const result = await response.json()
    if (!response.ok) { setError(result.error || 'Não foi possível entrar'); return }
    setLogged(true)
    setPassword('')
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setLogged(false)
    setData(null)
  }

  return (
    <main className="min-h-screen bg-[#09090d] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        {!logged ? (
          <section className="mx-auto mt-20 max-w-sm rounded-2xl border border-white/10 bg-[#14131a] p-7 shadow-2xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/15 text-pink-300"><ShieldCheck /></div>
            <p className="text-xs font-semibold tracking-[.22em] text-pink-300">VICE CITY VAULT</p>
            <h1 className="mt-2 text-2xl font-bold">Painel administrativo</h1>
            <p className="mt-2 text-sm text-white/55">Acesso restrito. Informe sua senha para continuar.</p>
            <form onSubmit={login} className="mt-6 space-y-4">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha administrativa" autoComplete="current-password" required className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-3 outline-none focus:border-pink-400" />
              {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
              <button className="w-full rounded-lg bg-pink-500 px-4 py-3 font-bold text-black transition hover:bg-pink-400">Entrar</button>
            </form>
          </section>
        ) : (
          <>
            <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div><p className="text-xs font-bold tracking-[.22em] text-pink-300">VICE CITY VAULT</p><h1 className="mt-1 text-2xl font-bold sm:text-3xl">Visão geral</h1><p className="mt-1 text-sm text-white/50">Atualização automática a cada 15 segundos · Última: {updated || '—'}</p></div>
              <div className="flex gap-2">
                <button onClick={() => void load()} className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/5"><RefreshCw size={15} className={loading ? 'animate-spin' : ''}/> Atualizar</button>
                <button onClick={logout} className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/5"><LogOut size={15}/> Sair</button>
              </div>
            </header>
            {error && <p className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
            <section className="mb-8 grid gap-3 sm:grid-cols-3">
              <Stat icon={<Users/>} label="Visitantes únicos" value={data?.totalVisitors ?? '—'} />
              <Stat icon={<Activity/>} label="Online agora" value={data?.onlineNow ?? '—'} accent />
              <Stat icon={<MousePointerClick/>} label="Cliques em comprar" value={data?.totalPurchaseClicks ?? '—'} />
            </section>
            <section className="mb-8 overflow-hidden rounded-xl border border-white/10 bg-[#14131a]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><h2 className="flex items-center gap-2 font-semibold"><Eye size={17} className="text-pink-300"/> Visitantes recentes</h2><span className="text-xs text-white/45">Últimos 100</span></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-white/[.03] text-xs uppercase tracking-wider text-white/45"><tr><th className="px-5 py-3">Visitante</th><th className="px-5 py-3">Dispositivo</th><th className="px-5 py-3">Primeira visita</th><th className="px-5 py-3">Última atividade</th><th className="px-5 py-3">Visitas</th><th className="px-5 py-3">Status</th></tr></thead>
                  <tbody>{data?.visitors.map(v => <tr key={v.visitorId} className="border-t border-white/[.06]"><td className="px-5 py-3 font-mono text-xs">{shortId(v.visitorId)}</td><td className="px-5 py-3">{browser(v.userAgent)}</td><td className="px-5 py-3 text-white/65">{date(v.firstSeenAt)}</td><td className="px-5 py-3 text-white/65">{date(v.lastSeenAt)}</td><td className="px-5 py-3">{v.visitCount}</td><td className="px-5 py-3"><span className={v.online ? 'text-emerald-300' : 'text-white/40'}>{v.online ? '● Online' : '○ Offline'}</span></td></tr>)}</tbody>
                </table>
                {!data?.visitors.length && <p className="p-6 text-center text-sm text-white/45">Nenhum visitante registrado ainda.</p>}
              </div>
            </section>
            <section className="overflow-hidden rounded-xl border border-white/10 bg-[#14131a]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><h2 className="flex items-center gap-2 font-semibold"><MousePointerClick size={17} className="text-pink-300"/> Cliques no botão de compra</h2><span className="text-xs text-white/45">Últimos 100</span></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-white/[.03] text-xs uppercase tracking-wider text-white/45"><tr><th className="px-5 py-3">Visitante</th><th className="px-5 py-3">Data e hora</th><th className="px-5 py-3">Página</th></tr></thead><tbody>{data?.purchaseClicks.map((c, i) => <tr key={i} className="border-t border-white/[.06]"><td className="px-5 py-3 font-mono text-xs">{shortId(c.visitorId)}</td><td className="px-5 py-3 text-white/65">{date(c.clickedAt)}</td><td className="px-5 py-3 text-white/65">{c.pagePath}</td></tr>)}</tbody></table>
                {!data?.purchaseClicks.length && <p className="p-6 text-center text-sm text-white/45">Nenhum clique registrado ainda.</p>}
              </div>
            </section>
            <p className="mt-5 text-xs text-white/35">Visitantes são identificados por um código anônimo neste navegador. O painel não identifica nomes ou dados pessoais de quem apenas visita a loja.</p>
          </>
        )}
      </div>
    </main>
  )
}

function Stat({ icon, label, value, accent = false }: { icon: ReactNode; label: string; value: string | number; accent?: boolean }) {
  return <article className="rounded-xl border border-white/10 bg-[#14131a] p-5"><div className="flex items-center justify-between text-white/50"><span className="text-sm">{label}</span><span className={accent ? 'text-emerald-300' : 'text-pink-300'}>{icon}</span></div><p className="mt-3 text-3xl font-bold tabular-nums">{value}</p></article>
}
