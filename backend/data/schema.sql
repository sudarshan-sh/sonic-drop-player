-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- songs table
CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  release_date DATE,
  genre VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- playlist_songs table
CREATE TABLE IF NOT EXISTS playlist_songs (
    playlist_id INT,
    song_id INT,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

-- =======================================
-- Seed Data
-- =======================================
-- add sample songs to the songs table

INSERT INTO songs (title, artist, album, release_date, genre) VALUES
-- Rock & Classic Rock (15)
('Bohemian Rhapsody', 'Queen', 'A Night at the Opera', '1975-10-31', 'Rock'),
('Stairway to Heaven', 'Led Zeppelin', 'Led Zeppelin IV', '1971-11-08', 'Rock'),
('Hotel California', 'Eagles', 'Hotel California', '1976-12-08', 'Rock'),
('Sweet Child O Mine', 'Guns N Roses', 'Appetite for Destruction', '1987-07-21', 'Rock'),
('Back In Black', 'AC/DC', 'Back in Black', '1980-07-25', 'Rock'),
('Smells Like Teen Spirit', 'Nirvana', 'Nevermind', '1991-09-10', 'Grunge'),
('Imagine', 'John Lennon', 'Imagine', '1971-10-11', 'Rock'),
('Comfortably Numb', 'Pink Floyd', 'The Wall', '1979-11-30', 'Progressive Rock'),
('Purple Haze', 'Jimi Hendrix', 'Are You Experienced', '1967-03-17', 'Rock'),
('Hey Jude', 'The Beatles', 'Single', '1968-08-26', 'Pop Rock'),
('Dream On', 'Aerosmith', 'Aerosmith', '1973-06-27', 'Rock'),
('Free Bird', 'Lynyrd Skynyrd', 'Pronounced Leh-nerd Skin-nerd', '1973-08-13', 'Rock'),
('Under the Bridge', 'Red Hot Chili Peppers', 'Blood Sugar Sex Magik', '1991-09-24', 'Alternative Rock'),
('Creep', 'Radiohead', 'Pablo Honey', '1992-09-21', 'Alternative Rock'),
('Losing My Religion', 'R.E.M.', 'Out of Time', '1991-02-19', 'Alternative Rock'),

-- Pop & Contemporary (15)
('Blinding Lights', 'The Weeknd', 'After Hours', '2019-11-29', 'Pop'),
('Shape of You', 'Ed Sheeran', '÷ (Divide)', '2017-01-06', 'Pop'),
('Stay', 'The Kid LAROI & Justin Bieber', 'F*CK LOVE 3: OVER YOU', '2021-07-09', 'Pop'),
('As It Was', 'Harry Styles', 'Harrys House', '2022-04-01', 'Pop'),
('Bad Guy', 'Billie Eilish', 'When We All Fall Asleep, Where Do We Go?', '2019-03-29', 'Pop'),
('Cruel Summer', 'Taylor Swift', 'Lover', '2019-08-23', 'Pop'),
('Flowers', 'Miley Cyrus', 'Endless Summer Vacation', '2023-01-12', 'Pop'),
('Levitating', 'Dua Lipa', 'Future Nostalgia', '2020-03-27', 'Pop'),
('Uptown Funk', 'Mark Ronson ft. Bruno Mars', 'Uptown Special', '2014-11-10', 'Funk Pop'),
('Rolling in the Deep', 'Adele', '21', '2010-11-29', 'Pop'),
('Dynamite', 'BTS', 'Be', '2020-08-21', 'K-Pop'),
('Sorry', 'Justin Bieber', 'Purpose', '2015-10-23', 'Pop'),
('Roar', 'Katy Perry', 'Prism', '2013-08-10', 'Pop'),
('Single Ladies', 'Beyoncé', 'I Am... Sasha Fierce', '2008-10-13', 'Pop'),
('Thriller', 'Michael Jackson', 'Thriller', '1982-11-30', 'Pop'),

-- Hip-Hop & Rap (15)
('Lose Yourself', 'Eminem', '8 Mile OST', '2002-10-28', 'Hip-Hop'),
('Gods Plan', 'Drake', 'Scorpion', '2018-01-19', 'Hip-Hop'),
('HUMBLE.', 'Kendrick Lamar', 'DAMN.', '2017-03-30', 'Hip-Hop'),
('SICKO MODE', 'Travis Scott', 'ASTROWORLD', '2018-08-03', 'Hip-Hop'),
('Juicy', 'The Notorious B.I.G.', 'Ready to Die', '1994-08-09', 'Hip-Hop'),
('California Love', '2Pac ft. Dr. Dre', 'All Eyez on Me', '1995-12-03', 'Hip-Hop'),
('Alright', 'Kendrick Lamar', 'To Pimp a Butterfly', '2015-03-15', 'Hip-Hop'),
('Nuthin but a G Thang', 'Dr. Dre', 'The Chronic', '1992-11-19', 'Hip-Hop'),
('Stronger', 'Kanye West', 'Graduation', '2007-07-31', 'Hip-Hop'),
('Bodak Yellow', 'Cardi B', 'Invasion of Privacy', '2017-06-16', 'Rap'),
('Old Town Road', 'Lil Nas X', '7', '2018-12-03', 'Country Rap'),
('Rockstar', 'Post Malone ft. 21 Savage', 'Beerbongs & Bentleys', '2017-09-15', 'Hip-Hop'),
('Savage', 'Megan Thee Stallion', 'Suga', '2020-03-06', 'Rap'),
('In Da Club', '50 Cent', 'Get Rich or Die Tryin', '2003-01-07', 'Hip-Hop'),
('Ms. Jackson', 'Outkast', 'Stankonia', '2000-10-24', 'Hip-Hop'),

-- Electronic & Dance (15)
('One More Time', 'Daft Punk', 'Discovery', '2000-11-13', 'Electronic'),
('Wake Me Up', 'Avicii', 'True', '2013-06-17', 'EDM'),
('Titanium', 'David Guetta ft. Sia', 'Nothing but the Beat', '2011-08-05', 'Dance'),
('Lean On', 'Major Lazer & DJ Snake', 'Peace Is the Mission', '2015-03-02', 'Electronic'),
('Faded', 'Alan Walker', 'Different World', '2015-12-03', 'EDM'),
('Closer', 'The Chainsmokers', 'Collage', '2016-07-29', 'EDM'),
('Scary Monsters and Nice Sprites', 'Skrillex', 'EP', '2010-10-22', 'Dubstep'),
('Strobe', 'deadmau5', 'For Lack of a Better Name', '2009-09-22', 'Progressive House'),
('Levels', 'Avicii', 'Single', '2011-10-28', 'EDM'),
('Animals', 'Martin Garrix', 'Gold Skies', '2013-06-17', 'EDM'),
('Sandstorm', 'Darude', 'Before the Storm', '1999-11-15', 'Trance'),
('Don''t You Worry Child', 'Swedish House Mafia', 'Until Now', '2012-09-14', 'EDM'),
('Latch', 'Disclosure ft. Sam Smith', 'Settle', '2012-10-08', 'Garage House'),
('Intro', 'The xx', 'xx', '2009-08-14', 'Ambient'),
('Midnight City', 'M83', 'Hurry Up, We''re Dreaming', '2011-07-19', 'Synthpop'),

-- R&B and Soul (15)
('Blame It on the Boogie', 'The Jacksons', 'Destiny', '1978-09-05', 'R&B'),
('No One', 'Alicia Keys', 'As I Am', '2007-09-11', 'R&B'),
('Superstition', 'Stevie Wonder', 'Talking Book', '1972-10-24', 'Funk / Soul'),
('Adorn', 'Miguel', 'Kaleidoscope Dream', '2012-08-07', 'R&B'),
('Redbone', 'Childish Gambino', '"Awaken, My Love!"', '2016-11-17', 'Neo-Soul'),
('Earned It', 'The Weeknd', 'Beauty Behind the Madness', '2014-12-23', 'R&B'),
('Thinkin Bout You', 'Frank Ocean', 'Channel Orange', '2012-04-17', 'R&B'),
('Ordinary People', 'John Legend', 'Get Lifted', '2004-11-23', 'Soul'),
('If I Ain''t Got You', 'Alicia Keys', 'The Diary of Alicia Keys', '2004-02-17', 'R&B'),
('Respect', 'Aretha Franklin', 'I Never Loved a Man the Way I Love You', '1967-04-29', 'Soul'),
('What''s Going On', 'Marvin Gaye', 'What''s Going On', '1971-01-21', 'Soul'),
('We Belong Together', 'Mariah Carey', 'The Emancipation of Mimi', '2005-03-29', 'R&B'),
('Crazy in Love', 'Beyoncé ft. Jay-Z', 'Dangerously in Love', '2003-05-14', 'R&B'),
('Yeah!', 'Usher ft. Lil Jon & Ludacris', 'Confessions', '2004-01-27', 'R&B'),
('Killing Me Softly With His Song', 'Fugees', 'The Score', '1996-05-31', 'R&B'),

-- Latin & Reggaeton (15)
('Despacito', 'Luis Fonsi ft. Daddy Yankee', 'Vida', '2017-01-12', 'Latin'),
('Dakiti', 'Bad Bunny & Jhay Cortez', 'El Último Tour Del Mundo', '2020-10-30', 'Reggaeton'),
('Mi Gente', 'J Balvin & Willy William', 'Vibras', '2017-06-30', 'Latin'),
('Tusa', 'KAROL G & Nicki Minaj', 'KG0516', '2019-11-07', 'Reggaeton'),
('Gasolina', 'Daddy Yankee', 'Barrio Fino', '2004-08-17', 'Reggaeton'),
('Bailando', 'Enrique Iglesias', 'Sex and Love', '2014-03-28', 'Latin Pop'),
('Hips Don''t Lie', 'Shakira ft. Wyclef Jean', 'Oral Fixation, Vol. 2', '2006-02-28', 'Latin Pop'),
('Pepas', 'Farruko', 'La 167', '2021-06-24', 'Guaracha'),
('Hawái', 'Maluma', 'Papi Juancho', '2020-07-29', 'Latin Pop'),
('Diles', 'Bad Bunny, Ozuna, Farruko', 'Single', '2016-08-26', 'Latin Trap'),
('Chantaje', 'Shakira ft. Maluma', 'El Dorado', '2016-10-28', 'Latin Pop'),
('Con Calma', 'Daddy Yankee ft. Snow', 'El Disco', '2019-01-24', 'Reggaeton'),
('Vivir Mi Vida', 'Marc Anthony', '3.0', '2013-04-26', 'Salsa'),
('La Camisa Negra', 'Juanes', 'Mi Sangre', '2005-03-18', 'Latin Rock'),
('Oye Como Va', 'Santana', 'Abraxas', '1970-09-01', 'Latin Rock'),

-- Jazz, Blues & Country (15)
('Take Five', 'Dave Brubeck', 'Time Out', '1959-09-01', 'Jazz'),
('So What', 'Miles Davis', 'Kind of Blue', '1959-08-17', 'Jazz'),
('My Favorite Things', 'John Coltrane', 'My Favorite Things', '1961-03-01', 'Jazz'),
('At Last', 'Etta James', 'At Last!', '1960-11-15', 'Blues'),
('The Thrill Is Gone', 'B.B. King', 'Completely Well', '1969-12-01', 'Blues'),
('Tennessee Whiskey', 'Chris Stapleton', 'Traveller', '2015-05-05', 'Country'),
('Jolene', 'Dolly Parton', 'Jolene', '1973-10-15', 'Country'),
('Ring of Fire', 'Johnny Cash', 'Ring of Fire', '1963-03-25', 'Country'),
('Take Me Home, Country Roads', 'John Denver', 'Poems, Prayers & Promises', '1971-04-12', 'Country'),
('Come Away With Me', 'Norah Jones', 'Come Away With Me', '2002-02-26', 'Jazz Pop'),
('Fly Me To The Moon', 'Frank Sinatra', 'It Might as Well Be Swing', '1964-08-01', 'Vocal Jazz'),
('Feeling Good', 'Nina Simone', 'I Put a Spell on You', '1965-06-01', 'Vocal Jazz'),
('Sweet Home Alabama', 'Lynyrd Skynyrd', 'Second Helping', '1974-04-15', 'Southern Rock'),
('Before He Cheats', 'Carrie Underwood', 'Some Hearts', '2005-11-15', 'Country'),
('Friends in Low Places', 'Garth Brooks', 'No Fences', '1990-08-06', 'Country');
