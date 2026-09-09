import { getHistory, getHistoryIndex, setHistoryIndex } from './history.js';

function undo(svgElement) {
  const history = getHistory();
  let history_index = getHistoryIndex();
  // if at the beginning of the history, do nothing
  if (history_index <= 0) {
    return;
  }
  history_index--;
  svgElement.innerHTML = history[history_index];
  setHistoryIndex(history_index);
}

export default undo;