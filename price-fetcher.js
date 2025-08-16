const fetch = require('node-fetch');
const cheerio = require('cheerio');
const database = require('./database');

/**
 * Fetches the latest price for a fund from the Financial Times website.
 * @param {string} identifier - The fund's identifier (e.g., 'gb00b80qpz27:gbp').
 * @returns {Promise<number|null>} The price of the fund, or null if it cannot be fetched.
 */
async function fetchPriceForIdentifier(identifier) {
  const url = `https://markets.ft.com/data/funds/tearsheet/summary?s=${identifier}`;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    // The class name in the task description was incorrect.
    // The correct selector is 'span.mod-ui-data-list__value'.
    const priceText = $('span.mod-ui-data-list__value').first().text();
    if (priceText) {
      return parseFloat(priceText.replace(/,/g, ''));
    }
    return null;
  } catch (error) {
    console.error(`Error fetching price for ${identifier}:`, error.message);
    return null;
  }
}

/**
 * Fetches and updates the price for all funds in the database.
 */
async function updateAllFundPrices() {
  const funds = database.getAllFunds();
  for (const fund of funds) {
    const price = await fetchPriceForIdentifier(fund.identifier);
    if (price !== null) {
      database.updateFundPrice(fund.id, price);
      console.log(`Updated price for ${fund.name} to ${price}`);
    }
  }
}

module.exports = {
  fetchPriceForIdentifier,
  updateAllFundPrices,
};
