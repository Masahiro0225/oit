async function search() {
  const day = document.getElementById("day").value;
  const period = document.getElementById("period").value;
  const target = day + period;

  const res = await fetch("data.csv");
  const text = await res.text();

  const rows = text.split("\n").map(r => r.split(","));

  const header = rows[0];
  const colIndex = header.indexOf(target);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (colIndex === -1) {
    resultDiv.innerHTML = "<p>見つかりません</p>";
    return;
  }

  let found = false;

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][colIndex] !== "×") {
      const div = document.createElement("div");
      div.className = "result-item";
      div.textContent = rows[i][0];
      resultDiv.appendChild(div);
      found = true;
    }
  }

  if (!found) {
    resultDiv.innerHTML = "<p>空き教室なし</p>";
  }
}
