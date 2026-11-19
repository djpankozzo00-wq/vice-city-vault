'use client'

import CheckoutModal from './components/checkout-modal'
import { ArrowDown, ArrowRight, Check, ChevronDown, Gamepad2, LockKeyhole, ShieldCheck } from 'lucide-react'

const gallery = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5fb9e793-f0ba-44c6-98a9-02be26b80b0a-pFHjXNfXl8NDg6NI7ziSS71hB7fGmy.jpg',
    alt: 'Lucia e Jason dentro de um conversível azul em Vice City',
    className: 'gallery-wide',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0e8d8f5d-d255-4215-bc02-9b5d13e484d7-6kr0MerzihgK0UNMVLHuo3KOnA9sAk.jpg',
    alt: 'Posto de gasolina iluminado por neon ao entardecer em Vice City',
    className: '',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_938b033e-d9b9-41f9-baa6-c5a79f7563b4-soJiBYqgU6HQHe5qo03Si9ZPyJLB0q.jpg',
    alt: 'Perseguição policial pelas ruas ensolaradas de Vice City',
    className: '',
  },
]

export default function Page() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Vice City Games — início"><img src="/gta-6-logo.svg" alt="Grand Theft Auto VI" /></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#sobre">O jogo</a>
          <a href="#galeria">Galeria</a>
          <a href="#edicao">Edição digital</a>
        </nav>
        <a className="header-cta" href="#edicao">Pré-venda <ArrowRight size={15} /></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" role="img" aria-label="Jason e Lucia em um carro, com a paisagem ensolarada de Vice City ao fundo" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-line" /> A próxima grande aventura começa aqui</div>
          <p className="hero-kicker">Bem-vindo ao estado de</p>
          <h1>VICE<br /><span>CITY</span></h1>
          <p className="hero-copy">Uma cidade. Duas histórias. Um mundo sem limites.</p>
          <a className="button button-primary" href="#edicao">Garanta sua cópia <ArrowRight size={17} /></a>
          <a className="scroll-cue" href="#sobre"><ArrowDown size={15} /> Explore o jogo</a>
        </div>
        <div className="hero-index"><span>01</span><i /> 04</div>
        <div className="hero-caption">LEONIDA, USA <span>·</span> 2026</div>
      </section>

      <section className="intro section-wrap" id="sobre">
        <div className="section-label"><span>01 / O JOGO</span><span className="label-line" /></div>
        <div className="intro-grid">
          <h2>O sonho<br />americano.<br /><em>Sem filtros.</em></h2>
          <div className="intro-copy">
            <p>Vice City é mais do que um lugar — é um estado de espírito. Entre praias douradas, noites elétricas e oportunidades perigosas, cada escolha pode mudar tudo.</p>
            <p>Conheça Lucia e Jason: dois parceiros tentando sobreviver em um mundo que nunca joga limpo.</p>
            <div className="release-note"><span className="pulse-dot" /> Grand Theft Auto VI <span className="note-divider">/</span> Uma nova era está chegando</div>
          </div>
        </div>
      </section>

      <section className="gallery-section" id="galeria">
        <div className="gallery-heading section-wrap">
          <div className="section-label"><span>02 / PRIMEIRO OLHAR</span><span className="label-line" /></div>
          <h2>Viva o lado<br /><em>ensolarado.</em></h2>
          <p>Do brilho do litoral às ruas que nunca dormem.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <figure className={`gallery-card ${image.className}`} key={image.src}>
              <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} />
              <figcaption><span>VICE CITY / 0{index + 1}</span><span>LEONIDA</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="edition section-wrap" id="edicao">
        <div className="section-label"><span>03 / SUA PRÓXIMA AVENTURA</span><span className="label-line" /></div>
        <div className="edition-card">
          <div className="edition-art">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4db56f3d-ac82-4d97-8345-8831580ad121-5OojzS1VnzwQKCIqsePxktRFHMkxpA.jpg" alt="Arte ilustrada de Grand Theft Auto VI com personagens e cenas de Vice City" loading="lazy" />
            <div className="edition-art-shade" />
            <span className="edition-stamp">EDIÇÃO<br />DIGITAL</span>
          </div>
          <div className="edition-details">
            <span className="edition-overline">GRAND THEFT AUTO VI</span>
            <h2>Seu lugar<br />é em Vice City.</h2>
            <p className="edition-description">Prepare-se para descobrir uma história inesquecível em um mundo aberto extraordinário.</p>
            <ul className="edition-includes">
              <li><Check size={16} /> Jogo digital completo</li>
              <li><Check size={16} /> Código de resgate enviado após confirmação</li>
              <li><Check size={16} /> Pagamento seguro via SyncPay</li>
            </ul>
            <div className="price-row"><div><span className="price-label">PREÇO ESPECIAL</span><p className="price">R$ 419<span>,90</span></p></div><span className="platform-tag"><Gamepad2 size={14} /> PLATAFORMA A CONFIRMAR</span></div>
            <button className="button button-buy" onClick={() => window.dispatchEvent(new Event("open-checkout"))}>Comprar agora <ArrowRight size={17} /></button>
            <div className="secure-note"><LockKeyhole size={13} /> Checkout processado com segurança <span>·</span> SyncPay</div>
          </div>
        </div>
        <div className="trust-row">
          <div><ShieldCheck size={17} /><span>Compra protegida</span></div>
          <div><LockKeyhole size={17} /><span>Pagamento seguro</span></div>
          <div><Gamepad2 size={17} /><span>Produto digital</span></div>
        </div>
      </section>

      <section className="faq section-wrap">
        <div className="section-label"><span>04 / ANTES DE COMPRAR</span><span className="label-line" /></div>
        <h2>Informações<br /><em>importantes.</em></h2>
        <details><summary>Como recebo meu código? <ChevronDown size={17} /></summary><p>O código digital será enviado após a confirmação do pagamento. Os detalhes de entrega serão informados antes da finalização da compra.</p></details>
        <details><summary>Para qual plataforma é o jogo? <ChevronDown size={17} /></summary><p>A plataforma e a região de resgate precisam ser confirmadas pelo vendedor antes da compra. Confira essas informações no checkout.</p></details>
        <details><summary>O pagamento já está disponível? <ChevronDown size={17} /></summary><p>O pagamento é feito via Pix. Após pagar, aguarde a conferência manual do vendedor para receber seu código digital.</p></details>
      </section>

      <footer className="site-footer"><a className="wordmark" href="#inicio" aria-label="Vice City Games — início"><img src="/gta-6-logo.svg" alt="Grand Theft Auto VI" /></a><p>Uma loja independente. Grand Theft Auto e GTA são marcas de seus respectivos proprietários. Esta página não é afiliada nem endossada pela Rockstar Games.</p><span>© 2026 VICE CITY GAMES</span></footer>

      <CheckoutModal />
    </main>
  )
}
