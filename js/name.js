const pirannName = document.querySelector(".pirann-name");
if (pirannName) {
  const pirannVisual = pirannName.querySelector(".pirann-visual");
  const pirannSelectable = pirannName.querySelector(".pirann-selectable");
  const pirannFull = "Pirann";
  const pirannAlias = "3point1four";
  let pirannTimer = null, pirannHovering = false, selectionActive = false, currentVisible = 6;

  const renderPirann = count => { pirannVisual.textContent = pirannFull.slice(0, count) + "."; currentVisible = count; };
  const renderAlias = count => { pirannVisual.textContent = pirannAlias.slice(0, count) + "."; };
  const animateTo = target => {
    clearInterval(pirannTimer);
    if (currentVisible === target) return;
    const direction = target > currentVisible ? 1 : -1;
    pirannTimer = setInterval(() => {
      currentVisible += direction;
      renderPirann(currentVisible);
      if (currentVisible === target) { clearInterval(pirannTimer); pirannTimer = null; }
    }, 22);
  };

  pirannName.addEventListener("pointerenter", () => { pirannHovering = true; if (!selectionActive) animateTo(2); });
  pirannName.addEventListener("pointerleave", () => { pirannHovering = false; if (!selectionActive) animateTo(6); });

  const getSelectionCount = () => {
    const selection = window.getSelection();
    const node = pirannSelectable.firstChild;
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed || !node) return 0;
    if (selection.anchorNode !== node || selection.focusNode !== node) return 0;
    return Math.max(0, Math.min(pirannAlias.length, Math.max(selection.anchorOffset, selection.focusOffset)));
  };

  document.addEventListener("selectionchange", () => {
    const count = getSelectionCount();
    if (count > 0) {
      selectionActive = true;
      clearInterval(pirannTimer);
      pirannName.classList.add("is-selected");
      renderAlias(count);
    } else if (selectionActive) {
      selectionActive = false;
      pirannName.classList.remove("is-selected");
      if (pirannHovering) animateTo(2); else animateTo(6);
    }
  });
  pirannSelectable.addEventListener("mousedown", () => clearInterval(pirannTimer));
  renderPirann(6);
}
