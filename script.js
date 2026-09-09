/*
e = event
clr_btn = clear button
*/
import undo from './state/undo.js';
import redo from './state/redo.js';
import { saveState } from './state/history.js';

const svgEditor = document.getElementById('svgEditor');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const pencil = document.getElementById('pencil');
const eraser = document.getElementById('eraser');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const clearBtn = document.getElementById('clearBtn');

let isDrawing = false;
let currentPath = null;
let pathData = '';
let currentTool = 'pencil';
let isErasing = false;

svgEditor.addEventListener('mousedown', startDrawing);
svgEditor.addEventListener('mousemove', draw);
svgEditor.addEventListener('mouseup', stopDrawing);
svgEditor.addEventListener('mouseleave', stopDrawing);
pencil.addEventListener('click', () => {
  currentTool = 'pencil';
});
eraser.addEventListener('click', () => {
  currentTool = 'eraser';
});
undoBtn.addEventListener('click', () => {
  undo(svgEditor);
});
redoBtn.addEventListener('click', () => {
  redo(svgEditor);
});
clearBtn.addEventListener('click', () => {
  svgEditor.innerHTML = '';
});
svgEditor.addEventListener('mousedown', (e) => {
  if (currentTool === 'eraser') {
    isErasing = true;
    eraseElement(e);
  }
});

// mouseover is perfect for SVG because it triggers when the cursor enters a path
svgEditor.addEventListener('mouseover', (e) => {
  if (currentTool === 'eraser' && isErasing) {
    eraseElement(e);
  }
});

svgEditor.addEventListener('mouseup', () => {
  if (isErasing) {
    isErasing = false;
    saveState(svgEditor); // save the history after finish erasing
  }
});

saveState(svgEditor);

function startDrawing(e) {
  if (currentTool !== 'pencil') return;
  isDrawing = true;
  // create new svg path element
  currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  currentPath.setAttribute('stroke', colorPicker.value);
  currentPath.setAttribute('stroke-width', brushSize.value);
  currentPath.setAttribute('fill', 'none');
  currentPath.setAttribute('stroke-linecap', 'round');
  // set starting coord using M (Move to)
  pathData = `M ${e.offsetX} ${e.offsetY}`;
  currentPath.setAttribute('d', pathData);
  svgEditor.appendChild(currentPath);
}

function draw(e) {
  if (!isDrawing || currentTool !== 'pencil') return;
  // add a line to new coord using L (Line to)
  pathData += ` L ${e.offsetX} ${e.offsetY}`;
  currentPath.setAttribute('d', pathData);
}

function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;
}

function eraseElement(e) {
  // ensure we don't delete the entire SVG container
  if (e.target !== svgEditor && e.target.tagName !== 'svg') {
    e.target.remove();
  }
}