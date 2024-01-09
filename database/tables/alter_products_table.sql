ALTER TABLE products ADD COLUMN product_quantity VARCHAR(15) NOT NULL;

ALTER TABLE products ADD COLUMN category_id BIGINT NOT NULL;

ALTER TABLE products ADD CONSTRAINT fk_products_categories FOREIGN KEY (category_id) REFERENCES categories(category_id);
