# Compound Growth Visualizer

Interactive dividend reinvestment (DRIP) simulator built to model long-term compound returns from income-producing equities.

**[Live Demo](https://sbc1-code.github.io/compound-growth-visualizer/)**

---

## What It Does

Plug in your numbers — initial investment, monthly contributions, dividend yield, growth assumptions — and see how compounding plays out over 5-40 years. The tool visualizes:

- **Portfolio value trajectory** with and without DRIP comparison
- **Monthly dividend income** growth over time
- **Share accumulation** from contributions + reinvested dividends
- **Source breakdown** — how much comes from cash invested vs. dividends vs. appreciation
- **Milestone tracking** — when you hit $500/mo income, $1M portfolio, etc.
- **Year-by-year table** with full detail

All parameters update in real-time via range sliders. No backend, no accounts — everything runs in your browser.

## Why I Built It

I wanted to see the actual math behind dividend reinvestment before committing capital. Most online calculators are either oversimplified (no contribution growth, no DRIP toggle) or behind a paywall. This shows the full picture in one screen.

## Stack

- Vanilla JavaScript (no framework)
- [Chart.js](https://www.chartjs.org/) for visualization
- Single HTML file, zero dependencies to install
- GitHub Pages hosting — $0/mo

## Run Locally

Just open `index.html` in a browser.

## License

MIT
