export const ORIGIN = 'https://artixglobal.com'
export const SIGNUP = 'https://crm.artixglobal.com/#/client/signup'
export const LOGIN = 'https://crm.artixcapital.com/login'
export const EMAIL = 'info@artixglobal.com'
export const NEON = '#3dff7a'
export const NEON_RED = '#ff2e4d'
export const ADDRESS = '3 Arabian Crescent, Leeuwenhof, Tygervalley, Western Cape, 7441, South Africa'

const p = (s: string) => `${ORIGIN}/${s}/`

export interface NavLink { label: string, href: string, note?: string }
export interface NavGroup { label: string, links: NavLink[] }

export const NAV: NavGroup[] = [
  { label: 'Accounts', links: [{ label: 'Account types', href: p('accounts'), note: 'Core, Edge, Elite and Coverage' }] },
  {
    label: 'Platforms',
    links: [
      { label: 'nTrader for Windows', href: p('ntrader-windows'), note: 'Full desktop terminal' },
      { label: 'nTrader for Mobile', href: p('ntrader-mobile'), note: 'Markets in your pocket' }
    ]
  },
  {
    label: 'Markets',
    links: [
      { label: 'Precious Metals', href: p('precious-metals'), note: 'XAU/USD, XAG/USD' },
      { label: 'Forex', href: p('forex-trading'), note: 'Raw spreads from 0.0 pips' },
      { label: 'Commodities', href: p('commodities-trading'), note: 'WTI, Brent, softs' },
      { label: 'Stocks', href: p('stocks-trading'), note: 'Apple, Meta, Tesla' },
      { label: 'Indices', href: p('indices-trading'), note: 'US500, UK100, EU50' },
      { label: 'Crypto', href: p('crypto-trading'), note: 'BTC, ETH, XRP CFDs' }
    ]
  },
  {
    label: 'Education',
    links: [
      { label: 'Economic Calendar', href: p('economic-calender'), note: 'Market-moving events' },
      { label: 'Blog', href: p('blog'), note: 'News and analysis' }
    ]
  },
  {
    label: 'Partners',
    links: [
      { label: 'Introducing Broker', href: p('introducing-broker'), note: 'Grow with Artix' },
      { label: 'White-label Solution', href: p('white-label-solution'), note: 'Your brand, our stack' }
    ]
  },
  {
    label: 'Company',
    links: [
      { label: 'About Us', href: p('about-us') },
      { label: 'Careers', href: p('careers') },
      { label: 'Legal Docs', href: p('legal-docs') },
      { label: 'Support', href: p('support') },
      { label: 'Contact Us', href: p('contact') }
    ]
  }
]

export interface Market { key: string, name: string, desc: string, symbols: string[], stat: string, statLabel: string, href: string, seed: number }

export const MARKETS: Market[] = [
  { key: 'metals', name: 'Precious Metals', desc: 'Go long or short on XAU/USD and XAG/USD with leverage up to 1:200.', symbols: ['XAU/USD', 'XAG/USD'], stat: '0.10', statLabel: 'pip spread on gold', href: p('precious-metals'), seed: 3 },
  { key: 'forex', name: 'Forex', desc: 'Trade forex with raw spreads, instant execution and no hidden fees.', symbols: ['EUR/USD', 'GBP/USD', 'USD/JPY'], stat: '0.0', statLabel: 'pips raw spreads from', href: p('forex-trading'), seed: 7 },
  { key: 'commodities', name: 'Commodities', desc: 'Trade WTI and Brent crude, sugar, coffee and agricultural goods as spot and CFDs.', symbols: ['WTI', 'BRENT', 'COFFEE'], stat: 'Spot', statLabel: 'and CFD contracts', href: p('commodities-trading'), seed: 11 },
  { key: 'stocks', name: 'Stocks', desc: 'Trade on the returns of leading companies such as Apple, Meta, Disney, LVMH and Tesla.', symbols: ['AAPL', 'META', 'TSLA'], stat: 'Global', statLabel: 'blue-chip shares', href: p('stocks-trading'), seed: 17 },
  { key: 'indices', name: 'Indices', desc: 'Take a view on a full sector from one position: US500, UK100, AU50 and EU50.', symbols: ['US500', 'UK100', 'EU50'], stat: '1', statLabel: 'position, a full market', href: p('indices-trading'), seed: 23 },
  { key: 'crypto', name: 'Crypto', desc: 'Trade price moves of major digital currencies through CFDs on Bitcoin, Ethereum and Ripple.', symbols: ['BTC/USD', 'ETH/USD', 'XRP/USD'], stat: '0.10%', statLabel: 'NV fee, floor $0.050', href: p('crypto-trading'), seed: 31 }
]

export interface Account { name: string, deposit: number, tag: string, features: string[] }

export const ACCOUNTS: Account[] = [
  {
    name: 'Artix Core', deposit: 500, tag: 'Start here',
    features: ['Platform: nTrader', 'Spreads from 1.5 pips', 'No commission', 'Leverage 1:200', 'Fixed and dynamic leverage on forex and precious metals', 'Stop out level 30%', 'Crypto: 0.10% NV fee, floor $0.050']
  },
  {
    name: 'Artix Edge', deposit: 10000, tag: 'Active traders',
    features: ['Platform: nTrader', 'Commission $5 per side', 'Leverage 1:200', 'Fixed and dynamic leverage', 'Stop out level 30%', 'Crypto: 0.10% NV fee, floor $0.050']
  },
  {
    name: 'Artix Elite', deposit: 25000, tag: 'Sub-zero spreads',
    features: ['Platform: nTrader', 'Sub-zero spreads', 'Commission $5 per side', 'Max leverage 1:200', 'Fixed and dynamic leverage', 'Stop out level 30%', 'Crypto: 0.10% NV fee, floor $0.050']
  },
  {
    name: 'Artix Coverage', deposit: 50000, tag: 'Lowest cost',
    features: ['Platform: nTrader', 'Spreads as low as 0.0', 'Commission $3.5 per side', 'Leverage 1:200', 'Fixed and dynamic leverage', 'Stop out level 30%', 'Crypto: 0.10% NV fee, floor $0.050']
  }
]

export const STEPS = [
  { n: '01', title: 'Fill in the form', body: 'Tell us a few basic details: name, email and phone. It takes about 2 minutes.' },
  { n: '02', title: 'Verify your identity', body: 'Upload a passport or ID and a recent utility bill. The upload is fast, secure and encrypted.' },
  { n: '03', title: 'Fund and trade', body: 'Choose from multiple deposit methods. Your account is active immediately.' }
]

export const PLATFORM = {
  windows: {
    title: 'nTrader for Windows',
    body: 'The Artix nTrader platform for Windows gives you all you need to trade the financial markets.',
    points: ['Integrated CRM and copy trading', 'Deep liquidity through a FIX API bridge', 'Intuitive interface with advanced tools', 'Scalable and secure'],
    href: p('ntrader-windows')
  },
  mobile: {
    title: 'nTrader for Mobile',
    body: 'Your gateway to smarter, faster and more confident trading, with global markets and strong tools in your pocket.',
    points: ['Multi-device sync', 'Ultra-fast order execution', 'Advanced charting on the go', 'Full account management'],
    href: p('ntrader-mobile')
  }
}

export type DlIcon = 'desktop' | 'web' | 'mobile' | 'windows' | 'ios' | 'android' | 'play'
export interface Download { id: string, label: string, title: string, href: string, icon: DlIcon }

export const DOWNLOADS: { id: 'ntrader' | 'mt5', label: string, desc: string, more?: { label: string, href: string }, opts: Download[] }[] = [
  {
    id: 'ntrader',
    label: 'nTrader',
    desc: 'Our own terminal on desktop, browser and mobile, with one login across every screen.',
    opts: [
      { id: 'desktop', label: 'Desktop', title: 'A full workstation on Windows', href: p('ntrader-windows'), icon: 'desktop' },
      { id: 'web', label: 'Web', title: 'Open a browser and trade', href: LOGIN, icon: 'web' },
      { id: 'mobile', label: 'Mobile', title: 'Markets in your pocket', href: p('ntrader-mobile'), icon: 'mobile' }
    ]
  },
  {
    id: 'mt5',
    label: 'MetaTrader 5',
    desc: 'The industry-standard terminal, connected to the ArtixCapital-Server.',
    opts: [
      { id: 'windows', label: 'Windows', title: 'Desktop terminal', href: 'https://download.terminal.free/cdn/web/artix.capital.ltd/mt5/artixcapital5setup.exe', icon: 'windows' },
      { id: 'web', label: 'Web', title: 'Trade in your browser', href: 'https://web.artixcapital.com/terminal', icon: 'web' },
      { id: 'ios', label: 'iOS', title: 'iPhone and iPad', href: 'https://download.terminal.free/cdn/mobile/mt5/ios?server=ArtixCapital-Server', icon: 'ios' },
      { id: 'android', label: 'Android .APK', title: 'Phone and tablet, direct download', href: 'https://download.terminal.free/cdn/web/metaquotes.software.corp/mt5/metatrader5.apk', icon: 'android' },
      { id: 'playstore', label: 'Google Play', title: 'Android app', href: 'https://download.terminal.free/cdn/mobile/mt5/android?server=ArtixCapital-Server', icon: 'play' }
    ]
  }
]

export const FAQ = [
  { q: 'What is trading?', a: 'Trading is the process of buying and selling financial instruments such as forex, stocks, commodities, indices and cryptocurrencies with the aim to profit from price movements. Traders analyze market trends, economic events and price charts to make informed decisions.' },
  { q: 'How can I get started with trading?', a: 'Open a live or demo account, complete the verification process, fund your account and access global markets through the nTrader platform. We also provide educational resources and market insights to help you build confidence and improve your strategies.' },
  { q: 'How can I stay updated on market news and trends?', a: 'Artix Global gives traders access to market news, economic calendars, technical analysis and educational content. Following financial events, economic releases and market trends helps you make more informed decisions.' },
  { q: 'What are the different types of trading?', a: 'Common styles are day trading, swing trading, scalping, position trading, copy trading and algorithmic trading. At Artix Global you can access forex, precious metals, commodities, stocks, indices and cryptocurrencies.' },
  { q: 'Is trading suitable for everyone?', a: 'Trading can offer opportunities in global financial markets, but it also involves risk. Understand market conditions, risk management and trading strategies before you invest. Artix Global provides demo accounts and educational resources so you can gain experience before you trade with real funds.' },
  { q: 'What is fundamental analysis?', a: 'Fundamental analysis is the study of economic, financial and geopolitical factors that influence market prices, such as interest rates, inflation, employment reports, central bank decisions and global news.' },
  { q: 'What are the risks associated with trading?', a: 'Trading leveraged financial products involves significant risk and may not be suitable for all investors. Market volatility, leverage, liquidity conditions and unexpected economic events can result in substantial gains or losses. Use proper risk management and only trade with funds you can afford to lose.' }
]

export const POSTS = [
  { tag: 'Fundamental Analysis', title: 'The Emotional Dynamics of Trading: Navigating Decisions and Psychology', date: '2024-02-15', author: 'Fahim', img: '/img/blog-1.webp', href: p('the-emotional-dynamics-of-trading-navigating-decisions-and-psychology') },
  { tag: 'Cryptocurrency Trading', title: 'Trading Dynamics: Emotions, Decision-Making, and Psychology', date: '2024-02-15', author: 'Fahim', img: '/img/blog-2.webp', href: p('trading-dynamics-emotions-decision-making-and-psychology') },
  { tag: 'Fundamental Analysis', title: 'Emotional Intelligence in Trading: Understanding Decisions', date: '2024-02-15', author: 'Fahim', img: '/img/blog-3.webp', href: p('emotional-intelligence-in-trading-understanding-decisions') }
]

export const DOCS = [
  { label: 'Complaints Management Policy', href: '/files/Complaints-Management-Policy_AGL.pdf' },
  { label: 'Conflicts of Interest Policy', href: '/files/Conflicts-of-Interest-Policy_AGL.pdf' },
  { label: 'Privacy Policy', href: '/files/Privacy-Policy_AGL.pdf' },
  { label: 'Risk Disclosure Policy', href: '/files/Risk-Disclosure-Policy_AGL.pdf' },
  { label: 'Risk Management Policy', href: '/files/Risk-Management-Policy_AGL.pdf' },
  { label: 'Safeguarding of Client Funds', href: '/files/Safeguarding-of-clients-funds-_AGL.pdf' }
]

export const RISK = 'Trading leveraged financial products involves significant risk and may not be suitable for all investors. Market volatility, leverage, liquidity conditions and unexpected economic events can result in substantial gains or losses. Only trade with funds you can afford to lose.'

export const fmtUsd = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
export const fmtDate = (iso: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso))
