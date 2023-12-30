CREATE TABLE products (
id BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
name VARCHAR(50) NOT NULL,
short_description TEXT NOT NULL,
description TEXT NOT NULL,
price NUMERIC(10,2) NOT NULL,
product_quantity VARCHAR(15) NOT NULL,
category_id BIGINT REFERENCES categories(category_id) NOT NULL,
created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP NOT NULL
);
