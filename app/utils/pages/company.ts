export const ABOUT = {
  lead: 'Artix Global Trading (Pty) is a leading global Forex and CFD brokerage firm, dedicated to providing traders with superior access to global financial markets.',
  who: [
    'Artix Global Trading (Pty) Ltd is a limited liability company incorporated and registered in South Africa under registration number 2023/524418/07, with its registered office located at: 3 Arabian Crescent, Leeuwenhof, Tygervalley, Western Cape, 7441, South Africa.',
    'The company holds a Financial Services Provider, Category 1 license, under license number 53224, and is regulated by the Financial Sector Conduct Authority (FSCA) in South Africa.'
  ],
  facts: [
    { k: 'Registration number', v: '2023/524418/07' },
    { k: 'FSP licence', v: '53224' },
    { k: 'Category', v: 'Category 1' },
    { k: 'Regulator', v: 'FSCA, South Africa' }
  ],
  platform: {
    body: 'Trading in financial markets involves a wide range of strategies that traders employ to make informed decisions. From trading to swing trading and long-term investing, each strategy has its own set of principles and risk factors.',
    topics: ['Charts trading', 'Understanding Trading Strategies', 'Risk Management in Trading', 'Technical vs. Fundamental Analysis']
  },
  mission: {
    lead: 'We believe that success is not reserved for the privileged few. It\'s a journey that anyone can embark upon with right guidance.',
    values: ['Client-first approach', 'Integrity and Compliance', 'Fast Execution']
  }
}

export interface Job { slug: string, title: string, type: string, exp: string }

export const CAREERS = {
  lead: 'We\'re constantly improving our trading platform, trying to make it the best on the market.',
  jobs: [
    { slug: 'data-analysist', title: 'Data Analyst', type: 'Remote', exp: '2-3 years' },
    { slug: 'software-developer', title: 'Software Developer', type: 'Remote', exp: '2-3 years' }
  ] as Job[],
  env: 'Join our team of successful individuals, who have built their career with us. We are constantly seeking new and ambitious talent to work as foreign exchange dealers/brokers, sales representatives, customer service representatives, Introducing Brokers/Agents and Back-Office.',
  steps: ['Apply', 'Interview', 'Assessment']
}

export const CONTACT = {
  business: 'For business plan submissions. Please submit using this email.'
}

export const SUPPORT = {
  lead: 'We\'re constantly improving our trading platform, trying to make it the best on the market.',
  topics: [
    { t: 'Beginner Course', href: '/blog/' },
    { t: 'Trading Tools', href: '/economic-calender/' },
    { t: 'Stocks and CFDs', href: '/stocks-trading/' }
  ]
}
