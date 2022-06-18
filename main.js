(() => {

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const startButton = document.getElementById('start__game');
const fieldInput = document.getElementById('setings__input');
const menu = document.getElementById('main__menu');
const gameOver = document.getElementById('game__over');
const gameOverTitle = document.getElementById('game__over-title');
const container = document.getElementById('panel__game');
const SECOND_GAME = 60;

let panel;
let sizeField = 0;
let countCouple = 0;
let time;
let gameOverFlag;

let firstCard = {
  number: null,
  flag: null
}, secondCard = {
  number: null,
  flag: null
};


function setSettings (input) {
  let endCart = 0;
  if(input % 2 == 0 && input <= 10) {
    endCart = Math.pow(input, 2) / 2;
    sizeField = input;
  }
  else {
    endCart = 8;
    sizeField = 4;
  }

  let arrCarts = [];

  for(let i = 1; i <= endCart; i++) {
    arrCarts.push(i);
  }

  arrCarts = arrCarts.concat(arrCarts);
  shuffle(arrCarts);
  return arrCarts;
}

function createCard(item) {
  const card = document.createElement('li');
  const button = document.createElement('button');
  const number = document.createElement('span');
  card.classList.add('list__item');
  button.classList.add('item__number');
  number.classList.add('number');

  const infoCard = {
    number: item,
    flag: false
  }

  card.append(button);
  button.append(number);

  return {
    card,
    infoCard,
    button,
    number
  }
}

function resetFirstSecontCards() {
  firstCard = {
    number: null,
    flag:null
  };
  secondCard = {
    number: null,
    flag:null
  };
}

function setListener(item) {
    item.button.addEventListener('click',()=>{

      if(firstCard.number !== null && secondCard.number !== null && firstCard.number !== secondCard.number) {
          const active = document.querySelectorAll(".item__activ");
          for(const index of active) {
            index.classList.remove('item__activ');
            index.lastChild.lastChild.textContent = '';
          }
        firstCard.flag = false;
        secondCard.flag = false;
        resetFirstSecontCards();
      }
    item.card.classList.toggle('item__activ');
    item.number.textContent = item.infoCard.number;
    item.infoCard.flag = !item.infoCard.flag;
    if(!item.infoCard.flag) item.number.textContent = '';

    if(firstCard.number === null) {
      firstCard = item.infoCard;
    }
    else if(firstCard.number !== null && secondCard.number === null && firstCard.flag !== false) {
      secondCard = item.infoCard;
    }
    else {
      resetFirstSecontCards();
    }

    if(firstCard.number === secondCard.number && firstCard.number !== null){
      const active = document.querySelectorAll(".item__activ");
      for(const index of active) {
        index.classList.add('item__disable')
        index.classList.remove('item__activ');
        index.firstChild.setAttribute('disabled','disabled');
      }
      countCouple++;
      resetFirstSecontCards();
    }
    if(countCouple == Math.pow(sizeField, 2) / 2) {
      gameOverFlag = false;
      restartGame('Ты просто умничка, я в тебе не сомневался!!!');
    }
  })
}

function restartGame (text) {
  countCouple = 0;
  panel.remove();
  gameOver.classList.remove('hide');
  gameOverTitle.textContent = text;
  document.getElementById('game__over').addEventListener('click', () =>{
    gameOver.classList.add('hide');
    menu.classList.remove('hide');
  })
}

function createFieldList(listCards, countCarts) {
  panel = document.createElement('ul');
  panel.classList.add('list__cards');
  panel.style.gridTemplateRows = `repeat(${countCarts}, 1fr)`;
  panel.style.gridTemplateColumns = `repeat(${countCarts}, 1fr)`;

  for(const item of listCards){
    const card = createCard(item);
    setListener(card);
    panel.append(card.card);
  }

  container.append(panel);
}


document.addEventListener('DOMContentLoaded',()=>{
  let start = () => {
    gameOverFlag = true;
    if(!fieldInput.value) {
      return;
    }

    menu.classList.add('hide');

    const countItem = fieldInput.value;
    const listCards = setSettings(countItem);
    createFieldList(listCards, sizeField);


    clearTimeout(time);
    time = setTimeout(()=>{
      if(gameOverFlag){
        gameOverFlag = false;
        restartGame('Ничего страшного, начни игру заного и у тебя всё получится!!!');
      }
    }, SECOND_GAME * 1000)
  }

  startButton.addEventListener('click', start);

})

})();
