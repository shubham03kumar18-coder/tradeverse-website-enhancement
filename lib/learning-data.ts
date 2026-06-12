export interface LearningHub {
  slug: string
  title: string
  tagline: string
  intro: string
  heroIcon: string // SVG path data string
  benefits: { title: string; desc: string }[]
  topics: { title: string; desc: string }[]
  relatedCourses: { label: string; slug: string }[]
  faqs: { q: string; a: string }[]
}

export const LEARNING_HUBS_DATA: LearningHub[] = [
  {
    slug: "beginner-hub",
    title: "Beginner Hub",
    tagline: "Your First Step Into the Stock Market",
    intro:
      "The Beginner Hub at Tradeverse City is designed specifically for those who are completely new to the stock market. No prior knowledge is required. We take you from understanding what a stock is, all the way to executing your first informed trade, using a structured, jargon-free curriculum built around real market scenarios.",
    heroIcon:
      "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    benefits: [
      {
        title: "Zero-to-Hero Curriculum",
        desc: "Structured learning path that starts from absolute basics and builds progressively toward advanced concepts.",
      },
      {
        title: "Real Market Examples",
        desc: "Every concept is illustrated with live chart examples from Indian markets — NSE and BSE.",
      },
      {
        title: "Doubt-Clearing Sessions",
        desc: "Regular interactive sessions where you can ask questions and get mentor-guided answers.",
      },
      {
        title: "Beginner-Friendly Language",
        desc: "No complicated jargon. Every term is explained clearly in plain language before being used.",
      },
      {
        title: "Practice Assignments",
        desc: "Hands-on exercises after every module to reinforce what you have learned.",
      },
      {
        title: "Progress Tracking",
        desc: "Know exactly where you are in the learning journey and what to study next.",
      },
    ],
    topics: [
      { title: "What Is the Stock Market?", desc: "Understand markets, exchanges, SEBI, NSE, BSE, and how they function as an ecosystem." },
      { title: "Types of Financial Instruments", desc: "Stocks, bonds, mutual funds, ETFs, derivatives — know what each one is and how it is used." },
      { title: "Opening a Demat & Trading Account", desc: "Step-by-step guidance on selecting a broker, KYC, and setting up your trading account." },
      { title: "How to Read a Stock Chart", desc: "Introduction to candlestick charts, OHLC data, timeframes, and basic chart navigation." },
      { title: "Order Types Explained", desc: "Market orders, limit orders, stop-loss orders, and when to use each type for best execution." },
      { title: "Bull and Bear Markets", desc: "Understanding market cycles, economic phases, and how they affect stock prices." },
      { title: "Indices: Nifty & Sensex", desc: "What market indices represent, how they are calculated, and how to track them." },
      { title: "Fundamental vs Technical Analysis", desc: "A clear overview of both approaches and how Tradeverse City integrates them in training." },
    ],
    relatedCourses: [
      { label: "Stock Market Fundamentals", slug: "stock-market-fundamentals" },
      { label: "Candlestick Analysis", slug: "candlestick-analysis" },
      { label: "Technical Analysis", slug: "technical-analysis" },
    ],
    faqs: [
      { q: "Do I need any prior knowledge to join?", a: "No. The Beginner Hub starts from absolute zero. Anyone with a smartphone or laptop and basic internet access can begin." },
      { q: "How long does it take to complete the Beginner Hub?", a: "The structured path typically takes 4 to 6 weeks when following the recommended study schedule. You can also learn at your own pace." },
      { q: "Will I be able to trade after completing this hub?", a: "You will have the foundational knowledge required to understand the market. We recommend completing at least 2-3 additional courses before live trading with real capital." },
      { q: "Is this hub available online?", a: "Yes. All content is available both online and through our physical learning centers. Contact us on WhatsApp for current batch details." },
      { q: "What language is the content in?", a: "Content is available in both English and Hindi to ensure maximum accessibility for Indian learners." },
    ],
  },
  {
    slug: "technical-analysis-center",
    title: "Technical Analysis Center",
    tagline: "Read the Market Like a Professional",
    intro:
      "The Technical Analysis Center at Tradeverse City is a deep-dive facility focused entirely on chart reading, indicator mastery, and price pattern recognition. Whether you are learning technical analysis for the first time or sharpening existing skills, this center provides structured modules that cover everything from basic candlestick patterns to advanced multi-timeframe analysis.",
    heroIcon:
      "M3 3v18h18M7 16l4-4 4 4 4-8",
    benefits: [
      { title: "Indicator Mastery", desc: "Learn RSI, MACD, Bollinger Bands, Moving Averages, and 15+ other indicators — when to use them and when to avoid them." },
      { title: "Pattern Recognition Training", desc: "Identify over 30 candlestick and chart patterns with precision under guided supervision." },
      { title: "Live Chart Practice", desc: "Analyse real Indian market charts during sessions to build practical pattern-spotting skills." },
      { title: "Multi-Timeframe Analysis", desc: "Understand how the same asset behaves differently on 5-minute, hourly, daily, and weekly charts." },
      { title: "Entry and Exit Frameworks", desc: "Build rule-based entry and exit systems using technical signals with high-probability setups." },
      { title: "Backtesting Concepts", desc: "Learn to test your technical strategies on historical data before risking real capital." },
    ],
    topics: [
      { title: "Candlestick Chart Basics", desc: "What each candle represents, OHLC data, body and wick significance." },
      { title: "Trend Lines and Channels", desc: "Draw and use trend lines correctly to identify direction and momentum." },
      { title: "Moving Averages (SMA & EMA)", desc: "Use moving averages for trend identification, crossovers, and dynamic support-resistance." },
      { title: "RSI — Relative Strength Index", desc: "Identify overbought and oversold conditions and find divergence setups." },
      { title: "MACD — Momentum Indicator", desc: "Use MACD histogram and signal line for momentum-based trade entries." },
      { title: "Bollinger Bands", desc: "Understand volatility contraction and expansion and how to trade band squeezes." },
      { title: "Volume Analysis", desc: "Use volume to confirm or reject breakouts and trend continuations." },
      { title: "Chart Patterns: Head & Shoulders, Double Top/Bottom", desc: "Recognise and trade the most reliable reversal and continuation patterns." },
    ],
    relatedCourses: [
      { label: "Technical Analysis", slug: "technical-analysis" },
      { label: "Candlestick Analysis", slug: "candlestick-analysis" },
      { label: "Price Action Trading", slug: "price-action-trading" },
    ],
    faqs: [
      { q: "Is technical analysis enough to trade profitably?", a: "Technical analysis is a powerful tool, but it works best when combined with risk management, trading psychology, and a clear strategy. Tradeverse City teaches all these together." },
      { q: "Which indicators should a beginner focus on first?", a: "We recommend starting with Moving Averages, RSI, and basic candlestick patterns before moving to more complex indicators." },
      { q: "Do I need expensive software for technical analysis?", a: "No. We teach using freely available platforms like TradingView, which is sufficient for all levels of technical analysis." },
      { q: "How much time per day should I spend on chart analysis?", a: "For beginners, 30-60 minutes of daily chart study is recommended. Consistency matters more than duration." },
      { q: "Can technical analysis work in Indian markets?", a: "Yes. Indian markets including NSE equities, F&O, and commodity markets respond well to technical analysis, as proven by thousands of traders trained at Tradeverse City." },
    ],
  },
  {
    slug: "trading-psychology-center",
    title: "Trading Psychology Center",
    tagline: "Master Your Mind. Master the Market.",
    intro:
      "Over 80% of traders fail not because of a lack of knowledge, but because of emotional decision-making. The Trading Psychology Center at Tradeverse City addresses the mental side of trading — fear, greed, overconfidence, revenge trading, and loss aversion — through structured modules that help you build the mental framework of a consistently profitable trader.",
    heroIcon:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    benefits: [
      { title: "Emotion Management Framework", desc: "Learn a practical step-by-step system to identify and manage emotional triggers before they affect your trades." },
      { title: "Trading Journal Training", desc: "Build the habit of journaling every trade — including the emotions you felt — to identify and fix behavioural patterns." },
      { title: "Discipline Building Exercises", desc: "Structured daily practices that strengthen mental focus, patience, and adherence to your trading plan." },
      { title: "Cognitive Bias Education", desc: "Identify confirmation bias, recency bias, anchoring, and other cognitive biases that silently destroy trading accounts." },
      { title: "Stress & Loss Management", desc: "Practical tools to recover quickly from losing streaks without making emotionally-driven decisions." },
      { title: "Confidence vs Overconfidence", desc: "Understand the fine line between healthy trading confidence and dangerous overconfidence." },
    ],
    topics: [
      { title: "The Psychology of Winning and Losing", desc: "Why we respond differently to gains and losses, and how to rewire those responses for better decisions." },
      { title: "Fear of Missing Out (FOMO)", desc: "Recognise FOMO trades, their consequences, and how to build a system that eliminates impulsive entries." },
      { title: "Revenge Trading", desc: "Identify the revenge trading cycle and build hard rules to stop it before it destroys your account." },
      { title: "Trading Plans and Rule Adherence", desc: "Create a written trading plan and build the habit of following it regardless of emotions." },
      { title: "The Trader's Mindset", desc: "Develop a probabilistic thinking framework — thinking in terms of edges and outcomes, not individual trades." },
      { title: "Meditation and Focus Techniques", desc: "Simple mindfulness practices adapted specifically for traders to maintain calm during volatile sessions." },
      { title: "Building Mental Resilience", desc: "Strategies used by professional traders to stay psychologically strong through drawdowns." },
      { title: "Goal Setting for Traders", desc: "Set realistic, measurable trading goals that keep you motivated and grounded." },
    ],
    relatedCourses: [
      { label: "Trading Psychology", slug: "trading-psychology" },
      { label: "Risk Management", slug: "risk-management" },
      { label: "Swing Trading", slug: "swing-trading" },
    ],
    faqs: [
      { q: "Can trading psychology really be taught?", a: "Yes. While personality traits differ, the habits and frameworks of disciplined traders can absolutely be learned, practised, and internalised over time." },
      { q: "I know the rules but keep breaking them — can this center help?", a: "Yes. This is the most common issue. The center specifically addresses the gap between knowing the right action and actually taking it under market pressure." },
      { q: "How long does it take to develop good trading psychology?", a: "Most traders see measurable improvement in 4 to 8 weeks of consistent practice. Full internalisation takes 3 to 6 months of conscious effort." },
      { q: "Do I need to have lost money to benefit from this?", a: "No. Learning psychology early — before losing capital — is the ideal approach. Prevention is far better than recovery." },
      { q: "Is this covered in all Tradeverse City courses?", a: "Psychology is integrated throughout all our courses. This dedicated center goes deeper and focuses exclusively on the mental dimension of trading." },
    ],
  },
  {
    slug: "risk-management-center",
    title: "Risk Management Center",
    tagline: "Protect Capital. Trade Longer. Profit Consistently.",
    intro:
      "Risk Management is the single most important skill that separates long-term profitable traders from those who blow up their accounts. The Risk Management Center at Tradeverse City teaches you how to size positions correctly, set intelligent stop-losses, manage drawdowns, and build a trading approach where consistent capital preservation creates the foundation for consistent profit.",
    heroIcon:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    benefits: [
      { title: "Position Sizing Mastery", desc: "Calculate the correct trade size for every setup based on your account size and defined risk per trade." },
      { title: "Stop-Loss Strategy", desc: "Place stop-losses based on market structure, not arbitrary percentages, to avoid being stopped out prematurely." },
      { title: "Risk-to-Reward Optimisation", desc: "Trade only setups with a minimum 1:2 risk-reward ratio to ensure long-term profitability even with a lower win rate." },
      { title: "Drawdown Management", desc: "Defined rules for reducing position size or pausing trading during losing streaks to protect your account." },
      { title: "Portfolio Risk Rules", desc: "Never risk more than a defined percentage of total capital on correlated trades at the same time." },
      { title: "Daily and Weekly Risk Limits", desc: "Set hard daily loss limits so a bad day never becomes a catastrophic week." },
    ],
    topics: [
      { title: "The 1% Rule Explained", desc: "Why professional traders never risk more than 1-2% of capital on a single trade, and how to implement it." },
      { title: "Stop-Loss Placement", desc: "Technical stop-losses based on swing highs/lows, ATR, and key support/resistance levels." },
      { title: "Position Sizing Formulas", desc: "The exact calculations used to determine lot size and quantity for every trade." },
      { title: "Risk-to-Reward Ratios", desc: "How to evaluate whether a setup has a favourable RR before entering, and why it matters." },
      { title: "Correlation Risk", desc: "How holding multiple correlated positions multiplies risk — and how to avoid unintended over-exposure." },
      { title: "Maximum Drawdown Rules", desc: "Define the maximum acceptable drawdown for your account and the actions to take when it is reached." },
      { title: "Trailing Stop-Losses", desc: "Use trailing stops to lock in profits while allowing winning trades the room to run." },
      { title: "Risk Management for F&O", desc: "Specific risk rules for futures and options trading where leverage amplifies both gains and losses." },
    ],
    relatedCourses: [
      { label: "Risk Management", slug: "risk-management" },
      { label: "Intraday Trading", slug: "intraday-trading" },
      { label: "Swing Trading", slug: "swing-trading" },
    ],
    faqs: [
      { q: "What percentage of my capital should I risk per trade?", a: "As a general rule, risk no more than 1-2% of your total trading capital on any single trade. Tradeverse City will help you define the right rule for your account size." },
      { q: "I use stop-losses but keep getting stopped out before the trade moves in my favour. Why?", a: "This is a common issue caused by placing stops at round numbers or tight levels. The Risk Management Center teaches structure-based stop placement that avoids this." },
      { q: "Is risk management different for intraday vs swing trading?", a: "Yes. Intraday trading requires tighter stops and strict daily loss limits, while swing trading allows wider stops but requires careful position sizing due to overnight risk." },
      { q: "How does risk management relate to profitability?", a: "A trader with a 40% win rate but a 1:3 risk-reward ratio is more profitable than one with a 60% win rate and 1:1 RR. Risk management is the key variable." },
      { q: "Can beginners start with risk management training?", a: "Absolutely. We recommend learning risk management from day one, before live trading begins." },
    ],
  },
  {
    slug: "learning-resources-library",
    title: "Learning Resources Library",
    tagline: "Every Tool a Trader Needs. One Place.",
    intro:
      "The Learning Resources Library at Tradeverse City is a curated collection of books, tools, platforms, reference guides, and study materials that supplement our structured courses. It is designed to give students a comprehensive self-study ecosystem that they can return to at any stage of their trading journey.",
    heroIcon:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    benefits: [
      { title: "Curated Book List", desc: "A hand-picked reading list of the most impactful trading and investing books, with guided notes on what to focus on in each." },
      { title: "Free Platform Guides", desc: "Step-by-step guides for TradingView, Screener.in, Moneycontrol, and NSE/BSE official tools." },
      { title: "Glossary of Trading Terms", desc: "An always-expanding reference glossary covering 200+ trading terms explained in simple language." },
      { title: "Study Checklists", desc: "Pre-trade, post-trade, and daily review checklists that help build consistent habits." },
      { title: "Video Reference Library", desc: "Organised links to recommended educational videos covering key technical and fundamental concepts." },
      { title: "Practice Data Sets", desc: "Historical market data sets for backtesting strategies and practising technical analysis offline." },
    ],
    topics: [
      { title: "Essential Trading Books", desc: "Recommendations including 'Trading in the Zone', 'Reminiscences of a Stock Operator', and more." },
      { title: "TradingView Beginner Guide", desc: "From account setup to drawing tools, alert creation, and using Pine Script basics." },
      { title: "Stock Screeners & Scanners", desc: "How to use Screener.in, Chartink, and TradingView scanner to find trade opportunities." },
      { title: "Economic Calendar Usage", desc: "How to track and prepare for major economic events that move markets." },
      { title: "SEBI Resources for Traders", desc: "Official SEBI investor education resources, regulations, and useful publications." },
      { title: "Journaling Templates", desc: "Ready-to-use trade journal templates in spreadsheet format for tracking performance." },
      { title: "Trading Plan Template", desc: "A comprehensive trading plan template with all sections pre-structured for you to fill in." },
      { title: "Market Holidays & Trading Hours", desc: "NSE and BSE trading schedules, market holidays, and segment-specific timings." },
    ],
    relatedCourses: [
      { label: "Stock Market Fundamentals", slug: "stock-market-fundamentals" },
      { label: "Technical Analysis", slug: "technical-analysis" },
      { label: "Market Research Techniques", slug: "market-research-techniques" },
    ],
    faqs: [
      { q: "Is the library available to all students?", a: "Yes. All enrolled students of Tradeverse City get access to the Learning Resources Library as part of their course package." },
      { q: "Are the book recommendations free?", a: "Some books are freely available as PDFs. Others are paid. We provide purchasing guidance and, where possible, free summaries." },
      { q: "How often is the library updated?", a: "The library is updated every quarter with new tools, resources, and updated guides based on market changes and student feedback." },
      { q: "Can I suggest a resource to be added?", a: "Yes. Students can suggest resources via WhatsApp, and our team reviews and curates additions regularly." },
      { q: "Is TradingView free to use?", a: "TradingView has a free plan that is sufficient for most analysis. We teach using the free plan, and premium features are discussed as optional enhancements." },
    ],
  },
  {
    slug: "market-research-center",
    title: "Market Research Center",
    tagline: "Trade with Evidence. Not Emotion.",
    intro:
      "Successful trading is built on thorough market research. The Market Research Center at Tradeverse City teaches you how to evaluate stocks, understand sector dynamics, interpret macro-economic data, and build a disciplined research process that supports every trade decision. This center bridges the gap between technical signals and fundamental context.",
    heroIcon:
      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    benefits: [
      { title: "Sector Analysis Framework", desc: "Learn how to identify which sectors are leading, lagging, or about to rotate — and how to position accordingly." },
      { title: "Stock Evaluation Process", desc: "A repeatable process for evaluating any stock using both fundamental metrics and technical context." },
      { title: "News & Event Analysis", desc: "How to interpret earnings releases, RBI policy decisions, budget announcements, and global macro events." },
      { title: "Relative Strength Analysis", desc: "Compare stocks and sectors against the broader index to identify the strongest setups." },
      { title: "Watchlist Building", desc: "Build a structured, manageable watchlist of high-quality setups that you review daily." },
      { title: "Research Documentation", desc: "Create research notes for every trade idea so your process remains consistent and reviewable." },
    ],
    topics: [
      { title: "Top-Down vs Bottom-Up Research", desc: "Understand both research methodologies and when each is most appropriate." },
      { title: "Reading Financial Statements", desc: "Balance sheet, P&L, and cash flow basics that every trader should understand." },
      { title: "Key Financial Ratios", desc: "PE ratio, EPS, ROE, debt-to-equity, and more — what they mean and how to use them." },
      { title: "Sector Rotation", desc: "How capital rotates between sectors during different market cycles and how to spot it early." },
      { title: "FII & DII Data Analysis", desc: "How to interpret institutional buying and selling data to understand market direction." },
      { title: "Global Market Correlation", desc: "How US markets, currencies, and commodities influence Indian equity markets." },
      { title: "IPO Research Process", desc: "A structured checklist for evaluating new listings before considering participation." },
      { title: "Using NSE & BSE Data Tools", desc: "Hands-on guide to using free official data from NSE and BSE for research." },
    ],
    relatedCourses: [
      { label: "Market Research Techniques", slug: "market-research-techniques" },
      { label: "Stock Market Fundamentals", slug: "stock-market-fundamentals" },
      { label: "Portfolio Management", slug: "portfolio-management" },
    ],
    faqs: [
      { q: "How much time should I spend on research every day?", a: "30 to 60 minutes of focused daily research is enough for most traders. The goal is quality and consistency, not volume." },
      { q: "Do I need to be good at mathematics for market research?", a: "No. The calculations involved are simple and can be done using free online tools and calculators. We teach you how to use these efficiently." },
      { q: "Is fundamental analysis necessary for technical traders?", a: "Even technical traders benefit from basic fundamental awareness. Knowing the earnings date, sector trend, and major news around a stock prevents costly mistakes." },
      { q: "What tools does Tradeverse City recommend for market research?", a: "We recommend Screener.in, Moneycontrol, TradingView, and official NSE/BSE data portals — all free to use." },
      { q: "Can research reduce trading risk?", a: "Yes. Trades backed by solid research have a higher probability of success and allow more accurate risk management." },
    ],
  },
  {
    slug: "community-learning-hub",
    title: "Community Learning Hub",
    tagline: "Grow Together. Trade Better.",
    intro:
      "Trading can be an isolating journey, but it does not have to be. The Community Learning Hub at Tradeverse City brings together students, traders, and mentors in an active learning community where ideas are shared, trades are reviewed, and everyone grows together. A strong community is one of the most underrated edges in trading.",
    heroIcon:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    benefits: [
      { title: "Active Peer Groups", desc: "Connect with fellow students at similar stages of their learning journey for mutual accountability." },
      { title: "Live Trade Reviews", desc: "Share your trades for group review sessions where mentors and peers provide structured feedback." },
      { title: "Market Discussions", desc: "Daily market wrap discussions that cover what happened, why it happened, and what to watch next." },
      { title: "Mentor Access", desc: "Regular access to Tradeverse City mentors for questions, trade reviews, and guidance sessions." },
      { title: "Alumni Network", desc: "Access to a growing network of Tradeverse City alumni who are actively trading in markets." },
      { title: "Group Study Sessions", desc: "Organised sessions where students study specific topics together with mentor supervision." },
    ],
    topics: [
      { title: "How to Give and Receive Trade Feedback", desc: "Structured frameworks for reviewing trades constructively without ego or emotion." },
      { title: "Building Accountability Partnerships", desc: "How to pair up with a trading buddy to review each other's plans and results." },
      { title: "Community Etiquette for Traders", desc: "How to participate productively in a trading community and avoid common pitfalls." },
      { title: "Learning from Other Traders' Mistakes", desc: "Structured case studies of common mistakes shared by community members for group learning." },
      { title: "Weekly Market Outlook Discussions", desc: "Community-led discussion of the week ahead — key levels, events, and trade ideas." },
      { title: "Celebrating Wins the Right Way", desc: "Why acknowledging wins correctly prevents overconfidence and keeps discipline intact." },
      { title: "Study Group Formation", desc: "How to form and run an effective trading study group within the Tradeverse City community." },
      { title: "Transitioning from Student to Trader", desc: "The mental and practical steps involved in making the transition from learning to live trading." },
    ],
    relatedCourses: [
      { label: "Trading Psychology", slug: "trading-psychology" },
      { label: "Risk Management", slug: "risk-management" },
      { label: "Swing Trading", slug: "swing-trading" },
    ],
    faqs: [
      { q: "Is the community available on WhatsApp or Telegram?", a: "Yes. Tradeverse City maintains active WhatsApp and Telegram groups for enrolled students, with separate groups for different course levels." },
      { q: "Can I join the community without being enrolled in a course?", a: "Access to core community resources is for enrolled students. However, you can connect with us on WhatsApp or Telegram to ask questions before enrolling." },
      { q: "Are the community discussions moderated?", a: "Yes. All groups and forums are moderated by Tradeverse City mentors to ensure quality, accuracy, and respectful interactions." },
      { q: "Are there offline meetups?", a: "Yes. Tradeverse City organises periodic offline sessions at our learning centers. Contact us on WhatsApp for the schedule." },
      { q: "What if I am an introvert and do not like group settings?", a: "That is completely fine. Participation is always voluntary. You can observe, learn from discussions, and reach out to mentors directly via one-on-one WhatsApp contact." },
    ],
  },
]
