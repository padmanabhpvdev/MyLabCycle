const quizData = {
    questions: [
        {
            question: "What software company is headquartered in Redmond, Washington?",
            options: ["Google", "Apple", "Microsoft", "Amazon"],
            answer: "Microsoft"
        },
        {
            question: "Which planet in the Milky Way is the hottest?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: "Venus"
        },
        {
            question: "What is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            answer: "Blue Whale"
        },
        {
            question: "Which planet has the most moons?",
            options: ["Neptune","Jupiter","Saturn","Uranus"],
            answer: "Saturn"
        },
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            answer: "JavaScript"
        },
        {
            question: "In what decade was the internet created?",
            options: ["1960s","1970s","1980s","1990s"],
            answer: "1960s"
        },
        {
            question: "What year was JavaScript launched?",
            options: ["1996", "1995", "1994", "None of the above"],
            answer: "1995"
        }
    ]
};

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const restartButton = document.getElementById('restart-btn');
const resultContainer = document.querySelector('.result-container');
const resultScore = document.getElementById('result-score');
const resultMessage = document.getElementById('result-message');
const progressElement = document.querySelector('.progress');
const quizContainer = document.querySelector('.quiz-container');

function loadQuestion() {
    const question = quizData.questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('div');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(button, option));
        optionsElement.appendChild(button);
    });       
    progressElement.textContent = `Question ${currentQuestion + 1} of ${quizData.questions.length}`;
    if (currentQuestion === quizData.questions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
    } else {
        nextButton.style.display = 'block';
        submitButton.style.display = 'none';
    }
    selectedOption = null;
}
function selectOption(element, option) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    selectedOption = option;
}
function checkAnswer() {
    if (!selectedOption) return false;
    const question = quizData.questions[currentQuestion];
    const options = document.querySelectorAll('.option'); 
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        if (option.textContent === question.answer) {
            option.classList.add('correct');
        }
        if (option.textContent === selectedOption && selectedOption !== question.answer) {
            option.classList.add('incorrect');
        }
    });    
    if (selectedOption === question.answer) {
        score++;
    }   
    return true;
}
function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    restartButton.style.display = 'block';
    resultScore.textContent = `Your score: ${score} out of ${quizData.questions.length}`;
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage>=80) {
        resultMessage.textContent = "Excellent! You're a quiz master!";
    } else if (percentage>=60) {
        resultMessage.textContent = "Good job! You know your stuff!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Keep learning!";
    } else {
        resultMessage.textContent = "Keep practicing! You'll get better!";
    }
}
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    quizContainer.style.display = 'block';
    loadQuestion();
}
nextButton.addEventListener('click', () => {
    if (!checkAnswer()) return;
    currentQuestion++;
    loadQuestion();
});
submitButton.addEventListener('click', () => {
    if (!checkAnswer()) return;
    showResult();
    restartButton.style.display = 'block';
});
restartButton.addEventListener('click', restartQuiz);
loadQuestion();