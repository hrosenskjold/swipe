const compare = document.getElementById("compare");
const afterWrapper = document.getElementById("afterWrapper");
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

  afterWrapper.style.width = percent + "%";
  slider.style.left = percent + "%";
}
