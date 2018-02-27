DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(45) NULL,
  price INT(10) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Full Fitness Body Build", "Apps & Games", 30, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("12 Rules for Life: An Antidote to Chaos", "Books", 15, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Car Phone Holder", "Automotive", 12, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Daddy's Home", "Movies & TV", 10, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Garden Hose", "Patio & Garden", 35, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Overwatch", "Videogames", 30, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HUGGIES Diapers", "Baby Products", 35, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 300, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Headphones", "Sports & Outdoors", 35, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Motorcycle Bluetooh Helmet", "Motorcycle & Powersport", 175, 32);
