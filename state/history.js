let history = [];
let history_index = -1;

export function saveState(svgElement) {
  // if user draw after undo, remove all redo history
  history = history.slice(0, history_index + 1);
  history.push(svgElement.innerHTML);
  history_index++;
}

export function getHistory() {
  return history;
}

export function getHistoryIndex() {
  return history_index;
}

export function setHistoryIndex(index) {
  history_index = index;
}