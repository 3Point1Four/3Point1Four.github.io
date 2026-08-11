const codeSamples = {
  python: {
    file: "model.py",
    html: `<span class="code-comment"># A tiny piece of the ML mindset</span>
<span class="code-keyword">def</span> <span class="code-function">prepare</span>(records):
    clean = [r <span class="code-keyword">for</span> r <span class="code-keyword">in</span> records <span class="code-keyword">if</span> r]
    <span class="code-keyword">return</span> clean`
  },
  javascript: {
    file: "interaction.js",
    html: `<span class="code-keyword">const</span> projects = document
  .querySelectorAll(<span class="code-string">".project-card"</span>);

projects.forEach((project, index) => {
  project.dataset.index = index + <span class="code-string">1</span>;
});`
  },
  cpp: {
    file: "prototype.cpp",
    html: `<span class="code-comment">// Keep the prototype simple.</span>
<span class="code-keyword">for</span> (<span class="code-keyword">const</span> <span class="code-keyword">auto</span>& item : data) {
    <span class="code-keyword">if</span> (item.valid()) {
        process(item);
    }
}`
  }
};

const output = document.querySelector("#code-output");
const file = document.querySelector("#code-file");

function showCode(language) {
  output.innerHTML = codeSamples[language].html;
  file.textContent = codeSamples[language].file;
  document.querySelectorAll(".code-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.code === language);
  });
}

document.querySelectorAll(".code-tab").forEach(tab => {
  tab.addEventListener("click", () => showCode(tab.dataset.code));
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});



/* Pirann / Pi / 3point1four interaction.
   The visual layer is separate from the selectable text layer so the
   element keeps a fixed footprint and never moves the hover target. */
const pirannName = document.querySelector(".pirann-name");
const pirannVisual = document.querySelector(".pirann-visual");
const pirannSelectable = document.querySelector(".pirann-selectable");
const pirannFull = "Pirann";
const pirannShort = "Pi";
const pirannAlias = "3point1four";
let pirannHoverTimer;
let pirannHovering = false;

function renderPirann(text, visibleCount = text.length, highlightedCount = 0) {
  pirannVisual.innerHTML = "";
  [...text].forEach((letter, index) => {
    const span = document.createElement("span");
    span.className = "pirann-letter";
    span.textContent = letter;
    if (index >= visibleCount) span.classList.add("is-hidden");
    if (index < highlightedCount && index < visibleCount) span.classList.add("is-highlighted");
    pirannVisual.appendChild(span);
  });
}

function animatePirann(target) {
  clearInterval(pirannHoverTimer);
  const current = [...pirannVisual.textContent];
  const targetLetters = [...target];
  const maxLength = Math.max(current.length, targetLetters.length);
  let step = 0;

  pirannHoverTimer = setInterval(() => {
    step += 1;
    if (step > maxLength) {
      clearInterval(pirannHoverTimer);
      return;
    }
    if (target === pirannShort) {
      renderPirann(pirannFull, Math.max(pirannShort.length, pirannFull.length - step));
    } else {
      renderPirann(pirannFull, Math.min(pirannFull.length, pirannShort.length + step));
    }
  }, 90);
}

pirannName.addEventListener("pointerenter", () => {
  pirannHovering = true;
  animatePirann(pirannShort);
});

pirannName.addEventListener("pointerleave", () => {
  pirannHovering = false;
  animatePirann(pirannFull);
});

let lastSelectionCount = 0;

document.addEventListener("selectionchange", () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  if (!pirannName.contains(selection.anchorNode) || !pirannName.contains(selection.focusNode)) return;

  const selectedText = selection.toString();
  const count = Math.min(selectedText.length, pirannAlias.length);
  if (!count || count === lastSelectionCount) return;
  lastSelectionCount = count;

  clearInterval(pirannHoverTimer);
  renderPirann(pirannAlias, count, count);
});

document.addEventListener("mouseup", () => {
  requestAnimationFrame(() => {
    const selection = window.getSelection();
    if (!selection || selection.toString() === "" || !pirannName.contains(selection.anchorNode)) {
      lastSelectionCount = 0;
      renderPirann(pirannHovering ? pirannFull : pirannFull, pirannHovering ? pirannShort.length : pirannFull.length);
    }
  });
});

renderPirann(pirannFull, pirannFull.length);

document.querySelector("#year").textContent = new Date().getFullYear();
showCode("python");
