const assert = require("node:assert");
const { simulate } = require("../calculator");

function near(actual, expected, tolerance = 0.01) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

function last(result) {
  return result.yearData[result.yearData.length - 1];
}

{
  const result = simulate({
    initial: 1000,
    monthly: 0,
    years: 5,
    unitPrice: 100,
    distributionYield: 0,
    distributionGrowth: 0,
    priceGrowth: 0,
    reinvest: true,
  });
  near(last(result).units, 10);
  near(last(result).totalAccountValue, 1000);
  near(last(result).totalReturn, 0);
}

{
  const result = simulate({
    initial: 1000,
    monthly: 100,
    years: 1,
    unitPrice: 100,
    distributionYield: 0,
    distributionGrowth: 0,
    priceGrowth: 0,
    reinvest: true,
  });
  near(last(result).units, 22);
  near(last(result).totalInvested, 2200);
  near(last(result).totalAccountValue, 2200);
}

{
  const result = simulate({
    initial: 1000,
    monthly: 0,
    years: 2,
    unitPrice: 100,
    distributionYield: 0,
    distributionGrowth: 0,
    priceGrowth: 10,
    reinvest: true,
  });
  near(last(result).unitPrice, 121);
  near(last(result).totalAccountValue, 1210);
  near(last(result).totalReturn, 210);
}

{
  const result = simulate({
    initial: 0,
    monthly: 100,
    years: 1,
    unitPrice: 100,
    distributionYield: 0,
    distributionGrowth: 0,
    priceGrowth: 12,
    reinvest: true,
  });
  near(last(result).totalAccountValue, 1264.65, 0.05);
}

{
  const result = simulate({
    initial: 1200,
    monthly: 0,
    years: 1,
    unitPrice: 100,
    distributionYield: 12,
    distributionGrowth: 0,
    priceGrowth: 0,
    reinvest: true,
  });
  near(last(result).units, 13.5219, 0.0001);
  near(last(result).totalAccountValue, 1352.19, 0.01);
  near(last(result).distributionsReinvested, 152.19, 0.01);
}

{
  const result = simulate({
    initial: 1200,
    monthly: 0,
    years: 1,
    unitPrice: 100,
    distributionYield: 12,
    distributionGrowth: 0,
    priceGrowth: 0,
    reinvest: false,
  });
  near(last(result).holdingValue, 1200);
  near(last(result).cashDistributions, 144);
  near(last(result).totalAccountValue, 1344);
  near(last(result).totalReturn, 144);
}

{
  const result = simulate({
    initial: 1000,
    monthly: 100,
    contributionGrowth: 10,
    years: 2,
    unitPrice: 100,
    distributionYield: 0,
    distributionGrowth: 0,
    priceGrowth: 0,
    reinvest: true,
  });
  near(last(result).totalInvested, 3520);
  near(last(result).totalAccountValue, 3520);
  near(last(result).units, 35.2);
}

console.log("calculator tests passed");
