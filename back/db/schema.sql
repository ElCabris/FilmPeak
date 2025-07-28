CREATE TABLE IF NOT EXISTS movies (id integer PRIMARY KEY, title text not null, year integer null, description text, file_path text not null, duration_minutes INTEGER, score FLOAT, genre TEXT);
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS profiles (user_id INTEGER, profile TEXT, FOREIGN KEY (user_id) REFERENCES users(id), PRIMARY KEY (user_id, profile));
