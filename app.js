// field

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const mousePointValue = 10;
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const btnLineWidth = document.getElementById("btn-line-width");
const btnText = document.getElementById("btn-text");
const btnFile = document.getElementById("btn-file");
const btnMode = document.getElementById("btn-mode");
const btnDestroy = document.getElementById("btn-destroy");
const btnEraser = document.getElementById("btn-eraser");
const btnSave = document.getElementById("btn-save");

let isPainting = false;
let isFilling = false;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = btnLineWidth.value;
ctx.lineCap = "round";

// function - Draw

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX - mousePointValue, event.offsetY - mousePointValue);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX - mousePointValue, event.offsetY - mousePointValue);
}
function startPainting(){
    isPainting = true;
}
function endPainting(){
    isPainting = false;
}

// funcion - color

function onColorChange(event){
    ctx.beginPath();
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.beginPath();
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

// funcion - buttons

function onLineWidthChange(event){
    ctx.beginPath();
    ctx.lineWidth = event.target.value;
}
function onDoubleClick(event){
    const text = btnText.value;
    if(text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "30px serif";
        ctx.fillText(text, event.offsetX - mousePointValue, event.offsetY - mousePointValue);
        ctx.restore();
    }
}
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        btnFile.value = null;
    }
}
function onModeClick(){
    if(isFilling){
        isFilling = false;
        btnMode.innerText = "Fill";
    }else{
        isFilling = true;
        btnMode.innerText = "Draw";
    }
}
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick(){
    if(confirm("Destroy your painting.") === true){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onEraserClick(){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    isFilling = false;
    btnMode.innerText = "Fill";
}
function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

// addEventListener

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
btnLineWidth.addEventListener("change", onLineWidthChange);
btnFile.addEventListener("change", onFileChange);
btnMode.addEventListener("click", onModeClick);
btnDestroy.addEventListener("click", onDestroyClick);
btnEraser.addEventListener("click", onEraserClick);
btnSave.addEventListener("click", onSaveClick);
