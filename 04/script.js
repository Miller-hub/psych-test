const quizContainer = document.getElementById("quiz");
const progressText = document.getElementById("progress-text");
const progressFill = document.querySelector(".progress-fill");
const backBtn = document.getElementById("backBtn");

let currentQuestion = 0;
const answers = [];

function renderQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <div class="question">
      <p>${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="option" value="${opt.value}" ${answers[currentQuestion] === opt.value ? 'checked' : ''} />
          <span>${opt.text}</span>
        </label>
      `).join("")}
    </div>
  `;

  progressText.textContent = `第 ${currentQuestion + 1} 題 / 共 ${questions.length} 題`;
  const percent = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = percent + "%";

  backBtn.disabled = currentQuestion === 0;

  const allOptions = document.querySelectorAll("input[name='option']");
  allOptions.forEach(opt => {
    opt.addEventListener("change", (e) => {
      answers[currentQuestion] = e.target.value;
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          renderQuestion();
        } else {
          calculateResult();
        }
      }, 150);
    });
  });
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function calculateResult() {
  const score = {};
  answers.forEach(a => {
    score[a] = (score[a] || 0) + 1;
  });
  const result = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  localStorage.setItem("quizResult", result);
  localStorage.setItem("quizAnswers", JSON.stringify(answers));
  window.location.href = "result.html";
}

document.getElementById("backBtn").addEventListener("click", prevQuestion);
renderQuestion();
