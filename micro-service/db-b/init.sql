CREATE DATABASE service_b_db;
USE service_b_db;

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255)
);

INSERT INTO notifications (message)
VALUES ('Hello from Service B DB');

CREATE USER 'root'@'%' IDENTIFIED BY 'rootpassword';
GRANT ALL PRIVILEGES ON service_a_db.* TO 'root'@'%';
FLUSH PRIVILEGES;
