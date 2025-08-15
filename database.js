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

module.exports = {
  initializeDatabase,
};
