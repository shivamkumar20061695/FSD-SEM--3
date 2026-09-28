const STORAGE_KEYS = {
  student: "fsdQuizStudent",
  answers: "fsdQuizAnswers",
  result: "fsdQuizResult"
};

const questions = [
  { text: "Which HTML element is used for the largest heading?", options: ["&lt;h6&gt;", "&lt;head&gt;", "&lt;h1&gt;", "&lt;header&gt;"], answer: 2 },
  { text: "Which CSS property changes the text color of an element?", options: ["font-color", "text-color", "color", "foreground"], answer: 2 },
  { text: "Which keyword declares a block-scoped variable in JavaScript?", options: ["var", "let", "define", "constant"], answer: 1 },
  { text: "Which DOM method selects an element by its unique ID?", options: ["document.querySelectorAll()", "document.getElementById()", "document.getElementsByClassName()", "document.selectId()"], answer: 1 },
  { text: "What is Node.js primarily used for?", options: ["Running JavaScript outside the browser", "Styling web pages", "Designing database tables", "Compiling HTML"], answer: 0 },
  { text: "In Express.js, what does app.get() define?", options: ["A database schema", "A GET route handler", "A CSS class", "A package dependency"], answer: 1 },
  { text: "Which HTTP method is conventionally used to create a new resource in a REST API?", options: ["GET", "PATCH", "POST", "DELETE"], answer: 2 },
  { text: "What is the main purpose of a primary key in a database table?", options: ["To style table rows", "To uniquely identify each record", "To encrypt the database", "To sort columns alphabetically"], answer: 1 },
  { text: "Which command records staged changes in a local Git repository?", options: ["git push", "git clone", "git commit", "git branch"], answer: 2 },
  { text: "What does full stack development commonly involve?", options: ["Only visual design", "Only database administration", "Frontend and backend development", "Only writing documentation"], answer: 2 }
];

const getStored = (key, fallback = null) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const setStored = (key, value) => localStorage.setItem(key, JSON.stringify(value));

function setupHome() {
  const form = document.getElementById("student-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const student = Object.fromEntries(formData.entries());
    const error = document.getElementById("form-error");
    if (Object.values(student).some((value) => !value.trim())) {
      error.textContent = "Please complete all five fields before starting the quiz.";
      return;
    }
    setStored(STORAGE_KEYS.student, student);
    setStored(STORAGE_KEYS.answers, Array(questions.length).fill(null));
    localStorage.removeItem(STORAGE_KEYS.result);
    window.location.href = "quiz.html";
  });
}










function setupQuiz() {
  const questionContainer = document.getElementById("question-container");
  if (!questionContainer) return;
  const student = getStored(STORAGE_KEYS.student);
  if (!student) { window.location.href = "index.html"; return; }
  const answers = getStored(STORAGE_KEYS.answers, Array(questions.length).fill(null));
  let currentQuestion = 0;
  let timeLeft = 10 * 60;
  let timer;

  document.getElementById("welcome-name").textContent = `Welcome, ${student.studentName}`;
  document.getElementById("display-roll").textContent = student.rollNumber;
  document.getElementById("display-branch").textContent = student.branch;
  document.getElementById("display-section").textContent = `Section ${student.section}`;
  document.getElementById("display-year").textContent = student.year;

  function renderQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question-label").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById("answered-count").textContent = `${answers.filter((answer) => answer !== null).length} answered`;
    document.getElementById("progress-bar").style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    questionContainer.innerHTML = `<p class="question-number">${String(currentQuestion + 1).padStart(2, "0")} / 10</p><h2 class="question-text">${question.text}</h2><div class="options-list">${question.options.map((option, index) => `<label class="option-label"><input type="radio" name="answer" value="${index}" ${answers[currentQuestion] === index ? "checked" : ""} /><span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span></label>`).join("")}</div>`;
    questionContainer.querySelectorAll("input").forEach((input) => input.addEventListener("change", () => {
      answers[currentQuestion] = Number(input.value);
      setStored(STORAGE_KEYS.answers, answers);
      document.getElementById("answered-count").textContent = `${answers.filter((answer) => answer !== null).length} answered`;
    }));
    document.getElementById("previous-button").disabled = currentQuestion === 0;
    document.getElementById("previous-button").style.opacity = currentQuestion === 0 ? "0.45" : "1";
    document.getElementById("next-button").classList.toggle("is-hidden", currentQuestion === questions.length - 1);
    document.getElementById("submit-button").classList.toggle("is-hidden", currentQuestion !== questions.length - 1);
  }

  document.getElementById("previous-button").addEventListener("click", () => { if (currentQuestion > 0) { currentQuestion -= 1; renderQuestion(); } });
  document.getElementById("next-button").addEventListener("click", () => { if (currentQuestion < questions.length - 1) { currentQuestion += 1; renderQuestion(); } });
  function submitQuiz(isTimeUp = false) {
    if (!isTimeUp && answers.some((answer) => answer === null)) { window.alert("Please answer all 10 questions before submitting."); return; }
    clearInterval(timer);
    const correct = answers.reduce((total, answer, index) => total + (answer === questions[index].answer ? 1 : 0), 0);
    setStored(STORAGE_KEYS.result, { correct, incorrect: questions.length - correct, percentage: Math.round((correct / questions.length) * 100) });
    window.location.href = "result.html";
  }

  document.getElementById("submit-button").addEventListener("click", () => submitQuiz());

  function startTimer() {
    timer = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = String(timeLeft % 60).padStart(2, "0");
      document.getElementById("timer").textContent = `${minutes}:${seconds}`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        window.alert("Time is up! Quiz will be submitted.");
        submitQuiz(true);
        return;
      }
      timeLeft -= 1;
    }, 1000);
  }

  renderQuestion();
  startTimer();
}

function setupResult() {
  const score = document.getElementById("score-value");
  if (!score) return;
  const student = getStored(STORAGE_KEYS.student);
  const result = getStored(STORAGE_KEYS.result);
  if (!student || !result) { window.location.href = "index.html"; return; }
  document.getElementById("result-name").textContent = student.studentName;
  document.getElementById("result-roll").textContent = student.rollNumber;
  document.getElementById("result-branch").textContent = student.branch;
  document.getElementById("result-section").textContent = student.section;
  document.getElementById("result-year").textContent = student.year;
  score.textContent = `${result.correct}/10`;
  document.getElementById("percentage-value").textContent = `${result.percentage}%`;
  document.getElementById("correct-value").textContent = result.correct;
  document.getElementById("incorrect-value").textContent = result.incorrect;
  document.getElementById("retake-button").addEventListener("click", () => {
    setStored(STORAGE_KEYS.answers, Array(questions.length).fill(null));
    localStorage.removeItem(STORAGE_KEYS.result);
    window.location.href = "quiz.html";
  });
}

setupHome();
setupQuiz();
setupResult();