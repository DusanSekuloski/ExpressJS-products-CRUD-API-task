CREATE TABLE products (
id BIGSERIAL PRIMARY KEY UNIQUE,
name VARCHAR(50),
short_description TEXT,
description TEXT,
price NUMERIC(10,2),
created TIMESTAMP,
updated TIMESTAMP 
);
