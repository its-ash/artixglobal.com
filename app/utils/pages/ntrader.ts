import type { Component } from 'vue'
import { PhUsersThree, PhPlugsConnected, PhSliders, PhShieldCheck, PhLightning, PhChartLineUp, PhListChecks, PhClockCounterClockwise, PhHeadset, PhGlobe, PhPulse } from '@phosphor-icons/vue'

export interface Feature { icon: Component, t: string, d: string }
export interface Os { id: 'windows' | 'apple' | 'android', name: string, note: string }
export interface Step { n: string, title: string, body: string }

export const PLAY_URL = 'https://play.google.com/store/apps/details?id=ntrader.nextgen&hl=en'
export const APPSTORE_URL = 'https://apps.apple.com/ae/app/n-trader/id6478588723'

export const WIN = {
  lead: 'nTrader for Windows delivers the speed, control, and flexibility traders need. Trade multiple asset classes, including forex, commodities, stocks, indices, and crypto, under one unified, fully branded interface. Built for precision, powered by performance.',
  shot: { src: '/img/ntrader-windows/chart.webp', w: 1600, h: 1172, alt: 'nTrader for Windows trading terminal with a live price chart' },
  os: [
    { id: 'windows', name: 'Windows', note: 'Desktop application for professional performance.' },
    { id: 'apple', name: 'iOS', note: 'Mobile trading via App Store.' },
    { id: 'android', name: 'Android', note: 'Mobile trading via Google Play.' }
  ] satisfies Os[],
  features: [
    { icon: PhUsersThree, t: 'Integrated CRM & Copy Trading', d: 'Built-in client relationship management tools and copy trading features help elevate client retention and attract new traders through social trading and performance sharing.' },
    { icon: PhPlugsConnected, t: 'Deep Liquidity via FIX API Bridge', d: 'nTrader includes a FIX API liquidity bridge out-of-the-box, delivering competitive pricing, tight spreads, and efficient trade execution without additional third-party fees.' },
    { icon: PhSliders, t: 'Intuitive Interface with Advanced Tools', d: 'Seamless UI for all type of traders, featuring real-time data, customizable charts, technical indicators, and multiple order types to support powerful trade strategies.' }
  ] satisfies Feature[],
  special: [
    { icon: PhShieldCheck, t: 'Scalable & Secure', d: 'nTrader scales from small broker operations to global platforms with strong cybersecurity, encryption.' },
    { icon: PhLightning, t: 'Super Performance', d: 'Real-time streaming quotes & full market depth with instant trade execution, no slippage and requotes.' },
    { icon: PhChartLineUp, t: 'Advanced Charting Suite', d: 'Depth of Market (DOM), 30+ drawing tools (Fibonacci, Pitchforks, Gann), and 9 chart types (Heikin Ashi, Renko, Line, Candle).' },
    { icon: PhListChecks, t: 'All Order Types', d: 'Market, Limit, Stop Loss, Take Profit, Trailing Stop, OCO (One Cancels Other).' },
    { icon: PhClockCounterClockwise, t: 'Trade History & Analytics', d: 'Live activity tracking, download or export your entire journal to CSV to review your win rate and drawdown.' },
    { icon: PhHeadset, t: 'Customer Support', d: 'Integrated directly into the platform. Speak to our agents 24/7 with professional team of customer representatives.' }
  ] satisfies Feature[],
  how: {
    title: 'Built for speed, control, and precision.',
    body: 'nTrader is a next-generation CFD trading platform. It offers real-time no latency market access, lightning-fast order execution, and integrated tools like charting, risk controls, and advanced order types, all powered by professional trading-grade architecture and ultra-low latency execution.'
  },
  steps: [
    { n: '01', title: 'Fill the forms', body: 'Tell us a few basic details (name, email, phone). Takes 2 minutes.' },
    { n: '02', title: 'Verify your profile', body: 'Upload a passport/ID and a recent utility bill: fast, secure, and encrypted.' },
    { n: '03', title: 'Fund your account', body: 'Choose from 10+ deposit methods. Your account is activated instantly.' }
  ] satisfies Step[]
}

export const MOB = {
  lead: 'Trade Forex, Indices, Commodities, and Crypto CFDs from anywhere with the nTrader Mobile App. Built for speed and designed for precision, nTrader delivers a professional trading terminal experience on iOS and Android, fully synced with your existing broker account.',
  shot: { src: '/img/ntrader-mobile/app.webp', w: 1024, h: 750, alt: 'nTrader Mobile app screens on a phone' },
  poster: { src: '/img/ntrader-mobile/design.webp', w: 1000, h: 1415, alt: 'nTrader trading platform design across devices' },
  intro: 'Next-Generation Mobile Trading, that gives you trading freedom Without Compromise. Full Trading Suite in Your Pocket to access market on time and place of your choice.',
  features: [
    { icon: PhGlobe, t: 'Full Market Access', d: 'Access complete feature including all type of order with execution types. Manage positions, modify orders, and monitor open trades in real time, just like your desktop.' },
    { icon: PhChartLineUp, t: 'Advanced Mobile Charts', d: 'Perform technical analysis using advanced, very powerful charts. Draw trendlines, apply indicators, and switch easily between instruments directly on your chart view.' },
    { icon: PhPulse, t: 'Real-Time Market Data', d: 'Stream live quotes for Forex, Indices, Bullions, and stocks. Stay connected to hundreds of available servers on the network for uninterrupted market access.' }
  ] satisfies Feature[],
  special: 'nTrader comes with seamless integration of CRM, risk management, and trading technology. It supports custom branding, multi-language interfaces, and mobile compatibility, making it easy for brokers to offer an exceptional user experience across all devices.',
  os: [
    { id: 'apple', name: 'iOS', note: 'Available on the App Store (requires iOS 15.1 or later).' },
    { id: 'android', name: 'Android', note: 'Available on Google Play.' },
    { id: 'windows', name: 'Windows', note: 'Full desktop application.' }
  ] satisfies Os[],
  steps: [
    { n: '01', title: 'Fill the forms', body: 'Tell us a few basic details (name, email, phone). Takes 2 minutes.' },
    { n: '02', title: 'Verify your profile', body: 'Upload a passport/ID and a recent utility bill: fast, secure, and encrypted.' },
    { n: '03', title: 'Fund your account', body: 'Choose from multiple deposit methods. Your account is activated instantly.' }
  ] satisfies Step[]
}
