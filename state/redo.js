import { getHistory, getHistoryIndex, setHistoryIndex } from './history.js';

function redo(svgElement) {
  const history = getHistory();
  let history_index = getHistoryIndex();
  // if at the end of the history, do nothing
  if (history_index >= history.length - 1) {
    return;
  }
  history_index++;
  svgElement.innerHTML = history[history_index];
  setHistoryIndex(history_index);
}

export default redo;