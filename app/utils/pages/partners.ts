import type { Component } from 'vue'
import {
  PhCoins, PhDrop, PhHandCoins, PhMegaphone, PhPaintBrush, PhRocketLaunch, PhSliders, PhSmiley, PhTreeStructure
} from '@phosphor-icons/vue'

export interface PtFeature { title: string, body: string, icon: Component }
export interface PtStep { n: string, title: string, body: string }
export interface PtAccount { name: string, deposit: string, markets: string, features: string[] }
export interface PtHeadCopy { eyebrow: string, title: string, em?: string, lead?: string }

export const PT_ACCOUNTS: PtAccount[] = [
  { name: 'Core Account', deposit: '$50+', markets: 'FX, Metals, Indices, Commodities, Equities, Cryptos', features: ['nTrader Platform', 'Leverage 1:400', '24/7 technical support', 'Personal training', 'Stop out level 30%'] },
  { name: 'Edge Account', deposit: '$10K+', markets: 'FX, Metals, Indices, Commodities, Equities, Cryptos', features: ['nTrader Platform', 'Leverage 1:200', '24/7 technical support', 'Personal training', 'Stop out level 30%'] },
  { name: 'Elite Account', deposit: '$25K+', markets: 'FX, Metals, Indices, Commodities, Equities, Cryptos', features: ['nTrader Platform', 'Leverage 1:100', '24/7 technical support', 'Personal training', 'Stop out level 30%'] }
]

export const IB = {
  seo: {
    title: 'Introducing Broker Program | Artix Global',
    description: 'Join the Artix Global Introducing Broker program: competitive commissions, flexible payouts, multi-level sub-IB networks and marketing support.'
  },
  hero: {
    eyebrow: 'Partner with us',
    title: 'Step into your',
    em: 'trading business',
    lead: 'Step into the Artix Global Introducing Broker Program and turn connections into opportunities. Whether you are an individual entrepreneur or an established group, this partnership offers limitless earning potential, unmatched support, and a proven platform for long-term success.',
    cta: 'Join as IB Partner'
  },
  intro: {
    head: { eyebrow: 'Introducing Broker', title: 'A rewarding partnership designed to maximize success for every', em: 'Introducing Broker' } as PtHeadCopy,
    body: [
      'Join Artix Global and gain access to a powerful Introducing Broker (IB) program built on integrity, transparency, and competitive rewards.',
      'At Artix Global, the Introducing Broker Program is not just another partnership. It is a powerful opportunity to build a sustainable business. With competitive commissions, transparent reporting, and dedicated guidance, you gain the tools and trust needed to expand your network.',
      'By offering clients access to world-class trading conditions and diverse instruments, you stand out as a reliable partner. Our program is built on innovation, integrity, and growth, ensuring your success is always aligned with ours.'
    ],
    img: { src: '/img/partners/ib-chart.webp', w: 1200, h: 1200, alt: 'Artix Global Introducing Broker program chart' }
  },
  offer: {
    head: { eyebrow: 'Our partnership service', title: 'What we', em: 'offer' } as PtHeadCopy,
    items: [
      { title: 'Passive Income', body: 'Convert your network into clients. Refer traders to us and build a sub-IB team for even higher earnings.', icon: PhCoins },
      { title: 'No Trading Stress', body: 'You earn commissions on all trading activity from your referred clients, not just specific trade types.', icon: PhSmiley },
      { title: 'Flexible Payout', body: 'Choose the payout that suits you: a spread part, fixed rebates, revenue sharing, or CPA (one-time payout).', icon: PhHandCoins },
      { title: 'Multi-Level Networks', body: 'Earn from the trading activity of sub-IBs. A multilayer network creates a significant income multiplier.', icon: PhTreeStructure },
      { title: 'Sales Marketing Support', body: 'Access ready-to-use marketing materials and co-branded materials to help with account management and leads.', icon: PhMegaphone }
    ] as PtFeature[]
  },
  band: {
    eyebrow: 'IB program',
    title: 'Earn extra income by introducing clients to',
    em: 'Artix',
    lead: 'The IB program is an ideal way to increase your ability to grow your client base and receive compensation.',
    cta: 'Join as IB Partner'
  },
  steps: {
    head: { eyebrow: 'Introducing Broker', title: 'How to become a', em: 'partner' } as PtHeadCopy,
    items: [
      { n: '01', title: 'Submit your application', body: 'Fill out the online application form with your basic information. If possible, briefly describe your target audience.' },
      { n: '02', title: 'Verify ID and access your partner dashboard', body: 'Once your application is reviewed and approved, you will need to complete a standard KYC (Know Your Customer) process.' },
      { n: '03', title: 'Promote, earn and withdraw commissions', body: 'Share your unique referral link. When a trader opens an account through your link and trades, you earn a commission.' }
    ] as PtStep[],
    cta: 'Join as IB Partner'
  },
  accounts: {
    head: {
      eyebrow: 'Our account types',
      title: 'Accounts for every',
      em: 'trader',
      lead: 'As an Introducing Broker, you will promote world-class trading accounts tailored for every type of trader, from beginners to professionals. We offer the best pricing around, from multi-asset global markets: forex, CFDs, crypto and more.'
    } as PtHeadCopy
  }
}

export const WL = {
  seo: {
    title: 'White Label Solution | Artix Global',
    description: 'Start your brokerage with a fully branded nTrader platform, deep liquidity, flexible commissions and quick setup from Artix Global.'
  },
  hero: {
    eyebrow: 'White-label service',
    title: 'Our white label',
    em: 'solution',
    lead: 'Start your brokerage with nTrader, full branding, and institutional tools. Launch quickly, scale efficiently, and partner with the trusted infrastructure of Artix Global.',
    cta: 'Open Account'
  },
  intro: {
    head: { eyebrow: 'nTrader white label', title: 'Far more than', em: 'licensing technology' } as PtHeadCopy,
    body: [
      'Partnering with Artix Global means far more than licensing technology. Our White-Label solution gives you nTrader, a robust, fully branded platform designed for speed, reliability, and scalability.',
      'You gain access to institutional liquidity, multi-asset trading, and dedicated Coverage Account conditions that strengthen your edge against competition.',
      'From compliance guidance to marketing support, from fast deployment to continuous innovation, Artix Global delivers a complete ecosystem so you can launch confidently, grow sustainably, and maintain the credibility your clients demand.'
    ],
    img: { src: '/img/partners/ntrader-white-label.webp', w: 794, h: 528, alt: 'nTrader white-label trading platform' }
  },
  offer: {
    head: { eyebrow: 'Our white-label service', title: 'What we', em: 'offer' } as PtHeadCopy,
    items: [
      { title: 'Branded Platform', body: 'Fully customized nTrader interface under your logo, colors, and domain for instant recognition and credibility.', icon: PhPaintBrush },
      { title: 'Deep Liquidity', body: 'Access to tight spreads and high-volume execution through top-tier liquidity providers for all asset classes.', icon: PhDrop },
      { title: 'Flexible Commissions', body: 'Tailored fee structures so you can align spreads, commissions, and margins with your target clients.', icon: PhSliders },
      { title: 'Quick Setup', body: 'Launch your brokerage in weeks, not months, with full deployment of technology and integrations.', icon: PhRocketLaunch }
    ] as PtFeature[]
  },
  band: {
    eyebrow: 'Coverage terms',
    title: 'Dedicated',
    em: 'account',
    lead: 'Access to Artix Coverage Account terms to offer clients professional pricing and advanced risk control features.',
    cta: 'Open Account'
  },
  steps: {
    head: { eyebrow: 'Launch', title: 'Your broker in', em: '3 steps' } as PtHeadCopy,
    items: [
      { n: '01', title: 'Competitive Edge', body: 'The Coverage Account equips your brokerage with unmatched execution quality, tailored pricing, and institutional-level liquidity. With Artix Global as your liquidity provider, you will always be ready to outperform and out-deliver in competitive markets.' },
      { n: '02', title: 'Broad Market Access', body: 'Offer your clients a diverse portfolio, from FX and metals to indices, commodities, equities, and crypto. Extensive trading assets ensure brokers attract all types of traders with confidence and versatility.' },
      { n: '03', title: 'Flexible Liquidity', body: 'Enjoy scalable liquidity solutions with tight spreads and adaptable margins. Artix Global helps new brokers remain competitive, balancing risk management with flexibility to capture market share and support lasting growth.' }
    ] as PtStep[],
    cta: 'Open Account'
  },
  accounts: {
    head: {
      eyebrow: 'Our account types',
      title: 'Accounts for every',
      em: 'trader',
      lead: 'We offer the best pricing around, from multi-asset global markets: forex, CFDs, crypto and more.'
    } as PtHeadCopy
  }
}

export const CAL = {
  seo: {
    title: 'Economic Calendar | Artix Global',
    description: 'Keep your finger on the pulse of the financial markets with the Artix Global economic and trading calendar.'
  },
  hero: {
    eyebrow: 'Education',
    title: 'Economic and trading',
    em: 'calendar',
    lead: 'Keep your finger on the pulse of the financial markets and get a head start on your next trades with our economic and trading calendar. Discover and explore the calendar and learn about the different ways you can use it.'
  },
  head: { eyebrow: 'Market-moving events', title: 'Economic', em: 'calendar' } as PtHeadCopy,
  widget: {
    src: 'https://www.tradingview-widget.com/embed-widget/events/?locale=en',
    cfg: { colorTheme: 'dark', isTransparent: true, locale: 'en', countryFilter: 'us,ca,gb,de,fr,nz,au', importanceFilter: '-1,0,1', width: '100%', height: '700' },
    link: 'https://www.tradingview.com/economic-calendar/',
    credit: 'Economic Calendar by TradingView',
    height: 700
  }
}

export const LEGAL = {
  seo: {
    title: 'Legal Docs | Artix Global',
    description: 'Artix Global legal documents: complaints management, conflicts of interest, privacy, risk disclosure, risk management and safeguarding of client funds.'
  },
  hero: { eyebrow: 'Company', title: 'Legal', em: 'docs', lead: 'Policies and disclosures for Artix Global clients, available as PDF files.' },
  head: { eyebrow: 'Documents', title: 'Policies and', em: 'disclosures' } as PtHeadCopy,
  support: { title: 'Anytime support from our team', body: 'Questions about a policy? Write to us at' },
  risk: 'Risk warning'
}
