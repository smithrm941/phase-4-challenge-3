CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  join_date TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  content TEXT,
  author_id INT REFERENCES users(id),
  album_id INT REFERENCES albums(id),
  review_date TIMESTAMP DEFAULT current_timestamp
);
