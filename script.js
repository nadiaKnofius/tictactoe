let fields = [];
let shape = 'goomba';
let shapeBefore;
let winnerExist = false;

let fieldCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];


//also restart function
function startGame() {
    init();
    addHoverEffectToFields();
    hideAllShapes();
    checkActivePlayer();
}


function init(){
    document.getElementById('winner').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    fields = [];
    winnerExist = false;
    shapeBefore = '';
    document.getElementById('overlay').classList.add('d-none');
}


/**
    shows bubble around active player
*/ 
function checkActivePlayer() {
    if (shape == 'mario') {
        document.getElementById('activePlayer').style.boxShadow = '0px 1px 14px 5px rgba(190, 44, 1, 0.9)';
        let windowInnerWith = window.innerWidth;
        checkInnerWidth(windowInnerWith);
    } else {
        document.getElementById('activePlayer').style.transform = 'translateX(0%)';
        document.getElementById('activePlayer').style.boxShadow = '0px 1px 14px 5px rgba(103, 51, 0, 0.9)';
    }
}


/**
    resizes bubble around active player in depending on window innerwidth
*/ 
function checkInnerWidth(windowInnerWith) {
    switch (true) {
        case (windowInnerWith > 544): {
            document.getElementById('activePlayer').style.transform = 'translateX(307px)';
            break;
        }
        case (windowInnerWith >= 430 && windowInnerWith <= 544): {
            document.getElementById('activePlayer').style.transform = 'translateX(209px)';
            break;
        }
        case (windowInnerWith >= 335 && windowInnerWith < 430): {
            document.getElementById('activePlayer').style.transform = 'translateX(165px)';
            break;
        }
        case (windowInnerWith < 335): {
            document.getElementById('activePlayer').style.transform = 'translateX(115px)';
            break;
        }
    }
}


function addHoverEffectToFields() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`td${i}`).classList.add('air-blue-hover');
    }
}


function hideAllShapes() {
    addClassListDNoneToShapes('goomba-');
    addClassListDNoneToShapes('mario-');
}


function addClassListDNoneToShapes(id) {
    for (let i = 0; i < 9; i++) {
        let fullId = `${id}${i}`;
        document.getElementById(fullId).classList.add('d-none');
        document.getElementById(fullId).classList.remove('rotate360');
    }
}


function showSelectedShapeInField(i) {
    let currentShape;
    if (shape == 'mario') {
        let id = `mario-${i}`;
        let nextShape = 'goomba';
        preventDoubleShapesInFields(i, id, currentShape, nextShape)
    } else {
        let id = `goomba-${i}`;
        let nextShape = 'mario';
        preventDoubleShapesInFields(i, id, currentShape, nextShape)
    }
    document.getElementById(`td${i}`).classList.remove('air-blue-hover');
    pushSelectedFieldInArray(i);
    checkActivePlayer();
}


function preventDoubleShapesInFields(i, id, currentShape, nextShape) {
    if (fields.length == 0 || !fields[i]) {
        currentShape = document.getElementById(id);
        currentShape.classList.remove('d-none');
        shapeBefore = shape;
        shape = nextShape;
    }
}


function pushSelectedFieldInArray(i) {
    fields[i] = shapeBefore;
    checkAmountOfElementsInArray();
}


/**
    starts to check, if someone has won, when min 6 fields are filled
*/ 
function checkAmountOfElementsInArray() {
    if (allFieldsExists() >= 5) {
        checkWinner();
    }
}


/**
    checks, if someone has won or if it's a draw
*/ 
function checkWinner() {
    for (let i = 0; i < fieldCombinations.length; i++) {
        let fieldCombination = fieldCombinations[i];
        let field1 = fieldCombination[0];
        let field2 = fieldCombination[1];
        let field3 = fieldCombination[2];
        if(checkFieldCombination(field1, field2, field3)){
            break;
        }
    }
    allFieldsFull();
}


function checkFieldCombination(field1, field2, field3) {
    if (fields[field1] === fields[field2] && fields[field2] === fields[field3] && fields[field1]) {
        winnerExist = true;
        document.getElementById('overlay').classList.remove('d-none');
        showWinLine(field1, field2, field3);
        setTimeout(showWinnerAndRestartScreen, 1000);
        return true;
    }
}


function allFieldsFull() {
    if (fields.length == 9 && !winnerExist) {
        if (allFieldsExists() === 9)
        showItsADrawAndRestartScreen();
    }
}


function allFieldsExists() {
    let fieldExistsCounter = 0;
    for (let i = 0; i < fields.length; i++) {
        if (fields[i]) {
            fieldExistsCounter++;
        }
    }
    return fieldExistsCounter;
}


function showWinnerAndRestartScreen() {
    document.getElementById('startBtn').src = 'img/restart.png';
    document.getElementById('startScreen').classList.remove('d-none');
    if (shapeBefore == 'mario') {
        document.getElementById('winner').src = 'img/mario.png';
    } else{
        document.getElementById('winner').src = 'img/goomba.png';
    }
    document.getElementById('winner').classList.remove('d-none');
}


function showItsADrawAndRestartScreen(){
    document.getElementById('startBtn').src = 'img/restart.png';
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('winner').src = 'img/draw.png';
    document.getElementById('winner').classList.remove('d-none');
}


/**
    shapes with win combination will rotate 360deg
*/ 
function showWinLine(i, i2, i3) {
    let id = [i, i2, i3];
    for (let index = 0; index < 3; index++) {
        let element = id[index];
        let shapeId = document.getElementById(`${shapeBefore}-${element}`);
        setTimeout(addClassListRotate, 10, shapeId);
    }
}


function addClassListRotate(shapeId){
    shapeId.classList.add('rotate360');
}


window.addEventListener('resize', checkActivePlayer);