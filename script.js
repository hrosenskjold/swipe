const compare = document.getElementById("compare");
const afterImg = document.getElementById("afterImg");
const slider = document.getElementById("slider");

let dragging = false;

compare.addEventListener("pointerdown", e => {
  dragging = true;
  update(e);
});

compare.addEventListener("pointermove", e => {
  if (!dragging) return;
  update(e);
});

window.addEventListener("pointerup", () => {
  dragging = false;
});

function update(e) {
  const rect = compare.getBoundingClientRect();
  let x = e.clientX - rect.left;
  x = Math.max(0, Math.min(x, rect.width));

  const percent = (x / rect.width) * 100;

  afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  slider.style.left = `${percent}%`;
}
// Vis swipe-hint én gang
setTimeout(() => {
  animateHint();
}, 400);

function animateHint() {
  let pos = 50;
  let dir = 1;
  let steps = 0;

  const interval = setInterval(() => {
    pos += dir * 1.2;
    if (pos > 58 || pos < 42) dir *= -1;

    afterImg.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    slider.style.left = `${pos}%`;

    steps++;
    if (steps > 40) clearInterval(interval);
  }, 16);
}
