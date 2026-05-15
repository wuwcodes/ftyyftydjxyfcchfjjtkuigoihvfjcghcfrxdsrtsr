import { useState } from "react";

const TODAY = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

const STEPS = [
  {
    id: "market",
    num: "01",
    time: "9:00 AM — before open",
    label: "Market Check",
    emoji: "🌍",
    tag: "Run first. Every day.",
    tagColor: "#22c55e",
    description: "Tells you if today is green/yellow/red and how aggressively to trade.",
    fillable: [],
    template: `You are a professional momentum trading analyst. I trade growth and momentum stocks with 2–5 day holds. My account is under $5,000.

Today is ${TODAY}.

## Morning Market Check

Search the web for current market conditions and answer:

1. **Market trend** — Is the S&P 500 and Nasdaq in an uptrend, downtrend, or chop right now? Where are they relative to their 10-day and 50-day moving averages?
2. **Volatility** — What is the VIX reading today? Is it calm (<18), elevated (18–25), or fearful (>25)?
3. **Risk-on or risk-off?** — Are growth and tech stocks leading or lagging the market this week?
4. **Hot sectors** — Which 1–2 sectors have the strongest momentum right now?
5. **Today's verdict** — Based on the above, should I be:
   - 🟢 AGGRESSIVE — full position sizes, actively looking for trades
   - 🟡 CAUTIOUS — half sizes only, very selective
   - 🔴 FLAT — no new trades today, protect capital

Be direct. No filler. End with the single emoji verdict on its own line.`,
  },
  {
    id: "scan",
    num: "02",
    time: "9:15 AM — before open",
    label: "Stock Scan",
    emoji: "🔍",
    tag: "Run after market check",
    tagColor: "#3b82f6",
    description: "Get 3–5 ranked momentum candidates with entry, stop, and target.",
    fillable: [
      { key: "TICKERS_WATCHING", label: "Any tickers you're already watching?", placeholder: "e.g. NVDA, SMCI, RXRX — or leave blank for fresh ideas" }
    ],
    template: `You are a professional momentum trading analyst. I trade growth and momentum stocks with 2–5 day holds. My account is under $5,000. I risk max $75 per trade (1.5% of account).

Today is ${TODAY}.
Tickers I'm already watching: [TICKERS_WATCHING]

## Morning Stock Scan

Search the web for today's top momentum setups. Find me 3–5 stocks that match ALL of these:
- Strong relative strength (outperforming the S&P this week)
- A real catalyst in the last 1–5 days (earnings beat, guidance raise, analyst upgrade, major contract, FDA approval, etc.)
- Price between $10–$200
- Breaking out of a base OR pulling back to a key level after a recent breakout
- Volume confirming the move (above average)

For each stock output this exact format:

**[TICKER] — Company name**
- Catalyst: [what's driving it]
- Setup: [what the chart is doing right now]
- Entry zone: [specific price or range to buy]
- Stop loss: [where I'm wrong, specific price]
- 2–5 day target: [realistic price target]
- Risk/reward: [X:1]
- Conviction: 🔥 High / ⚡ Medium / 👀 Watchlist only

---

End with: **Top pick today: [TICKER]** and one sentence explaining why it's #1.`,
  },
  {
    id: "deep",
    num: "03",
    time: "Before any trade",
    label: "Deep Dive",
    emoji: "🧠",
    tag: "Run before entering a position",
    tagColor: "#a855f7",
    description: "Full analysis + position sizing for your $5k account before you pull the trigger.",
    fillable: [
      { key: "TICKER", label: "Ticker", placeholder: "e.g. NVDA" },
      { key: "WHAT_YOU_KNOW", label: "What you know about it", placeholder: "e.g. broke out today on earnings, up 9%, beat EPS by $0.30, raised guidance" },
    ],
    template: `You are a professional momentum trading analyst. I trade growth and momentum stocks with 2–5 day holds. My account is $5,000. I risk max $75 per trade (1.5%).

Today is ${TODAY}.
Stock I want to analyze: [TICKER]
What I know: [WHAT_YOU_KNOW]

## Pre-Trade Deep Dive

Search for the latest news, earnings data, and analyst commentary on [TICKER]. Then give me:

**1. Catalyst quality**
What exactly happened? Was it a genuine surprise vs expectations? Rate it: Weak / Moderate / Strong / Exceptional

**2. Chart structure**
Describe the base, the breakout, and the volume pattern. Is this a clean textbook setup or sloppy?

**3. Risk/reward math**
Given a realistic entry, stop, and 2–5 day target — what is the R:R ratio? Is it 2:1 or better?

**4. Market fit**
Does this stock fit today's market environment (sector rotation, risk-on/off)?

**5. Red flags**
What are the top 2–3 reasons this trade could fail? How serious are they?

**6. Position sizing for $5k account**
If my stop is X% below entry, how many shares can I buy to keep risk under $75?
Show the math: (Max risk $75) ÷ (stop distance in $) = shares

**7. Trade plan**
- Entry: 
- Stop loss: 
- Target 1 (sell half): 
- Target 2 (trail stop on rest): 
- Early exit trigger: [what would make me leave before the target]

**FINAL VERDICT: TAKE IT / PASS / WAIT FOR BETTER ENTRY**
One sentence explaining the verdict.`,
  },
  {
    id: "hold",
    num: "04",
    time: "While in a trade",
    label: "Hold or Exit?",
    emoji: "🚪",
    tag: "Run anytime you're unsure",
    tagColor: "#f59e0b",
    description: "One clear action on your open position — hold, trim, or exit.",
    fillable: [
      { key: "TICKER", label: "Ticker", placeholder: "e.g. NVDA" },
      { key: "ENTRY", label: "Your entry price", placeholder: "e.g. $142.50" },
      { key: "CURRENT", label: "Current price", placeholder: "e.g. $151.20" },
      { key: "DAYS", label: "Days held", placeholder: "e.g. 2 days" },
      { key: "THESIS", label: "Original reason you bought", placeholder: "e.g. earnings beat + breakout from 3-week base on high volume" },
    ],
    template: `You are a professional momentum trading analyst. I trade growth and momentum stocks with 2–5 day holds. My account is $5,000.

Today is ${TODAY}.
Open position: [TICKER]
Entry price: [ENTRY]
Current price: [CURRENT]
Days held: [DAYS]
Original thesis: [THESIS]

## Hold or Exit Decision

Search for any news on [TICKER] from the last 24–48 hours. Then assess:

**1. Thesis check**
Is the original reason I bought still valid? Has anything changed — earnings, news, management, sector?

**2. Price action quality**
Is the stock acting strong (holding gains, tight, pushing higher on good volume) or weak (fading, wide swings, losing key levels)?

**3. Time check**
I'm at [DAYS] days. Am I inside my 2–5 day window or past it? Does the setup still warrant holding?

**4. Exit signals — check each:**
- [ ] Volume drying up (down 50%+ from breakout day)?
- [ ] Stock below 10-day moving average?
- [ ] Original catalyst fading or reversed?
- [ ] Sector rotating out?
- [ ] Broad market weakening today?

**5. Profit/stop management**
Should I raise my stop to lock in gains? Take partial profits here?

**DECISION:**
🟢 HOLD — [reason, new stop level if applicable]
🟡 TRIM — sell [X]% at current price, trail stop on the rest to [price]
🔴 EXIT — close the full position because [reason]

Give me ONE action. Be direct.`,
  },
  {
    id: "review",
    num: "05",
    time: "After market close",
    label: "Trade Review",
    emoji: "📓",
    tag: "Run after closing a trade",
    tagColor: "#64748b",
    description: "Extract the lesson from every trade so you stop repeating mistakes.",
    fillable: [
      { key: "TICKER", label: "Ticker", placeholder: "e.g. NVDA" },
      { key: "ENTRY", label: "Entry price", placeholder: "e.g. $142.50" },
      { key: "EXIT", label: "Exit price", placeholder: "e.g. $153.00" },
      { key: "RESULT", label: "Result", placeholder: "e.g. +$52 gain / -$38 loss" },
      { key: "WHAT_HAPPENED", label: "What happened during the trade", placeholder: "e.g. broke out day 1, hit target on day 2, sold too early before it ran another 5%" },
    ],
    template: `You are a trading coach helping me improve. I trade growth and momentum stocks, $5k account, 2–5 day holds.

Today is ${TODAY}.
Trade: [TICKER]
Entry: [ENTRY] → Exit: [EXIT]
Result: [RESULT]
What happened: [WHAT_HAPPENED]

## Post-Trade Review

Analyze this trade and give me honest feedback:

**1. Did I follow my rules?**
- Did I have a stop loss defined before entry? Did I honor it?
- Was my position size within my $75 max risk rule?
- Did I exit for a rule-based reason or an emotional one?

**2. What did I do well?**
Be specific — what decisions were correct regardless of outcome?

**3. What was my biggest mistake?**
One specific thing I did wrong or could have done better.

**4. What would the ideal version of this trade look like?**
Walk me through the perfect entry, management, and exit for this exact setup.

**5. The lesson**
One sentence I should write in my journal and remember for the next similar setup.

**Grade: A / B / C / D**
(Based on process and rule-following, NOT profit/loss)`,
  },
];

export default function PromptSequence() {
  const [active, setActive] = useState(0);
  const [fills, setFills] = useState({});
  const [copied, setCopied] = useState(false);

  const step = STEPS[active];

  const setFill = (key, val) => setFills(f => ({ ...f, [`${step.id}_${key}`]: val }));
  const getFill = (key) => fills[`${step.id}_${key}`] || "";

  const buildPrompt = () => {
    let p = step.template;
    step.fillable.forEach(f => {
      const val = getFill(f.key);
      p = p.replaceAll(`[${f.key}]`, val || `[${f.placeholder}]`);
    });
    return p;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div style={{ fontFamily: "'DM Mono', 'Fira Code', monospace", maxWidth: 660, padding: "0.5rem 0 2rem" }}>
      <style>{`
        textarea { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: 6px; padding: 8px 10px; color: var(--color-text-primary); font-family: inherit; font-size: 12px; width: 100%; box-sizing: border-box; resize: vertical; }
        textarea:focus { outline: 1px solid var(--color-border-primary); }
        .step-pill { cursor: pointer; border-radius: 6px; border: 0.5px solid var(--color-border-tertiary); padding: 10px 12px; transition: all 0.12s; background: transparent; text-align: left; width: 100%; }
        .step-pill:hover { border-color: var(--color-border-secondary); }
        .copy-area { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: 8px; padding: 14px; font-size: 11px; color: var(--color-text-secondary); white-space: pre-wrap; max-height: 240px; overflow-y: auto; line-height: 1.65; font-family: inherit; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "4px 0 0", letterSpacing: "0.06em" }}>
          COPY → PASTE INTO CLAUDE.AI → GET YOUR ANSWER
        </p>
      </div>

      {/* Step nav — vertical on left, content on right */}
      <div style={{ display: "flex", gap: 12 }}>

        {/* Step list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 130 }}>
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              className="step-pill"
              onClick={() => { setActive(i); setCopied(false); }}
              style={{
                background: active === i ? "var(--color-background-primary)" : "transparent",
                borderColor: active === i ? "var(--color-border-primary)" : "var(--color-border-tertiary)",
              }}
            >
              <div style={{ fontSize: 16, marginBottom: 2 }}>{s.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: active === i ? 600 : 400, color: "var(--color-text-primary)" }}>{s.label}</div>
              <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 2 }}>{s.time}</div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Step header */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 22 }}>{step.emoji}</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)" }}>{step.label}</span>
              <span style={{
                fontSize: 10, padding: "2px 7px", borderRadius: 4, fontWeight: 500,
                background: step.tagColor + "22", color: step.tagColor,
              }}>{step.tag}</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{step.description}</p>
          </div>

          {/* Fill-in fields */}
          {step.fillable.length > 0 && (
            <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", margin: 0, letterSpacing: "0.06em" }}>FILL IN YOUR DETAILS</p>
              {step.fillable.map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 11, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>{f.label}</label>
                  <textarea
                    rows={2}
                    value={getFill(f.key)}
                    onChange={e => setFill(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Prompt preview */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", letterSpacing: "0.06em" }}>YOUR PROMPT</span>
              <button
                onClick={copy}
                style={{
                  fontSize: 11, padding: "4px 12px",
                  background: copied ? "#22c55e22" : "var(--color-background-primary)",
                  color: copied ? "#22c55e" : "var(--color-text-primary)",
                  border: `0.5px solid ${copied ? "#22c55e" : "var(--color-border-tertiary)"}`,
                  borderRadius: 5, cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s",
                }}
              >
                {copied ? "✓ Copied!" : "⎘ Copy prompt"}
              </button>
            </div>
            <div className="copy-area">{buildPrompt()}</div>
          </div>

          {/* Next step hint */}
          {active < STEPS.length - 1 && (
            <div
              onClick={() => setActive(active + 1)}
              style={{
                marginTop: 10, fontSize: 11, color: "var(--color-text-tertiary)",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
              }}
            >
              Next → {STEPS[active + 1].emoji} {STEPS[active + 1].label}
            </div>
          )}
        </div>
      </div>

      {/* Footer guide */}
      <div style={{
        marginTop: 20, padding: "12px 14px",
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: 8, fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.7,
      }}>
        <div style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 4 }}>How to use this</div>
        1. Pick a step → fill in your details → hit Copy<br />
        2. Open a new Claude.ai chat → paste → send<br />
        3. Claude will web-search current market data and give you a real answer<br />
        <span style={{ color: "var(--color-text-tertiary)" }}>Daily sequence: Market Check → Stock Scan → Deep Dive (before each trade) → Hold or Exit (open positions) → Trade Review (after closing)</span>
      </div>
    </div>
  );
}
