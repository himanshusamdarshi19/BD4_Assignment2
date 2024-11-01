let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './BD4_Assignment2/database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function getAllGames() {
  let query = 'SELECT * FROM games';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games', async (req, res) => {
  let results = await getAllGames();
  return res.status(200).json(results);
});

async function getGameById(id) {
  let query = 'SELECT * from games WHERE id = ?';
  let response = await db.all(query, [id]);
  return { games: response };
}

app.get('/games/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await getGameById(id);
  return res.status(200).json(results);
});

async function getGameByGenre(genre) {
  let query = 'SELECT * from games WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { games: response };
}

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await getGameByGenre(genre);
  res.status(200).json(results);
});

async function getGamesByPlatform(platform) {
  let query = 'SELECT * FROM genre WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { games: response };
}

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let results = await getGamesByPlatform(platform);
  return res.status(200).json(results);
});

async function getGamesSortedByRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games/sort-by-rating', async (req, res) => {
  let results = await getGamesSortedByRating();
  return res.status(200).json(results);
});

async function getAllPlayers() {
  let query = 'SELECT * from players';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players', async (req, res) => {
  let results = await getAllPlayers();
  return res.status(200).json(results);
});

async function getPlayersById(id) {
  let query = 'SELECT * FROM players WHERE id = ?';
  let response = await db.all(query, [id]);
  return { players: response };
}

app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = getPlayersById(id);
  return res.status(200).json(results);
});

async function getPlayersByPlatform(platform) {
  let query = 'SELECT * from players WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return { players: response };
}

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let results = await getPlayersByPlatform(platform);
  return res.status(200).json(results);
});

async function getPlayersSortedByRating() {
  let query = 'SELECT * from players ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players/sort-by-rating', async (req, res) => {
  let results = getPlayersSortedByRating();
  return res.status(200).json(results);
});

async function getAllTournaments() {
  let query = 'SELECT * from tournaments';
  let results = await db.all(query, []);
  return { tournaments: results };
}

app.get('/tournaments', async (req, res) => {
  let results = await getAllTournaments();
  return res.status(200).json(results);
});

async function getTournamentsById(id) {
  let query = 'SELECT * from tournaments WHERE id = ?';
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

app.get('/tournaments/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await getTournamentsById(id);
  return res.status(200).json(results);
});

async function getTournamentsByGameId(gameId) {
  let query = 'SELECT * FROM tournaments WHERE gameId = ?';
  let response = await db.all(query, [gameId]);
  return { tournaments: response };
}

app.get('/tournaments/game/:gameId', async (req, res) => {
  let gameId = req.query.gameId;
  let results = await getTournamentsByGameId(gameId);
  return res.status(200).json(results);
});

async function getTournamentsSortedByPricePool() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  let results = await getTournamentsSortedByPricePool();
  return res.status(200).json(results);
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
