// Pixel Play Arcade — catalogue, Snake game, leaderboard, bookings

// ---------- Live open / closed indicator ----------
(function () {
  var badge = document.getElementById('openBadge');
  var hour = new Date().getHours();
  // Open 11:00 – 01:00
  var open = hour >= 11 || hour < 1;
  badge.textContent = open ? '● Open now · till 1:00 AM' : '○ Closed · opens 11:00 AM';
  if (!open) badge.classList.add('closed');
})();

// ---------- Animated hero stats ----------
document.querySelectorAll('[data-count]').forEach(function (el) {
  var target = parseInt(el.dataset.count, 10);
  var start = null;
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / 1200, 1);
    el.textContent = Math.floor(target * p).toLocaleString('en-US');
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
});

// ---------- Game catalogue ----------
var GAMES = [
  { name: 'Neon Drift X', genre: 'racing', emoji: '🏎️', desc: 'Anti-gravity street racing with boost pads and night-city tracks.', players: '1–2 players', rating: 4.8 },
  { name: 'Zombie Alley', genre: 'action', emoji: '🧟', desc: 'Light-gun survival horror. Hold the line as the horde closes in.', players: '1–4 players', rating: 4.7 },
  { name: 'Turbo Kart Clash', genre: 'racing', emoji: '🏁', desc: 'Four-player kart battles, power-ups and a rainbow shortcut.', players: '1–4 players', rating: 4.9 },
  { name: 'Block Breaker 3D', genre: 'puzzle', emoji: '🧱', desc: 'A modern twist on the brick-breaker classic with 60 levels.', players: '1 player', rating: 4.5 },
  { name: 'Street Hoops Pro', genre: 'sports', emoji: '🏀', desc: 'Timed shoot-out basketball. Beat the clock, beat the board.', players: '1–2 players', rating: 4.6 },
  { name: 'Dragon Quest VR', genre: 'adventure', emoji: '🐉', desc: 'A full VR quest: swords, spells and a dragon at the end.', players: '1 player', rating: 4.9 },
  { name: 'Pixel Fighter II', genre: 'action', emoji: '🥊', desc: 'Old-school 2D fighting. Twelve fighters, one champion.', players: '1–2 players', rating: 4.8 },
  { name: 'Maze Runner Deluxe', genre: 'puzzle', emoji: '🌀', desc: 'Guide the orb through 100 shifting mazes against the timer.', players: '1 player', rating: 4.4 },
  { name: 'Galaxy Bowl', genre: 'sports', emoji: '🎳', desc: 'Cosmic bowling with glowing lanes and zero-gravity pins.', players: '1–6 players', rating: 4.7 }
];

var activeGenre = 'all';
var grid = document.getElementById('gameGrid');
var countEl = document.getElementById('resultCount');

function renderGames() {
  var q = document.getElementById('gameSearch').value.trim().toLowerCase();
  var list = GAMES.filter(function (g) {
    var genreOk = activeGenre === 'all' || g.genre === activeGenre;
    var queryOk = !q || g.name.toLowerCase().indexOf(q) !== -1 || g.desc.toLowerCase().indexOf(q) !== -1;
    return genreOk && queryOk;
  });
  countEl.textContent = list.length + (list.length === 1 ? ' game' : ' games') + ' on the floor';
  grid.innerHTML = list.length ? list.map(function (g) {
    return '<article class="game-card"><div class="game-emoji">' + g.emoji + '</div>' +
      '<h3>' + g.name + '</h3><span class="game-genre">' + g.genre + '</span>' +
      '<p>' + g.desc + '</p>' +
      '<div class="game-meta"><span>' + g.players + '</span><strong>★ ' + g.rating.toFixed(1) + '</strong></div></article>';
  }).join('') : '<p>No games match that search. Try another word.</p>';
}
document.getElementById('gameSearch').addEventListener('input', renderGames);
document.getElementById('genreFilters').addEventListener('click', function (e) {
  var btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  activeGenre = btn.dataset.genre;
  renderGames();
});
renderGames();

// ---------- Snake mini-game ----------
var canvas = document.getElementById('snakeCanvas');
var ctx = canvas.getContext('2d');
var BOX = 20, COLS = 20, ROWS = 20;
var snake, dir, nextDir, food, score, best, timer, running;
best = parseInt(localStorage.getItem('pixelSnakeBest') || '0', 10);
document.getElementById('snakeBest').textContent = best;

function resetSnake() {
  snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  dir = { x: 1, y: 0 }; nextDir = dir;
  score = 0;
  document.getElementById('snakeScore').textContent = '0';
  placeFood();
}
function placeFood() {
  food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  if (snake.some(function (s) { return s.x === food.x && s.y === food.y; })) placeFood();
}
function draw() {
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ff2e63';
  ctx.fillRect(food.x * BOX, food.y * BOX, BOX - 2, BOX - 2);
  snake.forEach(function (s, i) {
    ctx.fillStyle = i === 0 ? '#08d9d6' : '#0e9b99';
    ctx.fillRect(s.x * BOX, s.y * BOX, BOX - 2, BOX - 2);
  });
}
function tick() {
  dir = nextDir;
  var head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
      snake.some(function (s) { return s.x === head.x && s.y === head.y; })) {
    return gameOver();
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById('snakeScore').textContent = score;
    placeFood();
  } else {
    snake.pop();
  }
  draw();
}
function gameOver() {
  clearInterval(timer);
  running = false;
  document.getElementById('snakeMsg').textContent = 'Game over! Final score: ' + score + '. Press Start to play again.';
  if (score > best) {
    best = score;
    localStorage.setItem('pixelSnakeBest', String(best));
    document.getElementById('snakeBest').textContent = best;
  }
  document.getElementById('snakeStart').textContent = 'Play again';
}
document.getElementById('snakeStart').addEventListener('click', function () {
  resetSnake();
  draw();
  running = true;
  this.textContent = 'Restart';
  document.getElementById('snakeMsg').textContent = 'Go! Eat the red dots.';
  clearInterval(timer);
  timer = setInterval(tick, 120);
});
function setDir(x, y) {
  if (!running) return;
  if (x === -dir.x && y === -dir.y) return; // no reversing
  nextDir = { x: x, y: y };
}
document.addEventListener('keydown', function (e) {
  var keys = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
  if (keys[e.key]) { e.preventDefault(); setDir(keys[e.key][0], keys[e.key][1]); }
});
document.querySelectorAll('.dpad button').forEach(function (b) {
  b.addEventListener('click', function () {
    var d = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[b.dataset.dir];
    setDir(d[0], d[1]);
  });
});
resetSnake();
draw();

// ---------- Leaderboard ----------
var BOARD = [
  { name: 'Ayan "Viper" Khan', game: 'Neon Drift X', score: 8450 },
  { name: 'Sara Malik', game: 'Turbo Kart Clash', score: 7920 },
  { name: 'Bilal Ahmed', game: 'Pixel Fighter II', score: 7680 },
  { name: 'Hina Raza', game: 'Zombie Alley', score: 7310 },
  { name: 'Usman Tariq', game: 'Dragon Quest VR', score: 6950 }
];
function renderBoard() {
  document.getElementById('boardBody').innerHTML = BOARD.map(function (r, i) {
    return '<tr><td>#' + (i + 1) + '</td><td>' + r.name + '</td><td>' + r.game + '</td><td>' + r.score.toLocaleString('en-US') + '</td></tr>';
  }).join('');
}
renderBoard();
document.getElementById('scoreForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('playerName').value.trim();
  if (!name) return;
  BOARD.push({ name: name, game: 'Snake', score: score });
  BOARD.sort(function (a, b) { return b.score - a.score; });
  BOARD = BOARD.slice(0, 5);
  renderBoard();
  document.getElementById('scoreMsg').textContent = name + ', your Snake score of ' + score + ' is on the board!';
  this.reset();
});

// ---------- Tournaments ----------
var EVENTS = [
  { title: 'Friday Night Fights — Pixel Fighter II', date: 'Fri 27 Nov · 7:00 PM', desc: '16-player bracket. Winner takes Rs 20,000 and the belt.', seats: 16 },
  { title: 'Neon Drift Grand Prix', date: 'Sat 28 Nov · 5:00 PM', desc: 'Four heats, one final. Fastest lap wins Rs 15,000.', seats: 24 },
  { title: 'Snake Showdown — High Score Night', date: 'Sun 29 Nov · 6:00 PM', desc: 'One hour, one machine, highest Snake score wins a Monthly Pro pass.', seats: 30 }
];
var eventList = document.getElementById('eventList');
eventList.innerHTML = EVENTS.map(function (ev, i) {
  return '<article class="event-card" data-i="' + i + '"><h3>' + ev.title + '</h3>' +
    '<p class="event-date">' + ev.date + ' · ' + ev.seats + ' seats</p><p>' + ev.desc + '</p>' +
    '<button class="btn btn-primary event-btn">Book a seat</button></article>';
}).join('');
eventList.addEventListener('click', function (e) {
  var btn = e.target.closest('.event-btn');
  if (!btn) return;
  var card = btn.closest('.event-card');
  card.classList.add('booked');
  btn.textContent = '✓ Seat booked — see you there!';
  btn.disabled = true;
});

// ---------- Membership ----------
document.querySelectorAll('.plan-btn').forEach(function (b) {
  b.addEventListener('click', function () {
    document.getElementById('planMsg').textContent = 'Great choice — ' + b.dataset.plan + ' selected. Show this screen at the front desk to activate your pass.';
  });
});

// ---------- Newsletter ----------
document.getElementById('newsletterForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('newsletterMsg').textContent = 'You are in! Tournament alerts will land in your inbox every week.';
  this.reset();
});
