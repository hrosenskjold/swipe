const compare = document.getElementById("compare");
const afterImg = document.getElementById("afterImg");
const slider = document.getElementById("slider");

let dragging = false;
let imageBox = null;

function calculateImageBox() {
  const container = compare.getBoundingClientRect();
  const img = afterImg;

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const containerRatio = container.width / container.height;

  let width, height, left, top;

  if (imgRatio > containerRatio) {
    // letterbox top/bottom
    width = container.width;
    height = width / imgRatio;
    left = 0;
    top = (container.height - height) / 2;
  } else {
    // letterbox left/right
    height = container.height;
    width = height * imgRatio;
    top = 0;
    left = (container.width - width) / 2;
  }

  imageBox = { width, height, left, top };
}

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

window.addEventListener("resize", calculateImageBox);
window.addEventListener("load", calculateImageBox);
afterImg.addEventListener("load", calculateImageBox);

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
