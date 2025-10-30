// API endpoint for ChatGPT content generation
// /api/generate-content.js

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { contentType } = req.body;

    let generatedContent;

    switch (contentType) {
      case 'signals':
        generatedContent = await generateTradingSignals();
        break;
      case 'news':
        generatedContent = await generateFinancialNews();
        break;
      case 'analysis':
        generatedContent = await generateMarketAnalysis();
        break;
      case 'education':
        generatedContent = await generateEducationalContent();
        break;
      case 'daily':
        generatedContent = await generateDailyContent();
        break;
      default:
        return res.status(400).json({ error: 'Invalid content type' });
    }

    // Store in database (add your database logic here)
    // await saveToDatabase(generatedContent);

    res.status(200).json({
      success: true,
      data: generatedContent,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// Generate trading signals
async function generateTradingSignals() {
  const prompt = `
  Generate 6-8 high-quality trading signals for global financial markets today.

  Include:
  - Major stocks (Apple, Microsoft, Tesla, Amazon, Google, NVIDIA, JPMorgan, Visa)
  - Forex pairs (EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD)
  - Commodities (Gold, Silver, Crude Oil, Natural Gas, Copper)
  - Global indices (S&P 500, NASDAQ, FTSE 100, DAX, Nikkei 225)
  - Cryptocurrencies (Bitcoin, Ethereum)

  For each signal provide:
  - Symbol name
  - Signal type (BUY/SELL/STRONG BUY/STRONG SELL)
  - Entry price (realistic current market levels)
  - Target price
  - Stop loss
  - Confidence level (75-95%)
  - Timeframe (1H, 4H, 1D, 1W)
  - Brief technical reasoning (2-3 sentences)
  - Risk/reward ratio

  Return as JSON array. Make the signals realistic and actionable.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Cost-effective: $0.150 per 1M input tokens vs $30 for GPT-4
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2500,
  });

  return JSON.parse(response.choices[0].message.content);
}

// Generate financial news
async function generateFinancialNews() {
  const prompt = `
  Create 4-5 comprehensive financial news articles for global markets:

  Topics to cover:
  1. Banking sector update (JPMorgan, Goldman Sachs, Bank of America earnings or sector trends)
  2. Currency market (EUR/USD, GBP/USD trends, Federal Reserve policy, global forex movements)
  3. Stock market movements (S&P 500, NASDAQ, global indices, institutional flows, market outlook)
  4. Technology sector (FAANG stocks, AI developments, semiconductor industry updates)
  5. Economic policy or central bank decisions (Fed, ECB, BoE monetary policy impact)

  Each article should include:
  - Compelling, professional headline
  - 150-word executive summary
  - 800-1200 word detailed article
  - Market impact analysis
  - Key statistics and data points
  - Expert quotes (realistic financial analysts)
  - Trading recommendations
  - Author name (realistic financial journalist)
  - Read time estimate
  - Relevant tags

  Make the content informative, professional, and relevant to current market conditions.
  Return as JSON array.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Cost-effective: $0.150 per 1M input tokens vs $30 for GPT-4
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 4000,
  });

  return JSON.parse(response.choices[0].message.content);
}

// Generate market analysis
async function generateMarketAnalysis() {
  const prompt = `
  Create comprehensive daily market analysis for global financial markets:

  Sections to include:
  1. Market Overview (S&P 500, NASDAQ, Dow Jones, global indices performance, key movers)
  2. Sectoral Analysis (Technology, Financials, Healthcare, Energy, Consumer sectors)
  3. Currency Analysis (EUR/USD, GBP/USD, USD/JPY trends, Fed policy impact)
  4. Global Market Impact (international events, geopolitical factors, economic trends)
  5. Technical Analysis (key support/resistance levels, chart patterns, momentum indicators)
  6. Economic Indicators (inflation, interest rates, employment data, GDP)
  7. Tomorrow's Key Events (earnings releases, economic data, central bank announcements)
  8. Trading Strategy (recommended assets, risk management, diversification)

  Provide:
  - Executive summary (3-4 sentences)
  - Detailed analysis for each section (100-150 words each)
  - Key levels to watch (specific numbers)
  - Market sentiment indicators
  - Risk factors and opportunities
  - Actionable trading recommendations

  Make it professional and data-driven. Return as JSON object.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Cost-effective: $0.150 per 1M input tokens vs $30 for GPT-4
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
    max_tokens: 2000,
  });

  return JSON.parse(response.choices[0].message.content);
}

// Generate educational content
async function generateEducationalContent() {
  const prompt = `
  Create daily educational content for trading education:

  Generate 5 educational pieces:
  1. Daily Trading Tip (practical, actionable advice for all markets)
  2. Technical Analysis Lesson (chart patterns, indicators, candlestick formations)
  3. Risk Management Insight (capital preservation, position sizing, diversification)
  4. Market Fundamentals (economic indicators, earnings analysis, sector rotation)
  5. Trading Psychology Tip (emotional control, discipline, cognitive biases)

  Each piece should be:
  - Beginner to intermediate level
  - 200-300 words
  - Include practical examples from global markets
  - Reference current market conditions when relevant
  - Actionable and educational

  Also include:
  - Quiz question for each topic
  - Key takeaway summary
  - Recommended further reading

  Return as JSON object with structured educational content.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Cost-effective: $0.150 per 1M input tokens vs $30 for GPT-4
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2500,
  });

  return JSON.parse(response.choices[0].message.content);
}

// Generate complete daily content package
async function generateDailyContent() {
  const [signals, news, analysis, education] = await Promise.all([
    generateTradingSignals(),
    generateFinancialNews(),
    generateMarketAnalysis(),
    generateEducationalContent()
  ]);

  return {
    signals,
    news,
    analysis,
    education,
    generatedAt: new Date().toISOString(),
    market: 'Global',
    version: '1.0'
  };
}

// Automated daily generation (can be called by cron job)
export async function generateAndStoreDailyContent() {
  try {
    const dailyContent = await generateDailyContent();

    // Store in your database
    // await storeInDatabase(dailyContent);

    // Send notifications to Exness subscribers
    // await notifySubscribers(dailyContent);

    console.log('✅ Daily content generated successfully');
    return dailyContent;

  } catch (error) {
    console.error('❌ Daily content generation failed:', error);
    throw error;
  }
}

// Rate limiting and cost management
const API_USAGE_TRACKER = {
  dailyRequests: 0,
  lastReset: new Date().toDateString(),
  maxDailyRequests: 50, // Adjust based on your budget

  canMakeRequest() {
    const today = new Date().toDateString();
    if (this.lastReset !== today) {
      this.dailyRequests = 0;
      this.lastReset = today;
    }
    return this.dailyRequests < this.maxDailyRequests;
  },

  incrementUsage() {
    this.dailyRequests++;
  }
};