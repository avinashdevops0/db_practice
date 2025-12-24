CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255)
);

INSERT INTO messages (text) VALUES
('Hello from SQL init file'),
('Database auto-initialized');
