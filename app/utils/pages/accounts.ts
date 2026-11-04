export type TierId = 'core' | 'edge' | 'elite' | 'coverage'
export interface Tier { id: TierId, name: string, deposit: number, specs: string[] }

export const ACC_INTRO = 'World-class trading accounts tailored for every type of trader, from beginners to professionals. We offer the best pricings around, from multi asset global markets: forex, CFDs, crypto and more!'

export const TIERS: Tier[] = [
  {
    id: 'core', name: 'Artix Core', deposit: 500,
    specs: ['Platform: nTrader', 'Leverage: 1:200', 'Spreads from: 1.5 pips', 'Fixed leverage', 'Dynamic leverage: for forex, precious metals', 'Stop out level: 30%', 'No commission', 'Cryptos: 0.10% NV fee, floor at $0.050']
  },
  {
    id: 'edge', name: 'Artix Edge', deposit: 10000,
    specs: ['Platform: nTrader', 'Leverage: 1:200', 'Fixed leverage', 'Dynamic leverage', 'Stop out level: 30%', 'Commission: $5 per side', 'Cryptos: 0.10% NV fee, floor at $0.050']
  },
  {
    id: 'elite', name: 'Artix Elite', deposit: 25000,
    specs: ['Platform: nTrader', 'Sub zero spreads', 'Max leverage: 1:200', 'Fixed leverage', 'Dynamic leverage', 'Stop out level: 30%', 'Commission: $5 per side', 'Cryptos: 0.10% NV fee, floor at $0.050']
  },
  {
    id: 'coverage', name: 'Artix Coverage', deposit: 50000,
    specs: ['Platform: nTrader', 'Spreads low as 0', 'Leverage: 1:200', 'Fixed leverage', 'Dynamic leverage', 'Stop out level: 30%', 'Commission: $3.5 per side', 'Cryptos: 0.10% NV fee, floor at $0.050']
  }
]

export interface CompareRow { k: string, v: Record<TierId, string | boolean> }

export const COMPARE: CompareRow[] = [
  { k: 'Platform', v: { core: 'nTrader', edge: 'nTrader', elite: 'nTrader', coverage: 'nTrader' } },
  { k: 'Spreads', v: { core: 'From 1.5 pips', edge: false, elite: 'Sub zero', coverage: 'Low as 0' } },
  { k: 'Leverage', v: { core: '1:200', edge: '1:200', elite: 'Max 1:200', coverage: '1:200' } },
  { k: 'Fixed leverage', v: { core: true, edge: true, elite: true, coverage: true } },
  { k: 'Dynamic leverage', v: { core: 'Forex, precious metals', edge: true, elite: true, coverage: true } },
  { k: 'Stop out level', v: { core: '30%', edge: '30%', elite: '30%', coverage: '30%' } },
  { k: 'Commission', v: { core: 'No commission', edge: '$5 per side', elite: '$5 per side', coverage: '$3.5 per side' } },
  { k: 'Cryptos', v: { core: '0.10% NV fee', edge: '0.10% NV fee', elite: '0.10% NV fee', coverage: '0.10% NV fee' } },
  { k: 'Crypto fee floor', v: { core: '$0.050', edge: '$0.050', elite: '$0.050', coverage: '$0.050' } }
]

export const ACC_STEPS = [
  { n: '01', title: 'Fill in the form', body: 'Tell us a few basic details (name, email, phone). Takes 2 minutes to go ahead.' },
  { n: '02', title: 'Verify your identity', body: 'Upload a passport/ID and a recent utility bill: fast, secure, and encrypted.' },
  { n: '03', title: 'Fund & trade', body: 'Choose from multiple deposit methods. Your account is activated instantly.' }
]
