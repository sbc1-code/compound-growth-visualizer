# Compound Growth Visualizer

Interactive calculator for modeling long-term compound growth across stocks, ETFs, funds, crypto, real estate shares, or any investment with recurring contributions and optional distributions.

**[Live Demo](https://sbc1-code.github.io/compound-growth-visualizer/)**

---

## What It Does

Plug in your assumptions and see how compounding plays out over 1-40 years. The tool visualizes:

- **Account value trajectory** with optional reinvestment comparison
- **Monthly distribution income** growth over time
- **Units owned** from contributions and reinvested distributions
- **Source breakdown** showing cash invested, distributions, and market movement
- **Milestone tracking** for income and portfolio targets
- **Year-by-year table** with full detail

All parameters update in real time. No backend, no accounts, and no live price feed. Everything runs in your browser from the assumptions you enter.

## Why I Built It

I wanted a transparent way to test investment scenarios without locking the math to one ticker or one income strategy. Most calculators hide the assumptions or flatten important details like contribution growth, distribution reinvestment, and cash distributions. This keeps the model visible.

This is not financial advice and it does not fetch live market prices.

## Math Model

- Annual price growth and distribution growth are converted to effective monthly rates.
- Price growth is applied at the start of each month.
- Distributions are paid monthly from the current annual distribution rate.
- Reinvested distributions buy more units at the current unit price.
- Cash distributions are retained as account value when reinvestment is off.
- Monthly contributions are invested at the end of each month.
- Annual contribution growth applies after each completed year.

## Stack

- Vanilla JavaScript (no framework)
- [Chart.js](https://www.chartjs.org/) for visualization
- Small shared calculator module with Node-based math tests
- GitHub Pages hosting, $0/mo

## Run Locally

Just open `index.html` in a browser.

Run the math checks:

```bash
node tests/calculator.test.js
```

## License

MIT
