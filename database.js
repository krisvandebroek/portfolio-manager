const Database = require('better-sqlite3-multiple-ciphers');

// This will create or open the database file in the root of the project.
const db = new Database('portfolio.db');

// Set the encryption key.
db.pragma("key = 'supersecretpassword'");

// Define the SQL statements to create the tables.
const createFundsTableSql = `
  CREATE TABLE IF NOT EXISTS funds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    identifier TEXT NOT NULL UNIQUE,
    target_gain_percentage REAL DEFAULT 10
  );
`;

const createTransactionsTableSql = `
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fund_id INTEGER NOT NULL,
    transaction_type TEXT NOT NULL CHECK(transaction_type IN ('buy', 'sell')),
    transaction_date TEXT NOT NULL,
    units REAL NOT NULL,
    price_per_unit REAL NOT NULL,
    FOREIGN KEY(fund_id) REFERENCES funds(id)
  );
`;

/**
 * Initializes the database by creating the necessary tables if they don't exist.
 */
function initializeDatabase() {
  db.exec(createFundsTableSql);
  db.exec(createTransactionsTableSql);
}

/**
 * Adds a new fund to the database.
 * @param {object} fund - The fund object to add.
 * @param {string} fund.name - The name of the fund.
 * @param {string} fund.identifier - The identifier of the fund.
 * @param {number} fund.targetGain - The target gain percentage for the fund.
 */
function addFund(fund) {
  const stmt = db.prepare('INSERT INTO funds (name, identifier, target_gain_percentage) VALUES (?, ?, ?)');
  stmt.run(fund.name, fund.identifier, fund.targetGain);
}

/**
 * Retrieves all funds from the database.
 * @returns {Array} An array of all funds.
 */
function getAllFunds() {
  const stmt = db.prepare('SELECT * FROM funds');
  return stmt.all();
}

module.exports = {
  initializeDatabase,
  addFund,
  getAllFunds,
};
