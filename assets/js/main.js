// Let readers inspect the layers while keeping the complete diagram visible without JavaScript.
const footer = document.querySelector(".figurefoot");
const label = footer.firstChild;
const layers = [
  { selector: ".bottom", text: "Infrastructure · Terraform" },
  { selector: ".middle", text: "Workloads · Kubernetes" },
  { selector: ".top", text: "Telemetry · CloudWatch" }
];
const caption = document.createElement("span");
caption.setAttribute("aria-live", "polite");
caption.textContent = label.textContent;
label.replaceWith(caption);
const control = document.createElement("button");
control.type = "button";
control.textContent = "Explore layers →";
footer.lastElementChild.replaceWith(control);
let index = 0;
control.addEventListener("click", () => {
  const layer = layers[index];
  for (const plate of document.querySelectorAll(".plate")) {
    plate.style.filter = plate.matches(layer.selector) ? "brightness(1.23)" : "brightness(.64)";
  }
  caption.textContent = layer.text;
  control.textContent = "Next layer →";
  index = (index + 1) % layers.length;
});
