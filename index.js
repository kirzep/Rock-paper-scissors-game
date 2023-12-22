import readlineSync from 'readline-sync';

// Функция для получения случайного выбора компьютера
const getComputerChoice = () => {
  const choices = ['камень', 'ножницы', 'бумага'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

// Функция для определения победителя раунда
const determineRoundWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return 'Ничья';
  }
  if ((userChoice === 'камень' && computerChoice === 'ножницы')
    || (userChoice === 'ножницы' && computerChoice === 'бумага')
    || (userChoice === 'бумага' && computerChoice === 'камень')) {
    return 'Пользователь';
  }
  return 'Компьютер';
};

// Функция для игры в три раунда
const playThreeRounds = () => {
  let userWins = 0;
  let computerWins = 0;

  for (let round = 1; round <= 3; round += 1) {
    let validInput = false;
    let userChoice = '';

    while (!validInput) {
      userChoice = readlineSync.question('Выберите камень, ножницы или бумага: ').toLowerCase();
      if (!['камень', 'ножницы', 'бумага'].includes(userChoice)) {
        console.log('Неверный ввод, попробуйте снова.');
      } else {
        validInput = true;
      }
    }

    const computerChoice = getComputerChoice();
    console.log(`Ваш выбор: ${userChoice}. Выбор компьютера: ${computerChoice}.`);

    const winner = determineRoundWinner(userChoice, computerChoice);
    console.log(`Победитель раунда: ${winner}`);

    if (winner === 'Пользователь') {
      userWins += 1;
    } else if (winner === 'Компьютер') {
      computerWins += 1;
    }
  }

  if (userWins > computerWins) {
    return 'Пользователь выиграл!';
  }
  if (userWins < computerWins) {
    return 'Компьютер выиграл!';
  }
  return 'Ничья!';
};

// Главный цикл игры
let continuePlaying = true;
while (continuePlaying) {
  console.log(playThreeRounds());

  continuePlaying = readlineSync.keyInYN('Хотите сыграть еще раз? ');
}
