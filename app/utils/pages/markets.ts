export type MktIcon = 'coins' | 'vault' | 'currency' | 'swap' | 'globe' | 'drop' | 'plant' | 'flag' | 'bank' | 'sun' | 'chart' | 'btc' | 'sparkle' | 'lock'

export interface MktProduct { title: string, body: string, tags: string[], icon: MktIcon, badge?: string }
export interface MktFeature { kicker: string, title: string, em: string, body: string }

export type MarketSlug = 'precious-metals' | 'forex-trading' | 'commodities-trading' | 'stocks-trading' | 'indices-trading' | 'crypto-trading'

export interface MarketCopy {
  name: string
  title: string
  em: string
  lead: string
  desc: string
  products: MktProduct[]
  feature?: MktFeature
  gateway: string
  quotes: string[]
}

export const MKT_STEPS = [
  { n: '01', title: 'Fill in the form', body: 'Tell us a few basic details (name, email, phone). Takes 2 minutes to go ahead.' },
  { n: '02', title: 'Verify your identity', body: 'Upload a passport/ID and a recent utility bill: fast, secure, and encrypted.' },
  { n: '03', title: 'Fund & trade', body: 'Choose from 10+ deposit methods. Your account is activated instantly.' }
]

export const MKT_WHY = [
  'At Artix Global, we provide a streamlined gateway to global financial markets, designed for both newcomers and experienced traders alike.',
  'Our mission is to empower every client with advanced technology, competitive trading conditions, and professional support that makes a real difference.',
  'Trade a wide range of instruments, from major forex pairs to indices, commodities, stocks, and crypto, all from a single, powerful platform.',
  'With nTrader, our intuitive and high-performance trading platform available across desktop, web, and mobile, you can execute trades with speed and confidence anytime, anywhere.',
  'All live account holders also benefit from access to real-time market data, trading tools, and expert-backed insights that help sharpen your strategy.',
  'Combined with responsive 24/5 customer support, Artix Global is built to be your trusted partner in the world of trading.'
]

export const MARKET_PAGES: Record<MarketSlug, MarketCopy> = {
  'precious-metals': {
    name: 'Precious Metals',
    title: 'Precious',
    em: 'Metals',
    lead: 'In times of economic uncertainty, smart capital flows to Precious Metals. Whether you are hedging against inflation or speculating on industrial demand, our platform gives you direct access to the world’s most liquid commodity markets. Trade Gold, Silver, Platinum, and Palladium alongside Forex pairs.',
    desc: 'Trade Gold, Silver, Platinum and Palladium as spot and CFDs on the futures with Artix Global. Tier-1 bank liquidity and flexible leverage up to 1:200.',
    products: [
      { title: 'Metals Spot Trading', body: 'We aggregate liquidity from top tier-1 banks, ensuring your Spot XAUUSD, XAGUSD, XPTUSD and XPDUSD trades are executed in milliseconds without slippage.', tags: ['XAU/USD', 'XAG/USD', 'XPT/USD', 'XPD/USD'], icon: 'coins', badge: 'XAU/USD Spot' },
      { title: 'Metals CFDs on Future', body: 'Use flexible leverage up to 1:200 to maximize your exposure to tiny price movements in Gold and Silver CFDs on the Futures.', tags: ['Gold', 'Silver', 'Leverage 1:200'], icon: 'vault', badge: 'Gold CFDs' }
    ],
    feature: { kicker: 'Metals Trading', title: 'Trade Precious Metals CFDs.', em: 'No Physical Ownership, Full Market Exposure.', body: 'Go long or short on Gold, Silver, Platinum & Palladium with high-leverage CFDs. Tight spreads, instant execution, and no storage costs.' },
    gateway: 'Precious Metals',
    quotes: ['XAU/USD', 'XAG/USD']
  },
  'forex-trading': {
    name: 'Forex',
    title: 'Forex',
    em: 'Trading',
    lead: 'Forex, or foreign exchange, is the global marketplace for buying and selling currencies. Traded 24 hours a day, five days a week, it is the most liquid and dynamic market in the world. With trillions exchanged daily, forex trading offers opportunities across major, minor, and exotic currency pairs, driven by global events, economic trends, and market sentiment.',
    desc: 'Trade major, minor, regional and exotic currency pairs with Artix Global. The forex market is open 24 hours a day, five days a week.',
    products: [
      { title: 'Major Pairs', body: 'The most traded and liquid pairs in the world, including EUR/USD, USD/JPY, GBP/USD. These form the backbone of global forex volume.', tags: ['EUR/USD', 'USD/JPY', 'GBP/USD'], icon: 'currency' },
      { title: 'Minor Pairs', body: 'Cross-currency pairs excluding the USD. Trade combinations like EUR/GBP, GBP/JPY, NZD/EUR and CHF/JPY with competitive spreads.', tags: ['EUR/GBP', 'GBP/JPY', 'NZD/EUR', 'CHF/JPY'], icon: 'swap' },
      { title: 'Regional & Exotic Pairs', body: 'Trade currencies from specific regions and emerging markets, such as AUD/NZD, EUR/NOK, USD/PLN, and GBP/MXN, for unique market exposure.', tags: ['AUD/NZD', 'EUR/NOK', 'USD/PLN', 'GBP/MXN'], icon: 'globe' }
    ],
    gateway: 'Forex Trading Pairs',
    quotes: ['EUR/USD', 'GBP/USD', 'USD/JPY']
  },
  'commodities-trading': {
    name: 'Commodities',
    title: 'Commodities',
    em: 'Trading',
    lead: 'At Artix Global, commodities trading is fully online. Trade energies and agricultural markets as spot and CFDs, from crude oil and natural gas to wheat, corn, soybeans, and coffee.',
    desc: 'Trade energies such as crude oil and natural gas, and agricultural commodities such as wheat, corn, soybeans and coffee, as spot and CFDs with Artix Global.',
    products: [
      { title: 'Energies Trading', body: 'Speculate on global spot and CFDs energy markets including crude oil and natural gas. Energy commodities offer high volatility and liquidity, driven by geopolitical events, supply-demand dynamics, and seasonal global consumption patterns.', tags: ['Crude oil', 'Natural gas'], icon: 'drop' },
      { title: 'Agri Commodities', body: 'Gain exposure to agricultural markets like wheat, corn, soybeans, and coffee. These commodities provide diversification and are influenced by global weather cycles, trade policies, and changing consumer demand trends.', tags: ['Wheat', 'Corn', 'Soybeans', 'Coffee'], icon: 'plant' }
    ],
    feature: { kicker: 'Commodities Trading', title: 'Trade the World’s', em: 'Essential Assets', body: 'Open long or short positions with flexible leverage, manage risk with precision tools, and capitalize on market volatility, all with no need for storage, transport, or physical delivery.' },
    gateway: 'Commodities Trading',
    quotes: ['WTI', 'BRENT']
  },
  'stocks-trading': {
    name: 'Stocks',
    title: 'Stocks',
    em: 'Trading',
    lead: 'Trade the world’s leading stocks with the flexibility and speed of CFDs. With Artix Global, you can speculate on major companies like Apple, Tesla, and Amazon without owning the actual shares. Go long or short and react instantly to market news, earnings reports, and global events. All trades are executed through a single, high-performance platform built for precision and control.',
    desc: 'Trade stock CFDs on Apple, Tesla, Amazon and more across US, European and Asia Pacific markets with Artix Global. Go long or short without owning the shares.',
    products: [
      { title: 'US Stock Market', body: 'Trade US stocks across the NYSE and Nasdaq. From Apple, Amazon and Microsoft to high-growth small caps, trade US shares with ultra-low commissions and real-time data.', tags: ['NYSE', 'Nasdaq', 'Apple', 'Amazon', 'Microsoft'], icon: 'flag' },
      { title: 'European Stock Markets', body: 'Trade all major European stocks traded on major exchanges including LSE, XETRA, Euronext. Benefit from well-established companies and the stability of mature markets.', tags: ['LSE', 'XETRA', 'Euronext'], icon: 'bank' },
      { title: 'Asia Pacific Market', body: 'Explore Asian markets including Hong Kong, Japan, and China-listed companies. Benefit from the growth of emerging economies and trade industries driving innovation, manufacturing, and future global demand.', tags: ['Hong Kong', 'Japan', 'China'], icon: 'sun' }
    ],
    gateway: 'Stocks Trading Instruments',
    quotes: ['AAPL', 'TSLA']
  },
  'indices-trading': {
    name: 'Indices',
    title: 'Indices',
    em: 'Trading',
    lead: 'Speculate on the performance of entire markets with the power of index trading. With Artix Global, you can trade the world’s most influential indices, from the S&P 500 to the FTSE 100, without owning individual stocks. Index CFDs offer flexibility, leverage, and instant market exposure, all within a single, high-performance platform.',
    desc: 'Trade index CFDs on the S&P 500, Dow Jones, Nasdaq, FTSE 100, DAX 40, CAC 40, Nikkei 225, Hang Seng and ASX 200 with Artix Global.',
    products: [
      { title: 'US Indices', body: 'Trade US Indices S&P 500, Dow Jones, and Nasdaq. These indices reflect the performance of America’s top corporations and react to earnings, Fed decisions, and economic data.', tags: ['S&P 500', 'Dow Jones', 'Nasdaq'], icon: 'chart' },
      { title: 'European Indices', body: 'Access leading European markets such as the FTSE 100, DAX 40, and CAC 40. Start trading indices cover all major financial sectors, offering volatility and directional opportunities.', tags: ['FTSE 100', 'DAX 40', 'CAC 40'], icon: 'bank' },
      { title: 'Asia-Pacific Indices', body: 'Explore dynamic indices including the Nikkei 225, Hang Seng, and ASX 200. Asia-Pacific markets provide exposure to innovation, emerging trends, and region-specific catalysts across the trading week.', tags: ['Nikkei 225', 'Hang Seng', 'ASX 200'], icon: 'sun' }
    ],
    gateway: 'Indices Trading',
    quotes: ['US500', 'UK100']
  },
  'crypto-trading': {
    name: 'Crypto',
    title: 'Crypto',
    em: 'Trading',
    lead: 'Enter the fast-paced world of cryptocurrencies with Artix Global. Trade leading crypto CFDs like Bitcoin, Ethereum, and more, without owning the underlying coins. Our platform delivers lightning-fast execution, flexible leverage, and 24/7 market access to capture the crypto market’s volatility with precision.',
    desc: 'Trade crypto CFDs on Bitcoin, Ethereum, Ripple, Litecoin, Cardano and stable coins with Artix Global. Fast execution, flexible leverage and 24/7 market access.',
    products: [
      { title: 'Major Coins', body: 'Trade Bitcoin (BTC), Ethereum (ETH), and other top cryptocurrencies, capturing price action driven by adoption, technology updates, and market sentiment.', tags: ['BTC', 'ETH'], icon: 'btc' },
      { title: 'Emerging Alt-Coins', body: 'Access a wide range of altcoins including Ripple (XRP), Litecoin (LTC), and Cardano (ADA), allowing you to diversify your crypto portfolio with emerging projects and tokens.', tags: ['XRP', 'LTC', 'ADA'], icon: 'sparkle' },
      { title: 'Stable Coins and Tokens', body: 'Trade stable coins like USDT and innovative tokens that track decentralized finance trends, enabling flexible trading across evolving crypto sectors.', tags: ['USDT', 'DeFi tokens'], icon: 'lock' }
    ],
    gateway: 'Crypto Trading Coins',
    quotes: ['BTC/USD', 'ETH/USD']
  }
}
