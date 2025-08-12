DROP TABLE IF EXISTS posts;

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO posts (title, content) VALUES
  ('初めての投稿', 'これは最初の投稿です'),
  ('2番目の投稿', 'これは2番目の投稿です'),
  ('3回目の投稿', 'これは3回目の投稿です');
