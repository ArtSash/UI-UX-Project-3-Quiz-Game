const QUESTIONS = [
    {
      text: 'Как называется городок, в который прибывает фермер?',
      answers: ['Стардью Вэлли', 'Пеликан Таун', 'Плезантвью', 'Грин Хайтс'],
      rightIndex: 1,
    },
    {
      text: 'Кто встречает фермера на остановке в начале игры?',
      answers: ['Вилли', 'Гас', 'Робин', 'Эбигейл'],
      rightIndex: 2,
    },
    {
      text: 'Как фермер получил участок в долине Стардью?',
      answers: ['Получил в наследство', 'Купил у мэра', 'Выиграл в конкурсе', 'Получил в подарок от городка'],
      rightIndex: 0,
    },
    {
      text: 'Кто владелец местного магазина, где фермер может купить семена, саженцы и удобрения?',
      answers: ['Марни', 'Моррис', 'Харви', 'Пьер'],
      rightIndex: 3,
    },
    {
      text: 'Сколько дней длится один сезон в игре?',
      answers: ['14', '21', '28', '30'],
      rightIndex: 2,
    },
    {
      text: 'Какой овощ фермер НЕ может сажать летом?',
      answers: ['Красная капуста', 'Кукуруза', 'Помидор', 'Пастернак'],
      rightIndex: 3,
    },
    {
      text: 'Кто является владельцем филиала JojaMart в городке?',
      answers: ['Пьер', 'Моррис', 'Марни', 'Шэйн'],
      rightIndex: 1,
    },
    {
      text: 'Сколько всего уровней в шахте?',
      answers: ['80', '100', '120', '150'],
      rightIndex: 2,
    },
    {
      text: 'Какое из перечисленных мероприятий в городке проходит осенью?',
      answers: ['Яичный фестиваль', 'Танец полуночных медуз', 'Форелевый турнир', 'Ярмарка долины Стардью'],
      rightIndex: 3,
    },
    {
      text: 'Что происходит, если фермер не вернётся домой ночью?',
      answers: ['Персонаж уснёт и потеряет деньги', 'Персонаж потеряет сознание и станет призраком', 'Жители городка устраивают масштабный поиск', 'Начинается квест на поиск пропавшего предмета'],
      rightIndex: 0,
    },
];

const SCREEN_NODES = document.querySelectorAll('.screen');
const ANSWER_NODES = document.querySelectorAll('.answer');
const START_GAME_BUTTONS = document.querySelectorAll('.start-game');
const POINTS_NODES = document.querySelectorAll('.points');
const PRIZE_FOR_RIGHT_ANSWER = 1;
const HIGHLIGHT_TIMEOUT_MS = 1500;

let activeQuestionIndex = 0;
let points = 0;

START_GAME_BUTTONS.forEach((button) =>
    button.addEventListener('click', startNewGame)
);

function startNewGame() {
    showScreen(1);
    setActiveQuestion(0);
    updatePointsDisplay(0);
}

function showScreen(index) {
    SCREEN_NODES.forEach((screen, i) => {
    screen.classList.toggle('visible', i === index);
    });
}

function updatePointsDisplay(newPoints) {
    points = newPoints;
    POINTS_NODES.forEach((pointsNode) => (pointsNode.textContent = points));
}

function setActiveQuestion(index) {
    activeQuestionIndex = index;

    const QUESTION_NODE = document.querySelector('.question');
    const activeQuestion = QUESTIONS[index];

    QUESTION_NODE.textContent = activeQuestion.text;
    activeQuestion.isChecking = false;

    setupAnswers(activeQuestion);
}

function setupAnswers(question) {
    ANSWER_NODES.forEach((answerNode, index) => {
        const letters = ['A', 'B', 'C', 'D'];

        answerNode.textContent = `${letters[index]}. ${question.answers[index]}`;

        answerNode.addEventListener('click', () => 
        handleAnswerClick(answerNode, question)
        );
    });
}

async function handleAnswerClick(answerNode, question) {
    if(question.isChecking) {
    return;
    }

    question.isChecking = true;

    await highlightAnswer(answerNode, "active", HIGHLIGHT_TIMEOUT_MS);

    const rightAnswerNode = ANSWER_NODES[question.rightIndex];

    const isRightAnswer = answerNode.textContent === rightAnswerNode.textContent;

    await highlightAnswer(rightAnswerNode, "right", HIGHLIGHT_TIMEOUT_MS);
  
    if (!isRightAnswer) {
      showScreen(2);
      return;
    }

    const isLastQuestion = activeQuestionIndex === QUESTIONS.length - 1;

    if (isLastQuestion) {
      showScreen(3);
    } else {
      setActiveQuestion(activeQuestionIndex + 1);
    }
    updatePointsDisplay(points + PRIZE_FOR_RIGHT_ANSWER);
}

async function highlightAnswer(answerNode, type, timeoutMs) {
    answerNode.classList.add(type);

    if (timeoutMs) {
      await timeout(timeoutMs);
    }
    clearClassnamesFromQuestionNode(answerNode);
  }

function clearClassnamesFromQuestionNode(answerNode) {
    ['active', 'right', 'wrong'].forEach((className) =>
      answerNode.classList.remove(className)
    );
  }

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}