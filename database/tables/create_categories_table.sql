CREATE TABLE categories (   
    category_id BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
    category_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);