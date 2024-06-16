let currentQuestion = 0; // Variable to keep track of the current question index
let score = 0; // Variable to keep track of the user's score
let timeinterval; // Variable to store the setInterval ID for the timer

// Array to store the quiz questions
const questions = [
       // Math questions
    {
        question: "What is the result of 8 multiplied by 7?",
        answers: ["15", "56", "64", "72"],
        correctAnswer: "56"
    },
    {
        question: "If a rectangle has a length of 10 units and a width of 5 units, what is its area?",
        answers: ["25 square units", "30 square units", "40 square units", "50 square units"],
        correctAnswer: "50 square units"
    },
    {
        question: "What is the sum of the angles in a triangle?",
        answers: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
        correctAnswer: "180 degrees"
    },
    {
        question: "How many sides does a pentagon have?",
        answers: ["4", "5", "6", "7"],
        correctAnswer: "5"
    },
    {
        question: "What is 1/4 expressed as a decimal?",
        answers: ["0.25", "0.4", "0.5", "0.75"],
        correctAnswer: "0.25"
    },
    {
        question: "If a dozen eggs cost $3, how much do 2 dozen eggs cost?",
        answers: ["$3", "$6", "$9", "$12"],
        correctAnswer: "$6"
    },
    {
        question: "What is the next number in the sequence: 2, 4, 6, 8, ___?",
        answers: ["9", "10", "12", "14"],
        correctAnswer: "10"
    },
    {
        question: "What is 3/5 expressed as a percentage?",
        answers: ["20%", "40%", "50%", "60%"],
        correctAnswer: "60%"
    },
    {
        question: "If a square has a perimeter of 20 units, what is the length of one side?",
        answers: ["2 units", "4 units", "5 units", "10 units"],
        correctAnswer: "4 units"
    },
    {
        question: "What is the value of 10 squared?",
        answers: ["100", "50", "25", "10"],
        correctAnswer: "100"
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