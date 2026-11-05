/* Regras independentes da interface, também utilizadas nos testes. */
(function (root) {
  'use strict';
  const WORDS = ['TERMO', 'LIVRO', 'PRAIA', 'FESTA', 'VERDE', 'NUVEM', 'CAMPO', 'PORTA', 'PEDRA', 'SONHO', 'TEMPO', 'AMIGO'];
  const MAX_ATTEMPTS = 6;
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  function evaluate(guess, answer) {
    const result = Array(answer.length).fill('absent');
    const remaining = {};
    // Primeiro reservamos as letras que já estão na posição certa.
    [...answer].forEach((letter, i) => {
      if (guess[i] === letter) result[i] = 'correct';
      else remaining[letter] = (remaining[letter] || 0) + 1;
    });
    // Cada ocorrência restante só pode produzir uma pista amarela.
    [...guess].forEach((letter, i) => {
      if (result[i] !== 'correct' && remaining[letter] > 0) {
        result[i] = 'present';
        remaining[letter]--;
      }
    });
    return result;
  }
  function createGame(previous = '') {
    const pool = WORDS.filter(word => word !== previous);
    return { answer: pool[Math.floor(Math.random() * pool.length)], guesses: [], status: 'playing' };
  }
  function submit(game, input) {
    if (game.status !== 'playing') return { error: 'Esta partida terminou. Comece um novo jogo.' };
    const guess = normalize(input);
    if (!/^[A-Z]+$/.test(guess) || guess.length !== game.answer.length) {
      return { error: `Digite ${game.answer.length} letras para enviar.` };
    }
    const result = evaluate(guess, game.answer);
    game.guesses.push({ word: guess, result });
    if (guess === game.answer) game.status = 'won';
    else if (game.guesses.length === MAX_ATTEMPTS) game.status = 'lost';
    return { result };
  }
  const api = { WORDS, MAX_ATTEMPTS, normalize, evaluate, createGame, submit };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Termo = api;
})(globalThis);
