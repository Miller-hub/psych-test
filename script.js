let current = 0;
let score = {};
let questions = [];

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    restartQuiz();
  });

function loadQuestion() {
  const container = document.getElementById("quiz");
  const q = questions[current];
  container.innerHTML = `<div class="question"><p>${q.text}</p>` + q.options.map(opt => `
    <label class="option">
      <input type="radio" name="q${current}" value="${opt.value}" /> ${opt.label}
    </label>
  `).join("") + "</div>";
}

function nextQuestion() {
  const selected = document.querySelector(`input[name="q${current}"]:checked`);
  if (!selected) {
    alert("請選擇一個選項！");
    return;
  }
  const val = selected.value;
  score[val] = (score[val] || 0) + 1;
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    const resultType = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
    localStorage.setItem("quizResult", resultType);
    window.location.href = "result.html";
  }
}

function restartQuiz() {
  current = 0;
  score = {};
  document.getElementById("result")?.classList.add("hidden");
  document.getElementById("retry")?.classList.add("hidden");
  document.getElementById("quiz")?.classList.remove("hidden");
  loadQuestion();
}
