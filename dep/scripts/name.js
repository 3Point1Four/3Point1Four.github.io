/* Pirann / Pi / 3point1four interaction. */
const pirannName = document.querySelector(".pirann-name");

if (pirannName) {
  const pirannVisual = pirannName.querySelector(".pirann-visual");
  const pirannSelectable = pirannName.querySelector(".pirann-selectable");
  const pirannPeriod = pirannName.querySelector(".pirann-period");
  const pirannFull = "Pirann";
  const pirannAlias = "3point1four";
  let pirannTimer = null;
  let pirannHovering = false;
  let selectionActive = false;
  let currentVisible = pirannFull.length;

  function measureText(text) {
    const probe = document.createElement("span");
    const styles = getComputedStyle(pirannVisual);
    probe.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;pointer-events:none;font-family:${styles.fontFamily};font-size:${styles.fontSize};font-style:${styles.fontStyle};font-weight:${styles.fontWeight};letter-spacing:${styles.letterSpacing};`;
    probe.textContent = text;
    pirannName.appendChild(probe);
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    return width;
  }

  function positionPeriod(text) {
    pirannPeriod.style.left = `${measureText(text)}px`;
  }

  function renderPirann(count) {
    const text = pirannFull.slice(0, count);
    pirannVisual.textContent = text;
    pirannPeriod.style.display = text ? "block" : "none";
    positionPeriod(text);
    currentVisible = count;
  }

  function renderAlias(count) {
    const text = pirannAlias.slice(0, count);
    pirannVisual.textContent = text;
    pirannPeriod.style.display = text ? "block" : "none";
    positionPeriod(text);
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

    const range = selection.getRangeAt(0);
    const touchesName = pirannName.contains(range.commonAncestorContainer) ||
      pirannName.contains(selection.anchorNode) ||
      pirannName.contains(selection.focusNode);
    if (!touchesName) return 0;

    let start = -1;
    let end = -1;
    if (selection.anchorNode === textNode) start = selection.anchorOffset;
    if (selection.focusNode === textNode) end = selection.focusOffset;
    if (start < 0 || end < 0) return 0;

    return Math.max(0, Math.min(pirannAlias.length, Math.max(start, end)));
  }

  document.addEventListener("selectionchange", () => {
    const count = getSelectionCount();

    if (count > 0) {
      selectionActive = true;
      clearInterval(pirannTimer);
      pirannName.classList.add("is-selecting");
      renderAlias(count);
      return;
    }

    if (selectionActive) {
      selectionActive = false;
      pirannName.classList.remove("is-selecting");
      if (pirannHovering) animateTo(2);
      else animateTo(pirannFull.length);
    }
  });

  pirannSelectable.addEventListener("mousedown", () => clearInterval(pirannTimer));

  window.addEventListener("resize", () => {
    if (selectionActive) renderAlias(getSelectionCount() || 1);
    else positionPeriod(pirannVisual.textContent);
  });

  renderPirann(pirannFull.length);
}
