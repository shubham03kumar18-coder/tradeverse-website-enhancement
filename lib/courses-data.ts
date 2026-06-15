export interface TradingCourse {
  slug: string
  title: string
  tagline: string
  intro: string
  heroIcon: string // SVG path data
  category: string
  whatYouWillLearn: string[]
  whyItMatters: string
  realMarketApplications: { title: string; desc: string }[]
  learningOutcomes: string[]
  commonMistakes: { title: string; desc: string }[]
  faqs: { q: string; a: string }[]
  relatedCourses: { label: string; slug: string }[]
}

export const TRADING_COURSES_DATA: TradingCourse[] = [
  // 1. Stock Market Fundamentals
  {
    slug: "stock-market-fundamentals",
    title: "Stock Market Fundamentals",
    tagline: "Build the Foundation That Every Profitable Trader Stands On",
    category: "Foundation",
    intro:
      "Stock Market Fundamentals is the bedrock course at Tradeverse City. Before you can read charts, trade setups, or manage risk effectively, you need to understand how markets work at a structural level. This course covers exchanges, participants, instruments, regulations, order types, and how price is formed — giving you the complete picture before you place your first trade.",
    heroIcon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    whatYouWillLearn: [
      "How stock exchanges (NSE and BSE) operate and how orders are matched",
      "The roles of SEBI, depositories, brokers, and clearing corporations",
      "Difference between equity, debt, derivatives, ETFs, and mutual funds",
      "How to open a Demat and trading account step-by-step",
      "Market order vs limit order vs stop-loss order — practical usage",
      "How to read a stock quote, bid-ask spread, and order book",
      "Market cap classification: large cap, mid cap, small cap",
      "Bull markets, bear markets, and sideways consolidation phases",
      "How indices like Nifty 50 and Sensex are calculated and used",
      "Introduction to settlement cycles (T+1) and delivery vs intraday",
    ],
    whyItMatters:
      "Skipping fundamentals is the number one reason new traders lose money quickly. Without understanding how the market structure works, every decision is based on guesswork. This course gives you the solid base from which all future learning at Tradeverse City builds — charts, indicators, strategies, and risk management all make much more sense once you understand why markets move.",
    realMarketApplications: [
      {
        title: "Choosing the Right Order Type",
        desc: "Understand when to use a market order for immediate execution versus a limit order to get a better price — a practical decision every trader makes daily.",
      },
      {
        title: "Reading a Live Stock Quote",
        desc: "Interpret the OHLC data, 52-week high/low, market cap, and P/E ratio on a live market screen confidently.",
      },
      {
        title: "Understanding Index Moves",
        desc: "When Nifty 50 falls 1%, understand which stocks are dragging it and what that means for your positions.",
      },
      {
        title: "Navigating Corporate Actions",
        desc: "Understand how dividends, bonus issues, stock splits, and rights issues affect your holdings and the stock price.",
      },
    ],
    learningOutcomes: [
      "Describe how NSE and BSE function as organised exchanges",
      "Execute the correct order type for any trading scenario",
      "Distinguish between different financial instruments and their risk profiles",
      "Explain how market indices are constructed and what they represent",
      "Navigate a Demat account and read a real-time stock quote",
      "Understand the role of SEBI and regulatory protections for investors",
    ],
    commonMistakes: [
      {
        title: "Skipping Fundamentals Entirely",
        desc: "Many beginners jump straight to technical analysis without understanding what they are actually trading. This creates confusion when news events, corporate actions, or market structure changes affect price.",
      },
      {
        title: "Confusing Investing and Trading",
        desc: "Investing and trading are different disciplines with different time horizons, tools, and risk frameworks. Understanding the difference early prevents costly strategy mismatches.",
      },
      {
        title: "Using Market Orders in Volatile Conditions",
        desc: "Market orders during high volatility can result in significant slippage. Knowing when to use limit orders instead is a critical skill learned in this course.",
      },
      {
        title: "Ignoring Settlement and Delivery Rules",
        desc: "Misunderstanding T+1 settlement, delivery vs intraday, and BTST (Buy Today Sell Tomorrow) rules leads to avoidable penalties and account restrictions.",
      },
    ],
    faqs: [
      {
        q: "Do I need any prior knowledge to take this course?",
        a: "No. This is designed as a starting point for complete beginners. Basic numeracy and a smartphone or laptop are the only requirements.",
      },
      {
        q: "Is this course only for people who want to trade, or also for long-term investors?",
        a: "Both. The fundamentals of how markets work are equally relevant whether you plan to trade daily or invest for years. The concepts are universal.",
      },
      {
        q: "How quickly can I start trading after completing this course?",
        a: "You will have the foundational knowledge after this course, but Tradeverse City recommends completing at least Technical Analysis and Risk Management before trading with real capital.",
      },
      {
        q: "Are Indian markets covered specifically, or is this generic?",
        a: "This course is entirely focused on Indian markets — NSE, BSE, SEBI regulations, Indian brokers, and Indian market structure.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Candlestick Analysis", slug: "candlestick-analysis" },
      { label: "Technical Analysis", slug: "technical-analysis" },
      { label: "Risk Management", slug: "risk-management" },
    ],
  },

  // 2. Candlestick Analysis
  {
    slug: "candlestick-analysis",
    title: "Candlestick Analysis",
    tagline: "Decode What Every Candle Is Telling You Before Price Moves",
    category: "Technical Skills",
    intro:
      "Candlestick Analysis is one of the most powerful and visual methods of reading price action in financial markets. Originating in 18th-century Japan, candlestick patterns reveal the battle between buyers and sellers with exceptional clarity. At Tradeverse City, this course goes beyond pattern memorisation — you will learn the psychology behind every pattern, how to read context, and how to use candlestick signals for high-probability trade entries and exits.",
    heroIcon:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    whatYouWillLearn: [
      "The anatomy of a candlestick: open, high, low, close, body, and wick",
      "What each part of the candle reveals about buyer and seller pressure",
      "Single candle patterns: Doji, Hammer, Shooting Star, Marubozu, Spinning Top",
      "Two-candle patterns: Engulfing, Harami, Piercing Line, Dark Cloud Cover",
      "Three-candle patterns: Morning Star, Evening Star, Three White Soldiers, Three Black Crows",
      "Continuation patterns vs reversal patterns — how to tell the difference",
      "How timeframe affects the reliability of candlestick signals",
      "How to combine candlestick patterns with support, resistance, and volume",
      "Candlestick pattern failure — when to stay out despite a signal",
      "Real-time Indian market examples of every major pattern",
    ],
    whyItMatters:
      "Candlestick analysis is the language of price. Every professional trader who uses charts understands candlestick patterns, even if they do not actively trade them — because understanding what a pattern means gives context to every chart you read. Tradeverse City teaches candlestick analysis not as a set of magic signals, but as a framework for understanding what buyers and sellers are doing at any moment.",
    realMarketApplications: [
      {
        title: "Identifying Reversal Points",
        desc: "Spot a Hammer at key support or an Evening Star at resistance to time reversal trades with precision before the move begins.",
      },
      {
        title: "Confirming Breakouts",
        desc: "A strong Marubozu candle on a breakout confirms genuine momentum. A small-bodied Doji on a breakout signals caution and possible failure.",
      },
      {
        title: "Reading Pre-Market and Opening Candles",
        desc: "The first 15-minute candle on an intraday chart tells experienced traders everything they need to know about likely direction for the day.",
      },
      {
        title: "Filtering False Signals",
        desc: "Learning which patterns require confirmation and which can be acted on immediately dramatically reduces false entries.",
      },
    ],
    learningOutcomes: [
      "Identify and interpret all major single, double, and triple candlestick patterns",
      "Explain the psychology behind each pattern in terms of buyer and seller behaviour",
      "Apply candlestick signals in context with support, resistance, and trend direction",
      "Differentiate between high-probability and low-probability candlestick setups",
      "Use candlestick analysis to improve entry timing on existing strategies",
      "Recognise when a pattern is likely to fail and avoid low-quality setups",
    ],
    commonMistakes: [
      {
        title: "Trading Patterns Without Context",
        desc: "A Hammer at the bottom of a strong downtrend is far more powerful than a Hammer in the middle of a range. Context — trend, support, volume — is everything.",
      },
      {
        title: "Memorising Patterns Without Understanding Psychology",
        desc: "If you only memorise shapes without understanding what caused them, you cannot adapt when patterns deviate slightly from the textbook form.",
      },
      {
        title: "Overloading on Too Many Patterns",
        desc: "Mastering 8-10 high-probability patterns well is more valuable than knowing 50 patterns poorly. Tradeverse City focuses on quality, not quantity.",
      },
      {
        title: "Ignoring the Wick",
        desc: "The wick (shadow) of a candle is often more important than the body. Long wicks show rejection of price levels and are crucial for stop-loss placement.",
      },
    ],
    faqs: [
      {
        q: "How many candlestick patterns do I need to know?",
        a: "You need to master 8-12 high-reliability patterns deeply rather than know 50 patterns superficially. Tradeverse City focuses on patterns that consistently produce results in Indian markets.",
      },
      {
        q: "Does candlestick analysis work in all markets and timeframes?",
        a: "Yes. Candlestick analysis is universal — it works in equities, F&O, commodities, and forex across all timeframes, though reliability varies by timeframe.",
      },
      {
        q: "Can I use candlestick analysis alone to trade profitably?",
        a: "Candlestick patterns are best used in combination with support/resistance levels, trend context, and volume confirmation. Tradeverse City teaches integration, not isolation.",
      },
      {
        q: "Is prior knowledge of technical analysis required?",
        a: "No. This course starts from the basics. However, completing Stock Market Fundamentals first is recommended.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Support & Resistance", slug: "support-and-resistance" },
      { label: "Price Action Trading", slug: "price-action-trading" },
      { label: "Technical Analysis", slug: "technical-analysis" },
    ],
  },

  // 3. Support & Resistance
  {
    slug: "support-and-resistance",
    title: "Support & Resistance",
    tagline: "Find the Levels Where the Market Makes Its Biggest Decisions",
    category: "Technical Skills",
    intro:
      "Support and Resistance are the most fundamental concepts in all of technical analysis. Every chart pattern, every indicator, every entry and exit decision is ultimately anchored to key price levels where buyers and sellers have historically battled. At Tradeverse City, the Support & Resistance course goes deep into identifying, drawing, and trading these levels with precision across all asset classes in the Indian market.",
    heroIcon: "M3 6h18M3 12h18M3 18h18",
    whatYouWillLearn: [
      "What support and resistance truly represent in terms of market psychology",
      "How to identify strong historical levels on any chart and any timeframe",
      "Static support/resistance: horizontal levels, round numbers, prior highs and lows",
      "Dynamic support/resistance: moving averages, trend lines, channels",
      "Role reversal: how broken support becomes resistance and vice versa",
      "The concept of zones vs lines — why exact levels are less important than areas",
      "How to grade level strength based on number of touches and time",
      "How volume confirms or rejects reactions at support and resistance",
      "How to use Fibonacci retracement levels as dynamic support and resistance",
      "Building a complete trading plan around key support and resistance levels",
    ],
    whyItMatters:
      "Professional traders plan every trade around key levels. Support and resistance determine where you place your stop-loss, where you take profit, and whether a trade setup is worth taking. Without a solid understanding of these levels, risk management is guesswork and trade planning is incomplete. This course makes level identification a systematic, repeatable process.",
    realMarketApplications: [
      {
        title: "Planning Trades the Night Before",
        desc: "Identify key levels on daily charts every evening so you have a clear plan before markets open — exactly what professional traders do.",
      },
      {
        title: "Stop-Loss Placement",
        desc: "Place stop-losses just beyond key support or resistance levels, not at arbitrary percentages, to avoid premature exits while limiting risk.",
      },
      {
        title: "Breakout Trading",
        desc: "When a resistance level is broken with strong volume and momentum, it becomes the new support — a powerful setup for continuation trades.",
      },
      {
        title: "Identifying High-Risk-Reward Setups",
        desc: "Buy near strong support with stop just below and target at the next resistance — a clearly defined risk-reward setup that removes emotion from trading.",
      },
    ],
    learningOutcomes: [
      "Accurately identify and draw key support and resistance levels on any chart",
      "Differentiate between weak and strong levels based on multiple technical factors",
      "Apply role reversal analysis to anticipate price behaviour at broken levels",
      "Combine static and dynamic levels to build a complete market map",
      "Use support and resistance to define entry, stop-loss, and target for every trade",
      "Avoid common drawing mistakes that cause poor level identification",
    ],
    commonMistakes: [
      {
        title: "Drawing Too Many Lines",
        desc: "The most common mistake is cluttering charts with dozens of levels. A professional chart has 3-5 key levels that matter, not 20 lines that create confusion.",
      },
      {
        title: "Treating Levels as Exact Prices",
        desc: "Support and resistance are zones, not exact prices. Price often pokes through a level before reversing. Trading zones, not lines, dramatically improves accuracy.",
      },
      {
        title: "Ignoring Timeframe Hierarchy",
        desc: "A weekly support level is far more significant than a 5-minute support level. Always respect the hierarchy: higher timeframe levels override lower timeframe levels.",
      },
      {
        title: "Not Waiting for Confirmation",
        desc: "Entering at a support level the moment price touches it without waiting for a confirming candlestick or reaction is a common and costly error.",
      },
    ],
    faqs: [
      {
        q: "How many support and resistance levels should I draw on a chart?",
        a: "Focus on the 3-5 most significant levels visible on the chart. Quality matters far more than quantity.",
      },
      {
        q: "What timeframe is best for drawing support and resistance?",
        a: "Always start with higher timeframes (weekly, daily) to identify the most significant levels, then drill down to your trading timeframe for precise entries.",
      },
      {
        q: "Do support and resistance levels work in Indian markets?",
        a: "Absolutely. Support and resistance are among the most reliable technical tools in Indian equity, F&O, and commodity markets.",
      },
      {
        q: "How do I know when a level will hold versus break?",
        a: "Volume, momentum, and the number of prior reactions at the level are the key factors. The course covers these in detail with live market examples.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Candlestick Analysis", slug: "candlestick-analysis" },
      { label: "Trend Analysis", slug: "trend-analysis" },
      { label: "Price Action Trading", slug: "price-action-trading" },
    ],
  },

  // 4. Trend Analysis
  {
    slug: "trend-analysis",
    title: "Trend Analysis",
    tagline: "Trade With the Market. Never Against It.",
    category: "Technical Skills",
    intro:
      "The oldest and most reliable principle in trading is: the trend is your friend. Trend Analysis at Tradeverse City teaches you to identify, confirm, and trade market trends across all timeframes with systematic precision. You will learn how to distinguish genuine trends from noise, how to enter trends at optimal points, and how to ride them for maximum profit while knowing exactly when they are ending.",
    heroIcon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    whatYouWillLearn: [
      "The three phases of a trend: accumulation, markup/markdown, and distribution",
      "How to define an uptrend using higher highs and higher lows (Dow Theory)",
      "How to define a downtrend using lower highs and lower lows",
      "Trend line drawing rules — the correct way to draw trend lines",
      "Trend channels: parallel channels for profit targets and entries",
      "How to identify trend strength using ADX (Average Directional Index)",
      "Moving average alignment as a trend filter",
      "How trends behave on different timeframes simultaneously",
      "Identifying trend exhaustion and early reversal signals",
      "Pullback trading: entering trends at the right moment, not the top",
    ],
    whyItMatters:
      "Most retail traders lose money because they fight trends — they short strong uptrends or buy into falling stocks hoping for a bounce. Understanding trend analysis prevents this fundamental error. When you trade with a confirmed trend, your win rate naturally improves because you have the entire market momentum working in your favour.",
    realMarketApplications: [
      {
        title: "Sector Trend Identification",
        desc: "Identify which sectors are in strong uptrends and focus stock selection within those sectors for the highest probability setups.",
      },
      {
        title: "Pullback Entries in Uptrends",
        desc: "Rather than chasing a stock that has already run 20%, wait for a pullback to the 20 EMA or trend line support for a defined-risk entry in the direction of the trend.",
      },
      {
        title: "Avoiding Counter-Trend Traps",
        desc: "Many beginners try to pick tops and bottoms. Trend analysis teaches you to wait for confirmed trend reversals before changing direction — saving significant capital.",
      },
      {
        title: "Multi-Timeframe Trend Alignment",
        desc: "When the weekly, daily, and hourly charts all show an uptrend, that alignment creates the highest-probability long setups available in the market.",
      },
    ],
    learningOutcomes: [
      "Identify uptrends, downtrends, and sideways markets on any timeframe with confidence",
      "Draw trend lines and channels accurately using proper technique",
      "Use moving averages and ADX to confirm trend direction and strength",
      "Execute pullback entries in trending markets with defined risk",
      "Apply multi-timeframe trend analysis to filter trade direction",
      "Identify trend exhaustion signals before a reversal occurs",
    ],
    commonMistakes: [
      {
        title: "Forcing Trends Where There Are None",
        desc: "Not all markets trend. Approximately 70% of market time is spent in sideways consolidation. Applying trend-following strategies in ranging markets produces consistent losses.",
      },
      {
        title: "Drawing Trend Lines Incorrectly",
        desc: "Most beginners force trend lines through wicks or draw subjective lines that do not represent genuine market structure. The course provides exact drawing rules.",
      },
      {
        title: "Entering Too Early on Trend Reversals",
        desc: "A single lower high does not confirm a reversal. Waiting for structural confirmation before calling a trend change saves significant capital from premature short positions in bull markets.",
      },
      {
        title: "Ignoring the Higher Timeframe Trend",
        desc: "Trading a short-term bearish signal against a strong weekly uptrend is fighting the dominant force. Higher timeframe trend always takes priority.",
      },
    ],
    faqs: [
      {
        q: "How long does a trend typically last?",
        a: "Trends vary enormously — from intraday trends lasting hours to macro trends lasting years. The course teaches trend identification at all durations.",
      },
      {
        q: "How do I know when a trend is about to reverse?",
        a: "Trend exhaustion signals include loss of momentum, decreasing volume on trend moves, divergence on RSI/MACD, and structural breaks. These are covered in detail.",
      },
      {
        q: "Should I always trade in the direction of the trend?",
        a: "For beginners, yes — trend-following dramatically improves win rates. Counter-trend trading requires advanced skills and is covered in later courses.",
      },
      {
        q: "What is the best indicator for trend identification?",
        a: "Price structure (higher highs/higher lows) is the primary tool. Moving averages (20 EMA and 200 MA) and ADX are powerful supporting indicators.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Support & Resistance", slug: "support-and-resistance" },
      { label: "Swing Trading", slug: "swing-trading" },
      { label: "Technical Analysis", slug: "technical-analysis" },
    ],
  },

  // 5. Technical Analysis
  {
    slug: "technical-analysis",
    title: "Technical Analysis",
    tagline: "The Complete System for Reading Any Market at Any Time",
    category: "Technical Skills",
    intro:
      "Technical Analysis is the flagship course at Tradeverse City — a comprehensive program that integrates chart reading, indicator mastery, pattern recognition, multi-timeframe analysis, and trade planning into one coherent system. This course is designed for traders who want to move from scattered knowledge to a professional, rules-based analytical framework that they can apply to any Indian market instrument.",
    heroIcon: "M3 3v18h18M7 16l4-4 4 4 4-8",
    whatYouWillLearn: [
      "A systematic top-down technical analysis framework used by professional traders",
      "All major chart patterns: head and shoulders, double top/bottom, flags, wedges, triangles",
      "Complete indicator toolkit: RSI, MACD, Stochastic, Bollinger Bands, ATR, OBV",
      "Volume analysis and its role in confirming price moves",
      "Multi-timeframe analysis: aligning weekly, daily, and intraday charts",
      "Building a complete technical analysis checklist for any trade setup",
      "Backtesting a technical strategy on Indian market data",
      "Combining technical signals into a high-probability entry framework",
      "Advanced concepts: divergence, Elliott Wave overview, Wyckoff principles",
      "Creating a personal trading system based on technical analysis",
    ],
    whyItMatters:
      "Technical analysis is the primary decision-making tool for the majority of active traders and many institutional desks. In Indian markets, where retail participation is high and patterns repeat reliably, technical analysis provides a systematic edge. Tradeverse City integrates every component into one coherent system — not a collection of isolated tools, but a complete professional framework.",
    realMarketApplications: [
      {
        title: "Full Trade Planning Workflow",
        desc: "From market overview to sector analysis to stock selection to entry setup — apply the complete technical analysis workflow before every trade.",
      },
      {
        title: "Indicator Confluence Trading",
        desc: "When RSI is oversold, price is at a key support, and a bullish candlestick forms — that confluence of signals creates the highest-probability entries.",
      },
      {
        title: "Chart Pattern Breakout Trading",
        desc: "Trade confirmed breakouts from consolidation patterns like flags and triangles with precise entry, stop-loss, and target calculation.",
      },
      {
        title: "Adapting to Different Market Conditions",
        desc: "Technical analysis is not a fixed recipe — this course teaches you to adjust your approach based on whether markets are trending, ranging, or at inflection points.",
      },
    ],
    learningOutcomes: [
      "Conduct a complete multi-timeframe technical analysis on any stock or index",
      "Identify and trade all major chart patterns with defined risk",
      "Use 10+ technical indicators correctly — understanding when each adds value",
      "Build a systematic, rules-based technical trading checklist",
      "Backtest a technical strategy and evaluate its performance",
      "Develop a personal trading system that integrates all technical analysis components",
    ],
    commonMistakes: [
      {
        title: "Indicator Overload",
        desc: "Using 8 indicators that all measure momentum creates redundancy, not accuracy. The course teaches a lean, non-redundant indicator setup.",
      },
      {
        title: "Treating Technical Analysis as Prediction",
        desc: "Technical analysis identifies probabilities, not certainties. Traders who expect charts to predict the future with precision set themselves up for frustration.",
      },
      {
        title: "Skipping the Higher Timeframe",
        desc: "Analysing only the 5-minute chart without checking the daily trend is like navigating without a map. Multi-timeframe context is mandatory.",
      },
      {
        title: "Changing Systems After Every Loss",
        desc: "No system wins 100% of the time. The biggest mistake is abandoning a sound system after a losing streak rather than trusting the edge over a large sample of trades.",
      },
    ],
    faqs: [
      {
        q: "How long does it take to become proficient in technical analysis?",
        a: "Basic proficiency takes 2-3 months of structured study and practice. Advanced fluency, where you read charts intuitively, typically develops over 6-12 months of active trading.",
      },
      {
        q: "Should I use fundamental analysis alongside technical analysis?",
        a: "For traders, technical analysis is the primary tool. A basic awareness of fundamentals — earnings, sector trends, news — adds useful context. Tradeverse City integrates both perspectives.",
      },
      {
        q: "Which technical analysis software is recommended?",
        a: "TradingView is recommended for all levels — it is free, powerful, and covers NSE, BSE, commodities, and global markets. The course is taught on TradingView.",
      },
      {
        q: "What prerequisites are needed for this course?",
        a: "Completing Stock Market Fundamentals and Candlestick Analysis first is highly recommended. This course builds on those foundations.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Candlestick Analysis", slug: "candlestick-analysis" },
      { label: "Price Action Trading", slug: "price-action-trading" },
      { label: "Risk Management", slug: "risk-management" },
    ],
  },

  // 6. Price Action Trading
  {
    slug: "price-action-trading",
    title: "Price Action Trading",
    tagline: "Trade Directly from the Chart. No Lag. No Noise.",
    category: "Advanced Trading",
    intro:
      "Price Action Trading is the purest form of chart analysis. By removing lagging indicators and trading only from raw price movement, structure, and key levels, price action traders develop an intuitive understanding of market dynamics that indicator-dependent traders never achieve. This Tradeverse City course builds a complete price action trading system around the six highest-probability price action setups in Indian markets.",
    heroIcon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h13M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
    whatYouWillLearn: [
      "Why price action is considered the most reliable form of technical analysis",
      "How to read market structure: identifying swing highs, swing lows, and key levels",
      "Inside bars: what they represent and how to trade breakouts from them",
      "Pin bars (hammer and shooting star equivalents): precision reversal entries",
      "Fakey setups: false breakout patterns that trap retail traders",
      "The concept of confluence: combining price action with key levels",
      "Entry techniques: aggressive vs conservative entry for each setup",
      "Stop-loss placement based purely on price structure",
      "Profit target methods: structure-based vs fixed R-multiple targets",
      "Building a complete price action trading plan with defined rules",
    ],
    whyItMatters:
      "Indicators are derived from price — they always lag. Price action is what is actually happening in the market right now. Traders who master price action can read charts faster, identify setups earlier, and place stops more precisely than those reliant on indicators. In volatile Indian markets, the ability to read raw price movement is a genuine competitive advantage.",
    realMarketApplications: [
      {
        title: "Trading Pin Bars at Key Levels",
        desc: "A strong pin bar rejection at a weekly support level provides an aggressive entry with the stop just below the wick — a defined-risk, high-probability setup.",
      },
      {
        title: "Inside Bar Breakouts",
        desc: "An inside bar forming at a key resistance, followed by a breakout candle, signals potential trend continuation — one of the cleanest setups in price action trading.",
      },
      {
        title: "Fakey Breakout Counter-Trades",
        desc: "Price breaks a key level, trapping breakout traders, then reverses sharply. The fakey setup exploits this trap for a high-momentum counter-trade.",
      },
      {
        title: "Reading Institutional Intent",
        desc: "Large bodies, minimal wicks, and high volume candles at key levels signal institutional participation — price action teaches you to read and follow the smart money.",
      },
    ],
    learningOutcomes: [
      "Read raw price charts without relying on any indicators",
      "Identify the six core price action setups with precision",
      "Apply structure-based stop-loss placement for every price action trade",
      "Evaluate trade quality before entry using a price action checklist",
      "Build a complete price action trading system with specific entry rules",
      "Distinguish between genuine signals and market noise on any timeframe",
    ],
    commonMistakes: [
      {
        title: "Taking Setups Without Confluence",
        desc: "A pin bar in the middle of a range with no supporting level is a low-quality setup. Price action only performs reliably when combined with key structural levels.",
      },
      {
        title: "Forcing Patterns That Are Not There",
        desc: "Not every bar is a pin bar. Precise identification criteria — the wick must be at least twice the size of the body — prevent forcing low-quality patterns.",
      },
      {
        title: "Using Price Action on Low-Liquidity Instruments",
        desc: "Price action works best on highly liquid instruments (Nifty 50 stocks, indices, major F&O) where institutional activity creates reliable patterns.",
      },
      {
        title: "Not Accounting for Market Context",
        desc: "A bearish pin bar in a strong bull trend should be ignored. Market context — the dominant trend — determines whether a setup should be taken.",
      },
    ],
    faqs: [
      {
        q: "Do I need to know about indicators before learning price action?",
        a: "It helps to understand what indicators measure so you appreciate why price action is more direct. However, the course is self-contained and starts from the basics of price structure.",
      },
      {
        q: "Can price action be used for intraday trading?",
        a: "Yes. Price action works on all timeframes including 1-minute, 5-minute, and 15-minute intraday charts. However, higher timeframes (1H, 4H, daily) provide more reliable setups.",
      },
      {
        q: "How many price action setups should I master?",
        a: "Master 3-4 setups deeply and trade them consistently. Breadth of setups is less important than depth of mastery and consistency of execution.",
      },
      {
        q: "How long before I become confident with price action?",
        a: "Most students see improvement in chart reading within 4-6 weeks. Confident, consistent execution typically develops over 3-6 months of practice.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Support & Resistance", slug: "support-and-resistance" },
      { label: "Candlestick Analysis", slug: "candlestick-analysis" },
      { label: "Swing Trading", slug: "swing-trading" },
    ],
  },

  // 7. Swing Trading
  {
    slug: "swing-trading",
    title: "Swing Trading",
    tagline: "Capture Multi-Day Market Moves Without Watching Screens All Day",
    category: "Trading Styles",
    intro:
      "Swing trading is the preferred trading style for those who want professional-level returns without the stress of intraday trading. By holding positions from a few days to a few weeks, swing traders capture the larger moves in the market while maintaining a manageable lifestyle. At Tradeverse City, the Swing Trading course builds a complete system — from setup identification to trade management to exit strategy — designed specifically for Indian markets.",
    heroIcon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    whatYouWillLearn: [
      "How swing trading differs from intraday and positional trading",
      "The swing trading mindset: patience, planning, and process over impulse",
      "Swing trade setup identification: trend pullbacks, pattern breakouts, and key level bounces",
      "Stock selection criteria for swing trades: liquidity, trend quality, and sector strength",
      "Entry timing: waiting for confirmation vs aggressive entry tradeoffs",
      "Stop-loss placement for multi-day holding: structure-based vs ATR-based",
      "Profit target calculation: measured move, resistance levels, and R-multiple targets",
      "Trade management: scaling out, trailing stops, and adjusting stops to breakeven",
      "Overnight and weekend risk: managing gaps and news events",
      "Building a weekly swing trading routine including review and planning",
    ],
    whyItMatters:
      "Swing trading is arguably the most accessible professional trading style. It does not require constant screen monitoring, can be managed around a day job or other commitments, and when done correctly, can generate consistent monthly returns from a handful of well-planned trades. Tradeverse City's swing trading system is built around Indian market rhythms and proven setups that work consistently.",
    realMarketApplications: [
      {
        title: "Weekly Sector Rotation Trading",
        desc: "Every Sunday, identify the strongest sectors, select the best stocks within them, and plan your swing entries for the week ahead — a professional weekly routine.",
      },
      {
        title: "Earnings Season Swing Setups",
        desc: "Stocks in strong uptrends that beat earnings estimates often continue their move for 3-7 days — a reliable swing opportunity that recurs every quarter.",
      },
      {
        title: "Post-Breakout Pullback Entry",
        desc: "After a stock breaks out of a pattern, wait for the first pullback to the breakout level. This gives a lower-risk entry in the direction of the new trend.",
      },
      {
        title: "Index-Level Swing Trades on Nifty",
        desc: "Use Nifty futures or Bank Nifty derivatives to trade index-level swings of 1-3%, capturing broader market moves with defined risk.",
      },
    ],
    learningOutcomes: [
      "Build a systematic process for identifying and evaluating swing trade setups",
      "Select stocks based on trend quality, sector strength, and technical structure",
      "Execute swing trades with precise entry, stop-loss, and target levels",
      "Manage open trades through trailing stops, partial profit-booking, and adjustment rules",
      "Develop a weekly planning and review routine for consistent swing trading",
      "Calculate position size for swing trades accounting for overnight gap risk",
    ],
    commonMistakes: [
      {
        title: "Turning Swing Trades into Investments",
        desc: "When a swing trade goes against you, averaging down and holding indefinitely converts a defined-risk trade into an uncontrolled loss. Respect your stop-loss.",
      },
      {
        title: "Trading Too Many Stocks Simultaneously",
        desc: "Managing 10 open swing positions is stressful and usually leads to poor execution. 3-5 high-quality positions managed well consistently outperforms a scattered approach.",
      },
      {
        title: "Ignoring Overnight Risk",
        desc: "Gaps caused by after-market news can move a stock 5-10% overnight. Position sizing must account for potential gap risk, especially around major events.",
      },
      {
        title: "Chasing Late Entries",
        desc: "Entering a swing trade after it has already moved 5% from the ideal entry dramatically reduces the risk-reward ratio. Better to wait for the next setup.",
      },
    ],
    faqs: [
      {
        q: "How much time per day does swing trading require?",
        a: "Approximately 30-60 minutes in the morning for pre-market preparation and 30 minutes in the evening for market review. It is compatible with a full-time job.",
      },
      {
        q: "How many trades should I take per month?",
        a: "Quality over quantity. 4-8 well-selected swing trades per month is a professional approach. More does not mean better results.",
      },
      {
        q: "What capital is needed to start swing trading?",
        a: "Contact Tradeverse City for guidance on appropriate capital allocation based on your risk tolerance and learning stage.",
      },
      {
        q: "Can I swing trade options and futures?",
        a: "Yes. The course covers swing trading in both equities and F&O instruments, with specific adjustments for leverage and expiry management.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Trend Analysis", slug: "trend-analysis" },
      { label: "Risk Management", slug: "risk-management" },
      { label: "Trading Psychology", slug: "trading-psychology" },
    ],
  },

  // 8. Intraday Trading
  {
    slug: "intraday-trading",
    title: "Intraday Trading",
    tagline: "Master the Skills to Trade Profitably Within a Single Session",
    category: "Trading Styles",
    intro:
      "Intraday trading is the most demanding and potentially most rewarding trading style. All positions are entered and exited within a single trading session, with no overnight exposure. At Tradeverse City, the Intraday Trading course builds a complete, professional-grade intraday system — covering setup identification, entry timing, stop-loss discipline, profit targets, risk per trade, and the critical mental framework required to handle the speed and pressure of intraday markets.",
    heroIcon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    whatYouWillLearn: [
      "How intraday market structure differs from swing and positional trading",
      "The best timeframes for intraday analysis: 5-minute, 15-minute, and 1-hour charts",
      "Pre-market preparation: identifying the top intraday opportunities every morning",
      "Opening range breakout (ORB) strategy: the most widely used intraday setup",
      "How to trade the first 15-minute candle for directional bias",
      "Intraday support and resistance: identifying intraday pivot levels",
      "Momentum-based intraday entries using volume and price action",
      "When to avoid trading: news releases, low-volume periods, and choppy markets",
      "Strict daily loss limits: knowing when to stop for the day",
      "Building an intraday trading journal for performance improvement",
    ],
    whyItMatters:
      "Intraday trading amplifies both the rewards and the risks of trading. Without a systematic approach, it becomes gambling. With the right system — precise entries, tight stops, clear targets, and absolute discipline around daily loss limits — intraday trading can generate consistent returns. Tradeverse City's intraday course teaches the discipline, structure, and setups needed to trade professionally within the session.",
    realMarketApplications: [
      {
        title: "Opening Range Breakout (ORB)",
        desc: "Mark the high and low of the first 15 minutes of trading. Trade the breakout of this range in the direction of the broader trend — one of the most reliable intraday setups.",
      },
      {
        title: "Pre-Market Level Planning",
        desc: "Mark previous day high, low, and close every morning. These levels act as intraday support and resistance, giving you a complete map before the session opens.",
      },
      {
        title: "VWAP Trading",
        desc: "The Volume Weighted Average Price is the institutional benchmark. Stocks trading above VWAP with momentum are in an intraday uptrend; below VWAP signals intraday weakness.",
      },
      {
        title: "News-Driven Momentum Trades",
        desc: "When a stock breaks out strongly on news with high volume, the first pullback to VWAP or the breakout level offers a defined-risk momentum entry.",
      },
    ],
    learningOutcomes: [
      "Conduct effective pre-market preparation within 30 minutes each morning",
      "Identify the top 3 intraday opportunities each session systematically",
      "Execute opening range breakout and other core intraday setups with precision",
      "Apply strict daily loss limits and know exactly when to stop trading for the day",
      "Use VWAP and intraday pivot levels for entry and exit decisions",
      "Maintain a detailed intraday trading journal to track and improve performance",
    ],
    commonMistakes: [
      {
        title: "Overtrading",
        desc: "Taking 15-20 trades per day out of boredom or the need for action is the fastest way to destroy an intraday account. Professional intraday traders take 2-4 high-quality setups per day.",
      },
      {
        title: "Ignoring the Daily Loss Limit",
        desc: "The daily loss limit is the single most important rule in intraday trading. Blowing through it trying to 'recover' turns a bad day into an account-destroying day.",
      },
      {
        title: "Trading in the First and Last 15 Minutes",
        desc: "The first and last 15 minutes of every session are the most volatile and unpredictable. Many professional intraday traders avoid this period entirely.",
      },
      {
        title: "Revenge Trading After Losses",
        desc: "After hitting your daily loss limit, the urge to trade back to break-even is powerful and destructive. The course includes specific protocols for handling losses.",
      },
    ],
    faqs: [
      {
        q: "Is intraday trading suitable for beginners?",
        a: "Tradeverse City recommends beginners complete at least Technical Analysis, Risk Management, and Trading Psychology before attempting intraday trading with real capital.",
      },
      {
        q: "What capital is needed for intraday trading?",
        a: "Contact Tradeverse City for guidance on appropriate capital sizing, which depends on the instruments traded and your risk tolerance.",
      },
      {
        q: "How many trades should I make per day?",
        a: "Quality over quantity. Professional intraday traders typically take 2-4 high-probability setups per session. More trades do not mean more profit.",
      },
      {
        q: "Can I do intraday trading while working a full-time job?",
        a: "Intraday trading requires active monitoring during market hours (9:15 AM - 3:30 PM IST). It is challenging to combine with a full-time job. Swing trading is more compatible.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Risk Management", slug: "risk-management" },
      { label: "Trading Psychology", slug: "trading-psychology" },
      { label: "Technical Analysis", slug: "technical-analysis" },
    ],
  },

  // 9. Risk Management
  {
    slug: "risk-management",
    title: "Risk Management",
    tagline: "The Skill That Separates Long-Term Traders from Those Who Quit",
    category: "Core Discipline",
    intro:
      "Risk Management is the single most important skill in trading — more important than any entry strategy or technical indicator. Without it, even the best analysis leads to eventual ruin. The Risk Management course at Tradeverse City covers position sizing, stop-loss strategy, risk-reward ratios, drawdown management, and the complete capital protection framework used by professional traders in Indian and global markets.",
    heroIcon:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    whatYouWillLearn: [
      "Why risk management is the foundation of long-term trading profitability",
      "The 1-2% rule: how to calculate exactly how much to risk per trade",
      "Position sizing formula: calculating the correct number of shares or contracts",
      "Stop-loss placement: technical vs percentage-based stops and why structure wins",
      "Risk-to-reward ratio: why a 1:2 RR with a 40% win rate is profitable",
      "Daily and weekly loss limits: hard rules that protect you from catastrophic losses",
      "Correlation risk: avoiding multiple positions with the same underlying exposure",
      "Drawdown management: rules for reducing size and pausing during losing streaks",
      "Trailing stop-losses: locking in profits while letting winners run",
      "Risk management for leveraged instruments: futures and options specifics",
    ],
    whyItMatters:
      "A trader with a mediocre strategy and excellent risk management will survive and grow. A trader with an excellent strategy but poor risk management will eventually blow up their account. This is the fundamental truth of trading. Tradeverse City places risk management at the center of all training because it is the one skill that determines whether a trading career survives long enough to become profitable.",
    realMarketApplications: [
      {
        title: "Calculating Position Size in Real Time",
        desc: "Before entering any trade, calculate the correct position size based on your stop-loss distance and maximum risk per trade. This takes 30 seconds and prevents over-sizing.",
      },
      {
        title: "Adjusting Size During Drawdowns",
        desc: "When your account drops 5%, automatically reduce position size by 25%. When it drops 10%, move to half size. This prevents a losing streak from becoming account destruction.",
      },
      {
        title: "The Daily Loss Limit in Practice",
        desc: "Set a hard rule: if you lose X amount on any single day, close all positions and stop trading. Successful intraday and swing traders all use this rule.",
      },
      {
        title: "Optimising Risk-Reward for Your Strategy",
        desc: "Analyse your historical win rate and adjust your minimum required risk-reward ratio so your strategy is mathematically profitable over a large sample.",
      },
    ],
    learningOutcomes: [
      "Calculate correct position size for any trade based on account size and stop-loss",
      "Apply the 1-2% rule consistently across all trades and instruments",
      "Place technical stop-losses based on chart structure rather than arbitrary percentages",
      "Evaluate any trade setup's expected value based on win rate and risk-reward",
      "Implement daily and weekly loss limits as hard, non-negotiable rules",
      "Adjust position sizing during drawdowns to protect capital during losing streaks",
    ],
    commonMistakes: [
      {
        title: "Over-Sizing Positions",
        desc: "The most common and most damaging mistake. Risking 10-20% of capital on a single trade means two losses in a row can be catastrophic. The 1-2% rule eliminates this risk.",
      },
      {
        title: "Moving Stop-Losses Further Away",
        desc: "When a trade moves against you, widening the stop 'just a little' to avoid being stopped out is a decision made from hope, not logic. Your stop placement was based on analysis — respect it.",
      },
      {
        title: "Not Accounting for Slippage",
        desc: "In actual trading, especially in less liquid instruments, stop-losses may be executed at prices worse than the order. Build a small slippage buffer into risk calculations.",
      },
      {
        title: "Ignoring Risk During Winning Streaks",
        desc: "After a series of wins, overconfidence leads to larger position sizes. This is when proper risk management is most important — a losing trade at double size can erase multiple wins.",
      },
    ],
    faqs: [
      {
        q: "What percentage of capital should I risk per trade?",
        a: "Professional traders risk 0.5-2% of total capital per trade. For beginners, 0.5-1% is recommended until consistent profitability is established.",
      },
      {
        q: "How do I calculate position size?",
        a: "Position Size = (Account Risk in Rupees) / (Stop-Loss Distance per Share). The course walks through this calculation with multiple real-market examples.",
      },
      {
        q: "Is risk management different for options?",
        a: "Yes. Options have unique risk characteristics including premium decay, gamma risk near expiry, and unlimited theoretical risk for option sellers. The course covers F&O risk management specifically.",
      },
      {
        q: "Should beginners start with very small capital?",
        a: "Yes. Starting with a smaller amount you are comfortable losing entirely reduces emotional pressure and allows you to focus on learning the process, not protecting large sums.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Trading Psychology", slug: "trading-psychology" },
      { label: "Intraday Trading", slug: "intraday-trading" },
      { label: "Swing Trading", slug: "swing-trading" },
    ],
  },

  // 10. Trading Psychology
  {
    slug: "trading-psychology",
    title: "Trading Psychology",
    tagline: "Your Mind Is Your Most Important Trading Tool",
    category: "Core Discipline",
    intro:
      "Studies consistently show that over 80% of trading losses are caused by emotional decision-making, not by poor strategy. Fear causes premature exits. Greed causes over-holding. Revenge trading destroys accounts. Overconfidence follows winning streaks. The Trading Psychology course at Tradeverse City addresses all of these issues through structured, practical mental frameworks that transform how you approach every trade.",
    heroIcon:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    whatYouWillLearn: [
      "The psychology of winning and losing — why our brains are wired against us in trading",
      "How to identify and eliminate FOMO (Fear of Missing Out) trades",
      "Revenge trading: the cycle, the triggers, and the specific rules to stop it",
      "Loss aversion bias and how it prevents traders from cutting losses at the right time",
      "Confirmation bias: why traders see what they want to see on charts",
      "Building a written trading plan and developing the discipline to follow it",
      "The trader's mindset: probabilistic thinking and process over outcomes",
      "Trading journal methodology: recording trades and the emotions behind them",
      "Meditation and focus techniques adapted for active traders",
      "How to recover psychologically from a significant loss or drawdown",
    ],
    whyItMatters:
      "You can have the world's best trading strategy and still lose money if your psychology is broken. Every professional trader — from institutional desk traders to successful retail traders — invests in their mental game. Tradeverse City integrates psychology training into every course, and this dedicated psychology course goes deeper, providing the tools and frameworks to build the mind of a consistently profitable trader.",
    realMarketApplications: [
      {
        title: "Pre-Trading Mental Checklist",
        desc: "A 5-minute mental preparation routine before each session that ensures you are in the right state to trade — not tired, frustrated, or distracted.",
      },
      {
        title: "The Pause Protocol After Losses",
        desc: "After hitting your daily loss limit, a specific 24-hour protocol — journaling, reviewing, not trading — that prevents revenge trading the next day.",
      },
      {
        title: "Detaching from Individual Trade Outcomes",
        desc: "Viewing every trade as one of 100 in a statistical sequence eliminates emotional attachment to individual wins and losses — a perspective shift that changes everything.",
      },
      {
        title: "FOMO Management System",
        desc: "When you see a stock you missed up 5% already, a specific decision framework prevents chasing — and helps you find the next, better setup instead.",
      },
    ],
    learningOutcomes: [
      "Identify the specific cognitive biases affecting your trading decisions",
      "Apply the trader's mindset: probabilistic thinking across a series of trades",
      "Build a consistent pre-trading mental preparation routine",
      "Use a structured trading journal to identify and correct behavioural patterns",
      "Implement specific protocols for handling losses, drawdowns, and FOMO",
      "Develop the discipline to follow your trading plan consistently under market pressure",
    ],
    commonMistakes: [
      {
        title: "Thinking Losses Are Always About Strategy",
        desc: "When a losing streak occurs, the instinct is to change strategy. Often the strategy is fine — the problem is execution, which is psychological.",
      },
      {
        title: "Not Keeping a Trading Journal",
        desc: "Traders who do not journal their emotions alongside their trades have no way to identify the specific psychological patterns causing recurring mistakes.",
      },
      {
        title: "Rushing Back to Trading After a Big Loss",
        desc: "Re-entering the market immediately after a significant loss, while still emotionally activated, nearly always leads to further losses. A structured pause is essential.",
      },
      {
        title: "Celebrating Wins Without Reviewing Process",
        desc: "A profitable trade made by breaking your rules is more dangerous than a losing trade made correctly. Reviewing process, not just outcome, builds lasting discipline.",
      },
    ],
    faqs: [
      {
        q: "Can trading psychology be taught, or is it just about personality?",
        a: "While personality traits differ, the habits, frameworks, and mental tools of professional traders can absolutely be learned and developed with consistent practice.",
      },
      {
        q: "I know what I should do but cannot do it under pressure. Will this course help?",
        a: "This is the most common problem the course addresses. The gap between knowing and doing under pressure is psychological, and this course provides specific tools to close it.",
      },
      {
        q: "Do I need to see a therapist alongside this course?",
        a: "No. The course provides practical, trading-specific mental tools. However, for traders dealing with serious emotional or anxiety issues, professional support is always a valid option alongside training.",
      },
      {
        q: "Is psychology covered in other Tradeverse City courses?",
        a: "Psychology is woven throughout all courses at Tradeverse City. This dedicated course provides deeper, focused training on the mental dimension of trading.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Risk Management", slug: "risk-management" },
      { label: "Intraday Trading", slug: "intraday-trading" },
      { label: "Swing Trading", slug: "swing-trading" },
    ],
  },

  // 11. Options Trading Fundamentals
  {
    slug: "options-trading-fundamentals",
    title: "Options Trading Fundamentals",
    tagline: "Understand Options Before You Trade Them",
    category: "Derivatives",
    intro:
      "Options are among the most powerful and most misunderstood financial instruments available to Indian traders. When used correctly, they provide defined-risk exposure, leverage, and hedging capabilities unavailable with simple stock positions. When used incorrectly, they can lose value rapidly. The Options Trading Fundamentals course at Tradeverse City builds a complete conceptual foundation — from what an option is, to Greeks, to basic strategies — so you can trade options with genuine understanding.",
    heroIcon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    whatYouWillLearn: [
      "What a call option and put option are — plain language explanations",
      "The difference between option buyer and option seller (writer)",
      "Strike price, expiry date, premium, and in-the-money/out-of-the-money concepts",
      "The four Greek letters: Delta, Gamma, Theta, Vega — what each measures and why it matters",
      "How time decay (Theta) erodes option premium — and who benefits",
      "How implied volatility (IV) affects option pricing",
      "Basic option strategies: long call, long put, covered call, protective put",
      "How to read an options chain on NSE",
      "Weekly vs monthly expiry: risk and opportunity differences",
      "Common beginner mistakes in options trading and how to avoid them",
    ],
    whyItMatters:
      "Indian F&O markets are among the most liquid derivative markets in the world. Options trading is growing rapidly among retail participants, but most enter without adequate preparation. Understanding the fundamental mechanics — how premium is priced, how Greeks affect your position, and how time decay works — is not optional for options traders. Tradeverse City provides the complete foundation required to navigate options markets safely.",
    realMarketApplications: [
      {
        title: "Buying a Put for Hedging",
        desc: "If you hold a large equity position going into an uncertain market event, buying a put option provides insurance against a sharp downside move.",
      },
      {
        title: "Reading the Options Chain for Market Sentiment",
        desc: "The put-call ratio, highest open interest strikes, and IV skew in the Nifty options chain reveal where institutional money is positioned.",
      },
      {
        title: "Understanding Your Delta Exposure",
        desc: "Knowing your option's Delta tells you how much the option price will change for a 1-rupee move in the underlying — essential for sizing positions correctly.",
      },
      {
        title: "Theta as an Income Tool",
        desc: "Option sellers benefit from time decay. Understanding Theta and its acceleration near expiry is essential for sellers of weekly options.",
      },
    ],
    learningOutcomes: [
      "Explain how call and put options work from both buyer and seller perspectives",
      "Interpret an options chain on NSE and identify key information",
      "Calculate the breakeven price for any basic option position",
      "Describe how each Greek (Delta, Gamma, Theta, Vega) affects an option position",
      "Apply basic option strategies for directional trades and hedging",
      "Avoid the most common and costly mistakes made by options beginners",
    ],
    commonMistakes: [
      {
        title: "Buying Out-of-the-Money Options Near Expiry",
        desc: "Deep OTM options expiring this week have very low Delta and extremely high Theta decay — they are essentially lottery tickets with poor odds.",
      },
      {
        title: "Ignoring Implied Volatility",
        desc: "Buying options when IV is extremely high means paying inflated premiums that crush profitability even when your directional view is correct.",
      },
      {
        title: "Not Understanding Maximum Loss",
        desc: "Option buyers have limited and defined risk. Option sellers face large potential losses. Understanding your maximum possible loss before entering is non-negotiable.",
      },
      {
        title: "Trading Options Without a Directional View",
        desc: "Options amplify directional moves. Trading options without a clear, researched view of price direction and timing turns a precision instrument into a gamble.",
      },
    ],
    faqs: [
      {
        q: "Do I need to understand technical analysis before learning options?",
        a: "Yes. Options are instruments — technical analysis tells you what direction to trade. Completing Technical Analysis before this course is strongly recommended.",
      },
      {
        q: "Is options trading riskier than equity trading?",
        a: "It depends on how you use them. Option buyers have defined, limited risk. Option sellers face higher risk. The course explains the risk profile of every strategy clearly.",
      },
      {
        q: "Can beginners start with options?",
        a: "Tradeverse City recommends building a strong foundation in technical analysis, risk management, and trading psychology before entering options markets.",
      },
      {
        q: "What is the difference between Nifty weekly and monthly options?",
        a: "Weekly options expire every Thursday, providing higher leverage but faster time decay. Monthly options have more time, higher premiums, and are better suited for some strategies.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Futures Market Basics", slug: "futures-market-basics" },
      { label: "Risk Management", slug: "risk-management" },
      { label: "Technical Analysis", slug: "technical-analysis" },
    ],
  },

  // 12. Futures Market Basics
  {
    slug: "futures-market-basics",
    title: "Futures Market Basics",
    tagline: "Understand Leverage, Margin, and Futures Before You Commit Capital",
    category: "Derivatives",
    intro:
      "Futures contracts are standardised agreements to buy or sell an asset at a future date and price. In India, stock futures, index futures (Nifty, Bank Nifty), currency futures, and commodity futures are all actively traded. The Futures Market Basics course at Tradeverse City covers the complete mechanics of futures trading — contract structure, margin requirements, settlement, hedging applications, and the specific risk management adjustments needed for leveraged futures positions.",
    heroIcon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    whatYouWillLearn: [
      "What a futures contract is and how it differs from buying equity shares",
      "Lot size, contract value, and how leverage works in futures",
      "Margin requirements: initial margin, exposure margin, and MTM (mark-to-market)",
      "How daily mark-to-market settlement works and its cash flow implications",
      "Nifty futures and Bank Nifty futures: structure, liquidity, and applications",
      "Stock futures: when to use them instead of buying the underlying",
      "Rolling over positions: understanding expiry and rollover costs",
      "Hedging with futures: how to protect an equity portfolio using index futures",
      "Basis and cost of carry: understanding how futures price relates to spot price",
      "Risk management adjustments required specifically for futures positions",
    ],
    whyItMatters:
      "Futures amplify both gains and losses through leverage. A 10% move in the underlying can mean a 50-100% gain or loss on a futures position. Without understanding margin mechanics, rollover, and the specific risks of leveraged instruments, trading futures is extremely dangerous. Tradeverse City ensures students understand every aspect of futures mechanics before committing real capital.",
    realMarketApplications: [
      {
        title: "Index Futures for Directional Trades",
        desc: "When technical analysis suggests a significant Nifty move, index futures provide leveraged exposure to the entire market move with a single position.",
      },
      {
        title: "Portfolio Hedging",
        desc: "A large equity portfolio can be temporarily protected against market falls by selling Nifty futures — a strategy used by institutional investors routinely.",
      },
      {
        title: "Pair Trades Using Stock Futures",
        desc: "Buy the stronger stock and sell the weaker stock in the same sector using futures — a market-neutral strategy that profits from relative performance.",
      },
      {
        title: "Understanding Margin Calls",
        desc: "When a futures position moves against you and your account balance falls below maintenance margin, a margin call requires immediate top-up or position closure.",
      },
    ],
    learningOutcomes: [
      "Explain the structure and mechanics of futures contracts in Indian markets",
      "Calculate the margin requirement and P&L for any futures position",
      "Understand and manage daily MTM settlement cash flows",
      "Apply futures for both directional trading and portfolio hedging",
      "Manage the rollover of expiring futures positions correctly",
      "Adjust position sizing and risk management for leveraged futures positions",
    ],
    commonMistakes: [
      {
        title: "Under-Estimating Leverage Risk",
        desc: "A 5% adverse move in Nifty futures can wipe out 25-50% of the margin capital deployed. Futures require tighter stops and smaller position sizes than equity trading.",
      },
      {
        title: "Ignoring Rollover Costs",
        desc: "Holding futures into expiry without rolling over, or rolling at unfavourable times, results in unnecessary costs that erode returns over time.",
      },
      {
        title: "Not Monitoring MTM Closely",
        desc: "Daily mark-to-market means losses are debited from your account every evening. Not monitoring this can lead to unexpected margin calls the next morning.",
      },
      {
        title: "Trading Futures Without a Stop-Loss",
        desc: "Unlike equity positions that you can hold through a drawdown, highly leveraged futures positions without stop-losses can reach margin-call levels very quickly.",
      },
    ],
    faqs: [
      {
        q: "How much capital is required to trade Nifty futures?",
        a: "The margin requirement for one lot of Nifty futures changes with volatility. Contact Tradeverse City for guidance on current requirements and appropriate position sizing.",
      },
      {
        q: "What is the difference between futures and options?",
        a: "Both are derivatives. Futures have an obligation to buy/sell at expiry; options give the right but not the obligation. Futures have symmetric risk; options have asymmetric risk profiles.",
      },
      {
        q: "Can futures be used for intraday trading?",
        a: "Yes. Index futures (Nifty, Bank Nifty) are among the most popular intraday instruments in India due to their high liquidity and tight spreads.",
      },
      {
        q: "Are stock futures better than buying the stock?",
        a: "For short-term directional trades with leverage, stock futures provide capital efficiency. For longer-term positions, equity is generally preferred due to no expiry and no rollover costs.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Options Trading Fundamentals", slug: "options-trading-fundamentals" },
      { label: "Risk Management", slug: "risk-management" },
      { label: "Technical Analysis", slug: "technical-analysis" },
    ],
  },

  // 13. Portfolio Management
  {
    slug: "portfolio-management",
    title: "Portfolio Management",
    tagline: "Build, Diversify, and Grow a Portfolio That Survives Any Market",
    category: "Advanced Trading",
    intro:
      "Portfolio Management is the discipline of building and maintaining a collection of investments and trades that collectively achieve your financial goals while managing overall risk. At Tradeverse City, this course addresses how to construct a portfolio across multiple stocks and instruments, how to manage the overall risk exposure, how to rebalance, and how to think about both trading and investing components together as an integrated financial plan.",
    heroIcon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
    whatYouWillLearn: [
      "The difference between a trading portfolio and an investment portfolio",
      "Asset allocation: how to spread capital across equities, cash, and other instruments",
      "Diversification: how many stocks to hold and why more is not always better",
      "Correlation between stocks: understanding when your 'diversified' portfolio moves as one",
      "Sector allocation: balancing exposure across different sectors of the economy",
      "Rebalancing: when and how to adjust portfolio weights to maintain your target allocation",
      "Performance measurement: CAGR, Sharpe ratio, maximum drawdown, and win rate",
      "Building a watchlist and pipeline: always having qualified candidates ready",
      "Tax considerations for traders and investors in India",
      "Creating a personal investment policy statement (IPS)",
    ],
    whyItMatters:
      "Most traders focus exclusively on individual trade decisions while neglecting the bigger picture — how all their positions interact at the portfolio level. A single stock can go to zero. A diversified portfolio cannot. Understanding portfolio construction and management transforms you from a trade-by-trade decision maker into a strategic manager of capital — the hallmark of long-term financial success.",
    realMarketApplications: [
      {
        title: "Quarterly Portfolio Review",
        desc: "A structured quarterly process to review all positions, remove underperformers, add new opportunities, and rebalance sector weights — keeping the portfolio aligned with your goals.",
      },
      {
        title: "Tracking Aggregate Risk Exposure",
        desc: "If you hold five IT stocks, your portfolio is heavily correlated — essentially one large IT bet. Portfolio management teaches you to identify and manage this concentration risk.",
      },
      {
        title: "Separating Trading and Investment Capital",
        desc: "Maintaining separate accounts for active trading and long-term investing prevents trading losses from eroding long-term wealth, and vice versa.",
      },
      {
        title: "Measuring True Portfolio Performance",
        desc: "Calculate your actual returns after accounting for all costs, taxes, and cash drag — the true measure of portfolio performance rather than just gross returns.",
      },
    ],
    learningOutcomes: [
      "Construct a diversified portfolio with appropriate sector and asset class allocation",
      "Calculate and manage overall portfolio risk, not just individual trade risk",
      "Implement a systematic rebalancing process to maintain target allocations",
      "Measure portfolio performance using professional metrics including Sharpe ratio",
      "Identify and manage correlation risk across multiple positions",
      "Create a personal investment policy statement to guide all portfolio decisions",
    ],
    commonMistakes: [
      {
        title: "Concentrating in One Sector",
        desc: "A portfolio of 10 stocks all in the banking sector is not diversified — it is one large banking bet. True diversification requires meaningful exposure across uncorrelated sectors.",
      },
      {
        title: "Holding Too Many Positions",
        desc: "Holding 30+ stocks dilutes your edge and makes active monitoring impossible. 10-15 high-conviction positions managed well typically outperforms a scattered 30-stock portfolio.",
      },
      {
        title: "Not Rebalancing",
        desc: "Without rebalancing, winning positions grow to dominate the portfolio, concentrating risk in stocks that have already moved. Regular rebalancing maintains the intended risk profile.",
      },
      {
        title: "Measuring Returns Without Accounting for Risk",
        desc: "A 30% return with 40% drawdown is worse than a 20% return with 10% drawdown. Risk-adjusted returns are the correct measure of portfolio quality.",
      },
    ],
    faqs: [
      {
        q: "How many stocks should a retail trader hold in a portfolio?",
        a: "For most retail traders, 8-15 high-quality positions provides adequate diversification without over-diluting conviction.",
      },
      {
        q: "Should I have separate accounts for trading and investing?",
        a: "Yes. Keeping trading capital and investment capital separate improves discipline, makes performance tracking cleaner, and prevents short-term losses from affecting long-term holdings.",
      },
      {
        q: "How often should I rebalance my portfolio?",
        a: "Most traders benefit from quarterly reviews. However, if a position grows to more than 25% of the portfolio, an immediate rebalancing consideration is warranted.",
      },
      {
        q: "What is the right asset allocation for someone in their 30s?",
        a: "Asset allocation is highly personal and depends on income, risk tolerance, goals, and time horizon. Tradeverse City provides personalised guidance through mentorship.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Risk Management", slug: "risk-management" },
      { label: "Market Research Techniques", slug: "market-research-techniques" },
      { label: "Stock Market Fundamentals", slug: "stock-market-fundamentals" },
    ],
  },

  // 14. Market Research Techniques
  {
    slug: "market-research-techniques",
    title: "Market Research Techniques",
    tagline: "Build Trade Decisions on Data, Evidence, and Structure",
    category: "Advanced Trading",
    intro:
      "Market Research Techniques is the course that bridges technical analysis and fundamental understanding for the complete trader. You will learn how to research individual stocks, evaluate sector dynamics, interpret macroeconomic data, track institutional activity, and build a disciplined research process that supports every trade and investment decision. At Tradeverse City, we build traders who understand why prices move, not just how they move.",
    heroIcon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    whatYouWillLearn: [
      "The top-down research framework: economy → sector → stock",
      "How to read and interpret basic financial statements: P&L, balance sheet, cash flow",
      "Key financial ratios every trader should know: PE, EPS, ROE, debt-to-equity, ROCE",
      "Sector analysis: identifying leading sectors and rotating capital appropriately",
      "FII and DII data: how to track and interpret institutional flows",
      "How RBI policy, inflation data, and global events affect Indian equity markets",
      "IPO research checklist: evaluating new listings before participation",
      "Building and maintaining a dynamic stock watchlist",
      "Using Screener.in, Moneycontrol, and NSE data tools effectively",
      "Creating a research note for every trade idea to maintain consistency",
    ],
    whyItMatters:
      "Technical analysis tells you when to buy. Research tells you what to buy. The combination of solid research with precise technical execution is what separates traders who achieve consistent, compounding returns from those who generate inconsistent results. Market research reduces the risk of trading technically perfect setups in fundamentally broken stocks — a costly and avoidable mistake.",
    realMarketApplications: [
      {
        title: "Pre-Earnings Research",
        desc: "Before a key earnings release, research the company's last four quarters, analyst expectations, sector momentum, and the stock's technical setup — a complete picture in one workflow.",
      },
      {
        title: "Sector Rotation Identification",
        desc: "When IT stocks begin underperforming while infrastructure stocks accelerate, sector rotation research tells you to shift capital — before the full move plays out.",
      },
      {
        title: "IPO Due Diligence",
        desc: "Before subscribing to an IPO, run the Tradeverse City checklist: promoter background, financials, sector quality, valuation, and grey market premium — a 30-minute process that saves costly mistakes.",
      },
      {
        title: "FII Activity as a Market Signal",
        desc: "Sustained FII buying in a sector over multiple sessions is a powerful leading indicator of sector momentum — research tools that track this data provide an early edge.",
      },
    ],
    learningOutcomes: [
      "Apply the top-down research framework to identify the best stocks in the best sectors",
      "Read and interpret basic financial statements without an accounting background",
      "Calculate and use key financial ratios to evaluate stock quality",
      "Track FII/DII flows and interpret their implications for market direction",
      "Conduct a complete IPO research process using a structured checklist",
      "Build and maintain a dynamic watchlist of high-quality research-backed trade candidates",
    ],
    commonMistakes: [
      {
        title: "Trading on Tips Without Research",
        desc: "Acting on WhatsApp tips or social media recommendations without independent research is gambling, not trading. Every trade decision should be backed by your own analysis.",
      },
      {
        title: "Ignoring Macro Context",
        desc: "Even a technically perfect setup in a sector being actively sold by FIIs is a lower-probability trade. Macro research provides the essential context technical charts alone cannot show.",
      },
      {
        title: "Over-Researching and Under-Trading",
        desc: "Research should enhance decisions, not paralyse them. The goal is a systematic, time-efficient process that produces actionable conclusions — not endless analysis without execution.",
      },
      {
        title: "Using Only a Single Data Source",
        desc: "Relying entirely on one website or data provider creates blind spots. Cross-referencing two to three sources takes minutes and catches errors that single-source research misses.",
      },
    ],
    faqs: [
      {
        q: "Do I need to be good at accounting to do market research?",
        a: "No. The course teaches you to interpret the key numbers in a financial statement — you do not need accounting training. The calculations involved are simple and tool-assisted.",
      },
      {
        q: "How much time should market research take per week?",
        a: "An effective weekly research routine takes 3-5 hours: 1 hour for sector review, 2-3 hours for individual stock research, and 30 minutes for macro data review.",
      },
      {
        q: "Which tools does Tradeverse City recommend for market research?",
        a: "We recommend Screener.in for financials, TradingView for charts, NSE official portal for data, and Moneycontrol for news. All are free to use.",
      },
      {
        q: "How does research improve risk management?",
        a: "Research-backed trades have a higher probability of success and allow more accurate risk management because you understand why the trade should work, not just that it looks good on a chart.",
      },
      {
        q: "How do I get started with this course?",
        a: "Simply reach out to Tradeverse City on WhatsApp or Telegram. Our team will walk you through the course structure, upcoming batches, mentorship options, and help you choose the right path forward.",
      },
    ],
    relatedCourses: [
      { label: "Portfolio Management", slug: "portfolio-management" },
      { label: "Stock Market Fundamentals", slug: "stock-market-fundamentals" },
      { label: "Technical Analysis", slug: "technical-analysis" },
    ],
  },
]
