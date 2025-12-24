CREATE DATABASE service_a_db;
USE service_a_db;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255)
);

INSERT INTO messages (text)
VALUES ('Hello from Service A DB');

CREATE USER 'root'@'%' IDENTIFIED BY 'rootpassword';
GRANT ALL PRIVILEGES ON service_a_db.* TO 'root'@'%';
FLUSH PRIVILEGES;

