export type Block =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { quote: string }
  | { ul: string[] }
  | { imgs: { src: string, alt: string, w: number, h: number }[] }

export interface Post {
  slug: string
  title: string
  date: string
  modified: string
  author: string
  cats: string[]
  tags: string[]
  cover: string | null
  body: Block[]
}

export const CATS: Record<string, string> = {
  'cryptocurrency-trading': 'Cryptocurrency Trading',
  'fundamental-analysis': 'Fundamental Analysis',
  'risk-management': 'Risk Management',
  'technical-analysis': 'Technical Analysis',
  'trading-strategies': 'Trading Strategies'
}

const BODY: Block[] = [
  { h2: 'Trading Pitfalls Common Mistakes and How to Avoid Them' },
  { p: 'Trading can be a rewarding endeavor, but it’s not without its challenges. Even experienced traders can fall victim to common mistakes that can negatively impact their portfolios. In this blog post, we’ll highlight ten common trading mistakes and provide insights on how to avoid them to enhance your chances of success in the financial markets.' },
  { quote: 'One of the most prevalent mistakes is trading without a well-defined plan. Trading without clear objectives, entry and exit strategies, and risk management guidelines can lead to impulsive decisions and losses.' },
  { h3: 'Navigating the Trading Jungle A Beginner’s Guide' },
  { p: 'Before you venture into the trading world, it’s crucial to grasp the fundamentals. Trading involves the buying and selling of financial assets, such as stocks, currencies, commodities, or cryptocurrencies, with the goal of making a profit.' },
  { imgs: [
    { src: '/img/blog/inner-1.webp', alt: '', w: 416, h: 300 },
    { src: '/img/blog/inner-2.webp', alt: '', w: 416, h: 300 }
  ] },
  { p: 'One of the most prevalent mistakes is trading without a well-defined plan. Trading without clear objectives and risk management guidelines can lead to impulsive decisions and losses.' }
]

const MOD = '2026-04-22T09:11:24+00:00'
const ALL = ['cryptocurrency-trading', 'fundamental-analysis', 'risk-management', 'technical-analysis', 'trading-strategies']
const NO_CRYPTO = ALL.slice(1, 5)
const TA_TS = ['technical-analysis', 'trading-strategies']
const TAGS = ['Investor', 'Trading']

const post = (slug: string, title: string, date: string, cats: string[], cover: string | null, tags = TAGS): Post =>
  ({ slug, title, date, modified: MOD, author: 'Fahim', cats, tags, cover, body: BODY })

export const POSTS: Post[] = [
  post('the-emotional-dynamics-of-trading-navigating-decisions-and-psychology', 'The Emotional Dynamics of Trading: Navigating Decisions and Psychology', '2024-02-15T07:29:09+00:00', NO_CRYPTO, '/img/blog-2.webp'),
  post('trading-dynamics-emotions-decision-making-and-psychology', 'Trading Dynamics: Emotions, Decision-Making, and Psychology', '2024-02-15T07:29:06+00:00', ALL, '/img/blog-1.webp'),
  post('emotional-intelligence-in-trading-understanding-decisions', 'Emotional Intelligence in Trading: Understanding Decisions', '2024-02-15T07:29:03+00:00', NO_CRYPTO, '/img/blog-3.webp'),
  post('navigating-trading-psychology-emotions-and-decision-making', 'Navigating Trading Psychology: Emotions and Decision-Making', '2024-02-15T07:28:59+00:00', ALL, '/img/blog/navigating.webp'),
  post('the-psychology-of-trading-emotions-and-decision-making', 'The Psychology of Trading: Emotions and Decision-Making', '2024-02-07T06:40:35+00:00', ['risk-management', ...TA_TS], '/img/blog/psychology.webp'),
  post('options-vs-futures-understanding-derivatives-trading', 'Options vs. Futures: Understanding Derivatives Trading', '2024-02-07T06:06:08+00:00', TA_TS, '/img/blog/options-futures.webp'),
  post('trading-platforms-tools-for-success-in-financial-markets', 'Trading Platforms: Tools for Success in Financial Markets', '2024-02-07T06:06:04+00:00', ALL, '/img/blog-2.webp'),
  post('trading-pitfalls-common-mistakes-and-how-to-avoid-them', 'Trading Pitfalls Common Mistakes and How to Avoid Them', '2024-02-07T06:06:00+00:00', TA_TS, '/img/blog-1.webp', ['Business', 'Investor', 'Leadership', 'Trading']),
  post('trading-psychology-mastering-your-mind-for-profit', 'Trading Psychology: Mastering Your Mind for Profit', '2024-02-07T04:15:15+00:00', ALL, null)
]

export const catName = (c: string) => CATS[c] ?? c

export const excerpt = (p: Post) => p.body.find((b): b is { p: string } => 'p' in b)?.p ?? ''

export const clip = (s: string, n = 158) => s.length <= n ? s : `${s.slice(0, s.lastIndexOf(' ', n))}…`

export const readMins = (p: Post) => {
  const words = p.body.flatMap(b => 'imgs' in b ? [] : 'ul' in b ? b.ul : [Object.values(b)[0] as string]).join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export const fmtDate = (iso: string) => new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso))
