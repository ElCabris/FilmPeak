mkdir movies
mkdir movies/poster
sqlite3 db/movies.db < db/schema.sql
python -m app.database.create_movie
