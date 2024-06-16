// Retrieve query parameters from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Extract data from query parameters
const totalQuestions = parseInt(urlParams.get('totalQuestions'));
const attemptedQuestions = parseInt(urlParams.get('attemptedQuestions'));
const passFail = urlParams.get('passFail');
const correctAnswers = parseInt(urlParams.get('correctAnswers'));
const wrongAnswers = parseInt(urlParams.get('wrongAnswers'));
const percentage = urlParams.get('percentage');

// Retrieve time data for each question from the query parameters
const questionTimes = [];
for (let i = 0; i < attemptedQuestions; i++) {
    const time = parseFloat(urlParams.get(`time${i}`));
    if (!isNaN(time)) {
        questionTimes.push(time);
    }
}

// Calculate total time taken
let totalTime = 0;
if (questionTimes.length > 0) {
    totalTime = questionTimes.reduce((total, time) => total + time, 0);
}

// Update HTML elements with the retrieved data
document.getElementById('totalTime').textContent = totalTime.toFixed(2) + " seconds";
document.getElementById('totalQuestions').textContent = totalQuestions;
document.getElementById('attemptedQuestions').textContent = attemptedQuestions;
document.getElementById('passFail').textContent = passFail;
document.getElementById('correctAnswers').textContent = correctAnswers;
document.getElementById('wrongAnswers').textContent = wrongAnswers;
document.getElementById('percentage').textContent = percentage;
