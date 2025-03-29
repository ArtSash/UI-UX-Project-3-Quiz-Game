const QUESTIONS = [
    {
        text: 'Вопрос 1',
        answers: ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4'],
        rightIndex: 1,
    },
    {
        text: 'Вопрос 2',
        answers: ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4'],
        rightIndex: 2,
    },
    {
        text: 'Вопрос 3',
        answers: ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4'],
        rightIndex: 3,
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