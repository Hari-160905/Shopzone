CREATE DATABASE IF NOT EXISTS shop_zone;
USE shop_zone;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  price DECIMAL(10,2),
  button VARCHAR(20),
  image_url VARCHAR(255),
  PRIMARY KEY (id)
);

