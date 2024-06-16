let currentQuestion = 0; // Variable to keep track of the current question index
let score = 0; // Variable to keep track of the user's score
let timeinterval; // Variable to store the setInterval ID for the timer
 // Array to store the quiz questions
 const questions = [

    // Science questions
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Go", "Au", "Ag", "Gd"],
        correctAnswer: "Au"
    },
    {
        question: "What is the process by which plants make their own food called?",
        answers: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
        correctAnswer: "Photosynthesis"
    },
    {
        question: "What is the closest planet to the Sun?",
        answers: ["Venus", "Mars", "Mercury", "Earth"],
        correctAnswer: "Mercury"
    },
    {
        question: "What is the study of living organisms called?",
        answers: ["Chemistry", "Biology", "Physics", "Geology"],
        correctAnswer: "Biology"
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["H2O", "CO2", "NaCl", "CH4"],
        correctAnswer: "H2O"
    },
    {
        question: "What is the process of converting food into energy called?",
        answers: ["Metabolism", "Fermentation", "Respiration", "Photosynthesis"],
        correctAnswer: "Metabolism"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Steel", "Diamond", "Graphite", "Quartz"],
        correctAnswer: "Diamond"
    },
    {
        question: "What is the main gas found in the Earth's atmosphere?",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Nitrogen"
    },
    {
        question: "What force pulls objects towards the center of the Earth?",
        answers: ["Magnetism", "Gravity", "Friction", "Buoyancy"],
        correctAnswer: "Gravity"
    },
    {
        question: "What is the term for a word that joins words or groups of words together, like 'and' or 'but'?",
        answers: ["Noun", "Verb", "Adjective", "Conjunction"],
        correctAnswer: "Conjunction"
    }
];

// Array to store the time taken for each question
const questionTimes = [];

// Function to check the selected answer and record the time taken
function checkAnswer(btn) {
    const selectedAnswer = btn.textContent;
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const answerButtons = document.querySelectorAll('.btn');

    // Record the time taken for the current question
    const currentTime = 10 - parseInt(document.getElementById('timer').textContent);
    questionTimes.push(currentTime);

    // Check the selected answer
    if (selectedAnswer === correctAnswer) {
        score++;
        document.querySelector('.score').textContent = score;
        btn.style.backgroundColor = 'green';
    } else {
        for (let i = 0; i < answerButtons.length; i++) {
            if (answerButtons[i].textContent === correctAnswer) {
                answerButtons[i].style.backgroundColor = 'green';
            }
        }
        btn.style.backgroundColor = 'red';
    }

    // Disable buttons after an answer is selected
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    // After processing the answer, move to the next question
    // nextQuestion();
}

// Function to move to the next question
function nextQuestion() {
    // Check if there are more questions
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        // Update question text and answer buttons
        const questionElement = document.getElementById('question');
        questionElement.textContent = `${questions[currentQuestion].question}`;
        const answerButtons = document.querySelectorAll('.btn');
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].textContent = questions[currentQuestion].answers[i];
            answerButtons[i].style.backgroundColor = '';
            answerButtons[i].disabled = false;
        }
        // Update the progress
        updateProgress();
        // Reset the timer
        clearInterval(timeinterval);
        startTimer(10); // Change the timer duration here (e.g., 10 seconds)
    } else {
        // Construct the result URL with query parameters
        let resultUrl = `quizresult.html?totalQuestions=${questions.length}&attemptedQuestions=${currentQuestion + 1}&passFail=${score >= questions.length / 2 ? 'Pass' : 'Fail'}&correctAnswers=${score}&wrongAnswers=${questions.length - score}&percentage=${((score / questions.length) * 100).toFixed(2)}`;

        // Append time taken for each question to the URL
        for (let i = 0; i < questionTimes.length; i++) {
            resultUrl += `&time${i}=${questionTimes[i]}`;
        }

        // Redirect to the result page
        window.location.href = resultUrl;
    }
}

// Function to update the progress display
function updateProgress() {
    const progressElement = document.getElementById('progress');
    progressElement.textContent = `${currentQuestion + 1}/${questions.length}`;
}

// Function to start the timer
function startTimer(duration) {
    let timeleft = duration;
    const timer = document.getElementById('timer');
    timer.textContent = `${timeleft}`;
    timeleft--;
    timeinterval = setInterval(function () {
        if (timeleft > 0) {
            timer.textContent = `${timeleft}`;
            timeleft--;
        } else {
            clearInterval(timeinterval);
            timer.innerHTML = `Time's up`;
            nextQuestion();
        }
    }, 1000);
}

// Initialize the quiz
updateProgress();
startTimer(10); // Start the timer with a duration of 10 seconds