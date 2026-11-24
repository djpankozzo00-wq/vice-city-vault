'use client'

import CheckoutModal from './components/checkout-modal'
import { ArrowDown, ArrowRight, Check, ChevronDown, Gamepad2, LockKeyhole, ShieldCheck, Mail, CheckCircle2, AlertTriangle } from 'lucide-react'

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
    <main onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()}>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Vice City Games — início"><img src="/gta-6-logo.png" alt="Grand Theft Auto VI" /></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#sobre">O jogo</a>
          <a href="#galeria">Galeria</a>
          <a href="#edicao">Edição digital</a>
        </nav>
        <a className="header-cta" href="#edicao">Comprar <ArrowRight size={15} /></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" role="img" aria-label="Jason e Lucia em um carro, com a paisagem ensolarada de Vice City ao fundo" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-line" /> O jogo já está disponível</div>
          <p className="hero-kicker">Bem-vindo ao estado de</p>
          <h1>VICE<br /><span>CITY</span></h1>
          <p className="hero-copy">Uma cidade. Duas histórias. Um mundo sem limites.</p>
          <a className="button button-primary" href="#edicao">Compre sua cópia <ArrowRight size={17} /></a>
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
            <div className="release-note"><span className="pulse-dot" /> Grand Theft Auto VI <span className="note-divider">/</span> Já disponível para jogar</div>
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
            <p className="edition-description">Grand Theft Auto VI já está disponível. Escolha sua plataforma e receba o código digital de resgate por e-mail após a confirmação do pagamento.</p>
            <ul className="edition-includes">
              <li><Check size={16} /> Versão digital completa</li>
              <li><Check size={16} /> Código enviado por e-mail após confirmação do Pix</li>
              <li><Check size={16} /> Pagamento seguro no checkout</li>
            </ul>
            <div className="price-row"><div><span className="price-label">PREÇO ESPECIAL</span><p className="price"><del className="old-price">R$ 419,90</del><span className="current-price">R$ 289,90</span></p></div><span className="platform-tag"><Gamepad2 size={14} /> PS5 • XBOX SERIES X|S</span></div>
            <button className="button button-buy" onClick={() => window.dispatchEvent(new Event("open-checkout"))}>Comprar agora <ArrowRight size={17} /></button>
            <div className="secure-note"><LockKeyhole size={13} /> Checkout processado com segurança</div>
          </div>
        </div>
        <div className="trust-row">
          <div><ShieldCheck size={17} /><span>Compra protegida</span></div>
          <div><LockKeyhole size={17} /><span>Pagamento seguro</span></div>
          <div><Gamepad2 size={17} /><span>Produto digital</span></div>
        </div>
      </section>


      <section className="email-preview-section section-wrap" id="entrega">
        <div className="section-label"><span>04 / COMO VOCÊ VAI RECEBER</span><span className="label-line" /></div>
        <div className="email-preview-heading">
          <div>
            <h2>Seu código<br /><em>chega por e-mail.</em></h2>
            <p>Depois que o pagamento for confirmado, enviaremos o código de resgate para o e-mail informado na compra. Veja um exemplo de como a mensagem será apresentada:</p>
          </div>
          <span className="email-preview-badge"><Mail size={15} /> EXEMPLO DE E-MAIL</span>
        </div>
        <div className="email-mockup">
          <div className="email-window-top"><span className="email-window-dots"><i /><i /><i /></span><span>Caixa de entrada</span><span className="email-window-icon"><Mail size={15} /></span></div>
          <div className="email-message">
            <div className="email-sender-row"><div className="email-avatar"><img src="/gta-6-logo.png" alt="Logotipo Vice City Vault" /></div><div className="email-sender"><strong>Vice City Vault</strong><span>para você</span></div><span className="email-time">Agora</span></div>
            <div className="email-subject">Seu código de resgate chegou!</div>
            <div className="email-body">
              <p>Olá!</p>
              <p>Seu pagamento foi confirmado. Agradecemos pela sua compra! Aqui está o seu código de resgate do <strong>Grand Theft Auto VI</strong>:</p>
              <div className="redeem-code"><span>CÓDIGO DE RESGATE</span><strong>XXXX-XXXX-XXXX-XXXX</strong></div>
              <p>Use este código na plataforma correspondente para resgatar seu jogo. Confira se a plataforma e a região são compatíveis com sua conta.</p>
              <div className="email-success"><CheckCircle2 size={16} /> Pagamento confirmado</div>
              <p className="email-signature">Atenciosamente,<br /><strong>Equipe Vice City Vault</strong></p>
            </div>
          </div>
        </div>
        <p className="email-preview-disclaimer">Esta imagem é apenas uma demonstração. O código real será enviado somente após a confirmação do pagamento.</p>
      </section>

      <section className="faq section-wrap">
        <div className="section-label"><span>05 / ANTES DE COMPRAR</span><span className="label-line" /></div>
        <h2>Informações<br /><em>importantes.</em></h2>
        <details><summary>Como recebo meu código? <ChevronDown size={17} /></summary><p>Após a confirmação do pagamento via Pix, o código digital de resgate será enviado para o endereço de e-mail informado no checkout. Confira se o e-mail foi digitado corretamente e verifique também a caixa de spam.</p></details>
        <details><summary>Para qual plataforma é o jogo? <ChevronDown size={17} /></summary><p>O jogo está disponível para PlayStation 5 e Xbox Series X|S. Antes de pagar, confirme com o vendedor qual plataforma corresponde ao código que você está comprando e se a região é compatível com sua conta.</p></details>
        
      </section>

      <footer className="site-footer"><a className="wordmark" href="#inicio" aria-label="Vice City Games — início"><img src="/gta-6-logo.png" alt="Grand Theft Auto VI" /></a><span>© 2026 VICE CITY GAMES</span></footer>

      <aside className="stock-alert" role="status" aria-label="Aviso de estoque">
        <div className="stock-alert-icon"><AlertTriangle size={22} /></div>
        <div className="stock-alert-copy">
          <strong>ÚLTIMAS UNIDADES DO GTA 6!</strong>
          <span>O estoque de códigos de resgate está chegando ao fim!</span>
          <span>Garanta o seu hoje mesmo antes que esgote!</span>
          <a href="#edicao">GARANTIR MEU CÓDIGO <ArrowRight size={14} /></a>
        </div>
      </aside>
      <CheckoutModal />
    </main>
  )
}
