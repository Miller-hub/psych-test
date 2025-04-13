const form = document.getElementById("quizForm");

questions.forEach((q, index) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `
    <p>${q.text}</p>
    ${q.options.map(opt => `
      <label>
        <input type="radio" name="q${index}" value="${opt.value}" />
        ${opt.label}
      </label>
    `).join("")}
  `;
  form.appendChild(div);
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const answers = document.querySelectorAll("input[type='radio']:checked");
  if (answers.length < questions.length) {
    alert("請完成所有題目！");
    return;
  }

  const score = {};
  answers.forEach(a => {
    score[a.value] = (score[a.value] || 0) + 1;
  });

  const top = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  localStorage.setItem("quizResult", top);
  window.location.href = "result.html";
});
