let score; // Pontuação do usuário
let maxScore = 0; // Pontuação máxima do usuário
let orderGame; // Ordem de exibição das cores
let clickedOrder; // Ordem das cores clicadas

// Pegando os elementos
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const scoreEl = document.querySelector('.score');
const maxScoreEl = document.querySelector('.max-score');

const elementsColors = [ green, red, yellow, blue ];

// Finalizando o jogo
const lose = () => {
  alert('Você perdeu!!')

  if (score > maxScore) {
    localStorage.setItem('maxScore', score)
    alert('Novo recorde alcançado!!')
  }

  playGame()
}

const clickedColor = (color) => {
  lightColor(elementsColors[color], -0.250)
  clickedOrder.push(color);

  const lengthClickedOrder = clickedOrder.length;

  if (clickedOrder[lengthClickedOrder-1] != orderGame[lengthClickedOrder-1]) {
    lose();
  } else {
    if (lengthClickedOrder == orderGame.length) {
      setTimeout(() => {
        alert("Muito bem! Vamos ao próximo nível!");
        next();
      }, 250)
    }
  }

}

// Alterar a cor
const lightColor = (elementColor, position) => {
  const timer = (Number(position)+1) * 1000;

  setTimeout(() => {
    elementColor.classList.add('selected');
  }, timer - 750);

  setTimeout(() => {
    elementColor.classList.remove('selected');
  }, timer);
}

// Criando ordem de exibição
const shufflerOrder = () => {
  let colorOrder = Math.floor( Math.random() * 4 );

  orderGame.push(colorOrder);

  for (let i in orderGame) {
    lightColor(elementsColors[orderGame[i]], i)
  }
}

const setScore = () => {
  scoreEl.innerText = score;
  maxScoreEl.innerText = maxScore;
}

const next = () => {
  clickedOrder = [];
  score++;

  setScore();
  shufflerOrder();
}

// Iniciando o jogo
const playGame = () => {
  maxScore = localStorage.getItem('maxScore') ?? 0;
  score = 0;
  setScore();

  orderGame = [];
  clickedOrder = [];

  alert("Bem vindo ao Genius!! Iniciando novo jogo!");

  shufflerOrder();
}
playGame()

green.onclick = () => clickedColor(0);
red.onclick = () => clickedColor(1);
yellow.onclick = () => clickedColor(2);
blue.onclick = () => clickedColor(3);