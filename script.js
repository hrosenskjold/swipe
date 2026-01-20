const compare = document.getElementById("compare");
const afterImg = document.getElementById("afterImg");
const slider = document.getElementById("slider");

let dragging = false;
let imageBox = null;

function calculateImageBox() {
  const containerRect = compare.getBoundingClientRect();
  const img = afterImg;

  if (!img.naturalWidth || !img.naturalHeight) return;

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const containerRatio = containerRect.width / containerRect.height;

  let width, height, left, top;

  if (imgRatio > containerRatio) {
    // letterbox top/bottom
    width = containerRect.width;
    height = width / imgRatio;
    left = 0;
    top = (containerRect.height - height) / 2;
  } else {
    // letterbox left/right
    height = containerRect.height;
    width = height * imgRatio;
    top = 0;
    left = (containerRect.width - width) / 2;
  }

  imageBox = { width, height, left, top };

  // 🔑 nulstil til 50 % hver gang vi recalculerer
  const x = width / 2;
  afterImg.style.clipPath = `inset(0 50% 0 0)`;
  slider.style.left = `${left + x}px`;
}

// ------------------ EVENTS ------------------

compare.addEventListener("pointerdown", e => {
  dragging = true;
  compare.setPointerCapture(e.pointerId);
  update(e);
});

compare.addEventListener("pointermove", e => {
  if (!dragging) return;
  update(e);
});

compare.addEventListener("pointerup", e => {
  dragging = false;
  compare.releasePointerCapture(e.pointerId);
});

compare.addEventListener("pointerleave", () => {
  dragging = false;
});

window.addEventListener("resize", calculateImageBox);
window.addEventListener("load", calculateImageBox);
afterImg.addEventListener("load", calculateImageBox);

// ------------------ LOGIK ------------------

function update(e) {
  if (!imageBox) return;

  const rect = compare.getBoundingClientRect();

  let x = e.clientX - rect.left - imageBox.left;
  x = Math.max(0, Math.min(x, imageBox.width));

  const percent = x / imageBox.width;

  afterImg.style.clipPath =
    `inset(0 ${(1 - percent) * 100}% 0 0)`;

  slider.style.left =
    `${imageBox.left + x}px`;
}
