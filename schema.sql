CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  eamil VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL
);

CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(10, 2) NOT NULL,
  description VARCHAR(255),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

