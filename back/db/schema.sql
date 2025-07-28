CREATE TABLE movies (id integer PRIMARY KEY, title text not null, year integer null, description text, file_path text not null, duration_minutes INTEGER, score FLOAT, genre TEXT);
CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
