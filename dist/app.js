'use strict';
const board = document.querySelector('#board');
const keyboard = document.querySelector('#keyboard');
const message = document.querySelector('#message');
const instructions = document.querySelector('#instructions');
const labels = { correct: 'posição correta', present: 'posição incorreta', absent: 'sem ocorrência disponível' };
const length = 5;
let game = Termo.createGame();
let current = '';

for (const letters of ['QWERTYUIOP', 'ASDFGHJKL', '↵ZXCVBNM⌫']) {
  const row = document.createElement('div');
  row.className = 'key-row';
  for (const letter of letters) {
    const button = document.createElement('button');
    button.className = 'key' + ('↵⌫'.includes(letter) ? ' wide' : '');
    button.dataset.key = letter;
    button.textContent = letter === '↵' ? 'ENTER' : letter;
    button.setAttribute('aria-label', letter === '↵' ? 'Enviar tentativa' : letter === '⌫' ? 'Apagar letra' : letter);
    button.addEventListener('click', () => input(letter));
    row.append(button);
  }
  keyboard.append(row);
}

function render() {
  board.replaceChildren();
  board.style.setProperty('--letters', length);
  for (let index = 0; index < Termo.MAX_ATTEMPTS; index++) {
    const row = document.createElement('div');
    const active = index === game.guesses.length && game.status === 'playing';
    row.className = 'row' + (active ? ' active' : '');
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', `Tentativa ${index + 1}`);
    const guess = game.guesses[index];
    const word = guess ? guess.word : active ? current : '';
    for (let i = 0; i < length; i++) {
      const cell = document.createElement('span');
      const state = guess?.result[i];
      cell.className = 'tile' + (state ? ` ${state}` : word[i] ? ' filled' : '');
      cell.textContent = word[i] || '';
      cell.setAttribute('aria-label', `${i + 1}: ${word[i] || 'vazio'}${state ? ', ' + labels[state] : ''}`);
      row.append(cell);
    }
    board.append(row);
  }
  const ranks = { absent: 1, present: 2, correct: 3 };
  const known = {};
  game.guesses.forEach(guess => [...guess.word].forEach((letter, i) => {
    if ((ranks[known[letter]] || 0) < ranks[guess.result[i]]) known[letter] = guess.result[i];
  }));
  keyboard.querySelectorAll('button').forEach(button => {
    button.classList.remove('correct', 'present', 'absent');
    if (known[button.dataset.key]) button.classList.add(known[button.dataset.key]);
    button.disabled = game.status !== 'playing';
  });
  document.querySelector('#round').textContent = game.status === 'playing' ? `TENTATIVA ${game.guesses.length + 1} DE 6` : 'PARTIDA ENCERRADA';
  document.querySelector('#size').textContent = `${length} LETRAS`;
}

function input(key) {
  if (game.status !== 'playing' || instructions.open) return;
  if (key === '⌫') current = current.slice(0, -1);
  else if (key === '↵') {
    const response = Termo.submit(game, current);
    if (response.error) { message.textContent = response.error; return; }
    current = '';
    message.classList.toggle('end', game.status !== 'playing');
    if (game.status === 'won') message.textContent = `Você acertou! ${game.answer} em ${game.guesses.length} de 6 tentativas. Vamos de novo?`;
    else if (game.status === 'lost') message.textContent = `Fim de jogo! A palavra era ${game.answer}. Tente um novo jogo!`;
    else message.textContent = 'Observe as cores e tente a próxima palavra.';
  } else if (/^[A-Z]$/.test(key) && current.length < length) current += key;
  render();
}

function restart() {
  const previous = game.answer;
  game = Termo.createGame(previous);
  current = '';
  message.classList.remove('end');
  message.textContent = `Comece com uma palavra de ${length} letras.`;
  render();
}
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey || instructions.open) return;
  // Preserva Enter e espaço para a ativação nativa dos botões focados.
  if (event.key === 'Enter' && event.target instanceof HTMLButtonElement) return;
  if (event.key === 'Enter' || event.key === 'Backspace') {
    event.preventDefault();
    input(event.key === 'Enter' ? '↵' : '⌫');
  } else if (event.key.length === 1) input(Termo.normalize(event.key));
});
document.querySelector('#restart').addEventListener('click', () => restart());
document.querySelector('#help').addEventListener('click', () => instructions.showModal());
document.querySelector('#close-help').addEventListener('click', () => instructions.close());
render();
