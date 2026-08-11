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

document.querySelector("#year").textContent = new Date().getFullYear();
showCode("python");
