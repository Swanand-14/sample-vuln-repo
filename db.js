const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, bio TEXT)');
});

function insertUser(username, hashedPassword, callback) {
  const query = `INSERT INTO users (username, password, bio) VALUES ('${username}', '${hashedPassword}', '')`;
  db.run(query, callback);
}

function findUserByUsername(username, callback) {
  db.get('SELECT * FROM users WHERE username = ?', [username], callback);
}

function updateBio(username, bio, callback) {
  const query = `UPDATE users SET bio = '${bio}' WHERE username = '${username}'`;
  db.run(query, callback);
}

module.exports = { db, insertUser, findUserByUsername, updateBio };