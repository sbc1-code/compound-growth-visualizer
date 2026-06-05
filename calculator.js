(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.CompoundGrowth = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function monthlyRateFromAnnual(percent) {
    return Math.pow(1 + percent / 100, 1 / 12) - 1;
  }

  function toNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function simulate(input) {
    const params = {
      initial: Math.max(0, toNumber(input.initial, 0)),
      monthly: Math.max(0, toNumber(input.monthly, 0)),
      contributionGrowth: toNumber(input.contributionGrowth, 0),
      years: Math.max(0, Math.floor(toNumber(input.years, 0))),
      unitPrice: Math.max(0.01, toNumber(input.unitPrice, 1)),
      distributionYield: Math.max(0, toNumber(input.distributionYield, 0)),
      distributionGrowth: toNumber(input.distributionGrowth, 0),
      priceGrowth: toNumber(input.priceGrowth, 0),
      reinvest: input.reinvest !== false,
    };

    const monthlyPriceGrowth = monthlyRateFromAnnual(params.priceGrowth);
    const monthlyDistributionGrowth = monthlyRateFromAnnual(params.distributionGrowth);

    let unitPrice = params.unitPrice;
    let annualDistributionPerUnit = unitPrice * (params.distributionYield / 100);
    let units = params.initial / unitPrice;
    let monthlyContribution = params.monthly;
    let totalInvested = params.initial;
    let totalDistributionsEarned = 0;
    let cashDistributions = 0;
    let distributionsReinvested = 0;

    const yearLabels = ["Start"];
    const yearData = [snapshot(0, 0, 0)];

    function snapshot(year, yearContributions, yearDistributions) {
      const holdingValue = units * unitPrice;
      const forwardAnnualDistribution = annualDistributionPerUnit * units;
      const totalAccountValue = holdingValue + cashDistributions;
      const totalReturn = totalAccountValue - totalInvested;

      return {
        year,
        units,
        unitPrice,
        holdingValue,
        cashDistributions,
        distributionsReinvested,
        totalDistributionsEarned,
        totalInvested,
        totalAccountValue,
        monthlyDistributionIncome: forwardAnnualDistribution / 12,
        annualDistributionIncome: forwardAnnualDistribution,
        totalReturn,
        totalReturnPct: totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0,
        yearContributions,
        yearDistributions,
        marketMovement:
          totalAccountValue - totalInvested - cashDistributions - distributionsReinvested,
      };
    }

    for (let year = 1; year <= params.years; year += 1) {
      let yearContributions = 0;
      let yearDistributions = 0;

      for (let month = 0; month < 12; month += 1) {
        unitPrice *= 1 + monthlyPriceGrowth;
        annualDistributionPerUnit *= 1 + monthlyDistributionGrowth;

        const monthlyDistribution = (annualDistributionPerUnit / 12) * units;
        totalDistributionsEarned += monthlyDistribution;
        yearDistributions += monthlyDistribution;

        if (params.reinvest && monthlyDistribution > 0) {
          units += monthlyDistribution / unitPrice;
          distributionsReinvested += monthlyDistribution;
        } else {
          cashDistributions += monthlyDistribution;
        }

        if (monthlyContribution > 0) {
          units += monthlyContribution / unitPrice;
          totalInvested += monthlyContribution;
          yearContributions += monthlyContribution;
        }
      }

      yearLabels.push("Year " + year);
      yearData.push(snapshot(year, yearContributions, yearDistributions));
      monthlyContribution *= 1 + params.contributionGrowth / 100;
    }

    return { params, yearLabels, yearData };
  }

  return { monthlyRateFromAnnual, simulate };
});
