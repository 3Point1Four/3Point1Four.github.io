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



/* Pirann / Pi / 3point1four interaction. */
const pirannName = document.querySelector(".pirann-name");
const pirannVisual = document.querySelector(".pirann-visual");
const pirannSelectable = document.querySelector(".pirann-selectable");
const pirannFull = "Pirann";
const pirannAlias = "3point1four";
let pirannTimer = null;
let pirannHovering = false;
let selectionActive = false;
let currentVisible = pirannFull.length;

function renderPirann(count) {
  pirannVisual.textContent = pirannFull.slice(0, count) + ".";
  currentVisible = count;
}

function renderAlias(count) {
  pirannVisual.textContent = pirannAlias.slice(0, count) + ".";
}

function animateTo(targetCount) {
  clearInterval(pirannTimer);
  if (currentVisible === targetCount) return;
  const direction = targetCount > currentVisible ? 1 : -1;
  pirannTimer = setInterval(() => {
    currentVisible += direction;
    renderPirann(currentVisible);
    if (currentVisible === targetCount) {
      clearInterval(pirannTimer);
      pirannTimer = null;
    }
  }, 22);
}

pirannName.addEventListener("pointerenter", () => {
  pirannHovering = true;
  if (!selectionActive) animateTo(2);
});

pirannName.addEventListener("pointerleave", () => {
  pirannHovering = false;
  if (!selectionActive) animateTo(pirannFull.length);
});

function getSelectionCount() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return 0;

  const textNode = pirannSelectable.firstChild;
  if (!textNode) return 0;

  const anchorInside = selection.anchorNode === textNode;
  const focusInside = selection.focusNode === textNode;
  if (!anchorInside || !focusInside) return 0;

  return Math.max(0, Math.min(pirannAlias.length, Math.max(selection.anchorOffset, selection.focusOffset)));
}

document.addEventListener("selectionchange", () => {
  const count = getSelectionCount();
  if (count > 0) {
    selectionActive = true;
    clearInterval(pirannTimer);
    renderAlias(count);
    return;
  }

  if (selectionActive) {
    selectionActive = false;
    if (pirannHovering) animateTo(2);
    else animateTo(pirannFull.length);
  }
});

pirannSelectable.addEventListener("mousedown", () => clearInterval(pirannTimer));

renderPirann(pirannFull.length);

document.querySelector("#year").textContent = new Date().getFullYear();
showCode("python");
