CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(60) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL
);