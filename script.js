const QUESTIONS = [
    {
     text: "Вопрос 1",
     answers: ["Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4"],
     rightIndex: 1,
    },
    {
     text: "Вопрос 2",
     answers: ["Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4"],
     rightIndex: 2,
    },
];

const SCREEN_NODES = document.querySelectorAll('.screen');
const ANSWERS_NODES = document.querySelectorAll('.answer');
const START_GAME_BUTTONS = document.querySelectorAll('.start-game');
const POINTS_NODES = document.querySelectorAll('.points');
const PRIZE_FOR_RIGHT_ANSWER = 1;
const HIGHLIGHT_TIMEOUT_MS = 1500;

let activeQuestionIndex = 0;
let points = 0;

START_GAME_BUTTONS.forEach(button => {
    button.addEventListener('click', startNewGame)
});

function startNewGame() {
    showScreen(1);
    setActiveQuestion(0);
}

function showScreen(index) {
    SCREEN_NODES.forEach((screen, i)=>{
    screen.classList.toggle('visible', i === index);
    });
}

function setActiveQuestion(index) {
    activeQuestionIndex = index;

    const QUESTION_NODE = document.querySelector('.question');
    const activeQuestion = QUESTIONS[index];

    QUESTION_NODE.textContent = activeQuestion.text;

    setupAnswers(activeQuestion);
}

function setupAnswers(question) {
    ANSWERS_NODES.forEach((answerNode, index) => {
        answerNode.textContent = question.answers[index];
    });
}