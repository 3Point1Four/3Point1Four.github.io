const codeSamples = {
  python: { file: "model.py", html: `<span class="code-comment"># A tiny piece of the ML mindset</span>\n<span class="code-keyword">def</span> <span class="code-function">prepare</span>(records):\n    clean = [r <span class="code-keyword">for</span> r <span class="code-keyword">in</span> records <span class="code-keyword">if</span> r]\n    <span class="code-keyword">return</span> clean` },
  javascript: { file: "interaction.js", html: `<span class="code-keyword">const</span> projects = document\n  .querySelectorAll(<span class="code-string">".project-card"</span>);\n\nprojects.forEach((project, index) => {\n  project.dataset.index = index + <span class="code-string">1</span>;\n});` },
  cpp: { file: "prototype.cpp", html: `<span class="code-comment">// Keep the prototype simple.</span>\n<span class="code-keyword">for</span> (<span class="code-keyword">const</span> <span class="code-keyword">auto</span>& item : data) {\n    <span class="code-keyword">if</span> (item.valid()) {\n        process(item);\n    }\n}` }
};

const output = document.querySelector("#code-output");
const file = document.querySelector("#code-file");
function showCode(language) {
  if (!output || !file) return;
  output.innerHTML = codeSamples[language].html;
  file.textContent = codeSamples[language].file;
  document.querySelectorAll(".code-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.code === language));
}
document.querySelectorAll(".code-tab").forEach(tab => tab.addEventListener("click", () => showCode(tab.dataset.code)));
showCode("python");
