let currentQuestion = 0; // Variable to keep track of the current question index
let score = 0; // Variable to keep track of the user's score
let timeinterval; // Variable to store the setInterval ID for the timer
 // Array to store the quiz questions
 const questions = [

    // English questions
    {
        question: "What do you call a word that has the opposite meaning of another word?",
        answers: ["Synonym", "Homonym", "Antonym", "Homophone"],
        correctAnswer: "Antonym"
    },
    {
        question: "Which part of speech is used to describe a noun or pronoun?",
        answers: ["Verb", "Adjective", "Adverb", "Preposition"],
        correctAnswer: "Adjective"
    },
    {
        question: "What is the term for a group of words that contains a subject and a predicate?",
        answers: ["Sentence", "Paragraph", "Clause", "Phrase"],
        correctAnswer: "Sentence"
    },
    {
        question: "What is a word that imitates the sound it represents, like 'buzz' or 'hiss'?",
        answers: ["Rhyme", "Metaphor", "Simile", "Onomatopoeia"],
        correctAnswer: "Onomatopoeia"
    },
    {
        question: "Which punctuation mark is used to end a statement?",
        answers: ["Period (.)", "Comma (,)", "Question mark (?)", "Exclamation mark (!)"],
        correctAnswer: "Period (.)"
    },
    {
        question: "What type of literature is made up of imaginary characters and events?",
        answers: ["Fiction", "Non-fiction", "Biography", "Autobiography"],
        correctAnswer: "Fiction"
    },
    {
        question: "What is the term for a word that has the same or similar meaning as another word?",
        answers: ["Synonym", "Antonym", "Homonym", "Homophone"],
        correctAnswer: "Synonym"
    },
    {
        question: "What is the plural form of the word 'child'?",
        answers: ["Childs", "Childen", "Child's", "Children"],
        correctAnswer: "Children"
    },
    {
        question: "What is the term for a figure of speech that compares two things using 'like' or 'as'?",
        answers: ["Rhyme", "Metaphor", "Simile", "Onomatopoeia"],
        correctAnswer: "Simile"
    },
    {
        question: "What is the name of a word that joins words or groups of words together, like 'and' or 'but'?",
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