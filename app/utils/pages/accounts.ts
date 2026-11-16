export type TierId = 'retail' | 'professional' | 'arbitrage' | 'bullion'
export interface Tier { id: TierId, name: string, deposit: number, desc: string, specs: string[] }

export const ACC_INTRO = 'Pick the account that fits how you trade. Every account runs on nTrader with access to FX, metals, indices, commodities, equities and crypto.'

const SHARED = [
  'Instruments: FX, metals, indices, commodities, equities, crypto',
  'Max leverage: 1:200',
  'Fixed leverage: FX, precious metals, CFDs, equities and crypto',
  'Dynamic leverage: FX, precious metals, CFDs and equities',
  'Stop out level: 30%',
  'Account currency: USD',
  'Crypto: 0.10% of notional, min ticket $0.05, per side',
  'Platform: nTrader'
]

export const TIERS: Tier[] = [
  {
    id: 'retail', name: 'Retail Trader', deposit: 500, desc: 'A low-cost start for new and growing traders.',
    specs: ['Typical spreads from 1.5 pips', 'Commission: None on FX and metals', ...SHARED]
  },
  {
    id: 'professional', name: 'Professional Trader', deposit: 10000, desc: 'Raw pricing for experienced, active traders.',
    specs: ['Typical spreads from 0.0 pips', 'Commission: $5 per lot, per side on FX and metals', ...SHARED]
  },
  {
    id: 'arbitrage', name: 'Arbitrage Trader', deposit: 25000, desc: 'Priority conditions for high-volume trading.',
    specs: ['Typical spreads from 0.0 pips', 'Commission: $3.5 per lot, per side on FX and metals', ...SHARED]
  },
  {
    id: 'bullion', name: 'Bullion Trader', deposit: 50000, desc: 'For disciplined traders who put capital preservation first.',
    specs: ['Typical spreads from 0.0 pips', 'Commission: $3.5 per lot, per side on FX and metals', ...SHARED]
  }
]

export interface CompareRow { k: string, v: Record<TierId, string | boolean> }

const all = (v: string | boolean): Record<TierId, string | boolean> => ({ retail: v, professional: v, arbitrage: v, bullion: v })

export const COMPARE: CompareRow[] = [
  { k: 'Best for', v: { retail: 'First live account, swings', professional: 'Intraday, scalps, systems', arbitrage: 'High-volume, priority execution', bullion: 'Hedging, capital preservation' } },
  { k: 'Typical spreads', v: { retail: 'From 1.5 pips', professional: 'From 0.0 pips', arbitrage: 'From 0.0 pips', bullion: 'From 0.0 pips' } },
  { k: 'FX and metals commission', v: { retail: 'None', professional: '$5 / lot per side', arbitrage: '$3.5 / lot per side', bullion: '$3.5 / lot per side' } },
  { k: 'Crypto commission', v: all('0.10% of notional') },
  { k: 'Crypto min. ticket', v: all('$0.05') },
  { k: 'Max leverage', v: all('1:200') },
  { k: 'Fixed leverage', v: all(true) },
  { k: 'Dynamic leverage', v: all(true) },
  { k: 'Stop out level', v: all('30%') },
  { k: 'Account currency', v: all('USD') },
  { k: 'Platform', v: all('nTrader') }
]

export const ACC_STEPS = [
  { n: '01', title: 'Fill in the form', body: 'Tell us a few basic details (name, email, phone). Takes 2 minutes to go ahead.' },
  { n: '02', title: 'Verify your identity', body: 'Upload a passport/ID and a recent utility bill: fast, secure, and encrypted.' },
  { n: '03', title: 'Fund & trade', body: 'Choose from multiple deposit methods. Your account is activated instantly.' }
]
