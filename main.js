let grid = []
let space = [3, 3]
let lastMoved = undefined;
let startTime;
let timer;
let moveNumber = 0;
let totalTime = 0;
let startLock = 0;

addEventListener('resize', (event) => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i === 3 && j == 3) {
                continue
            }
            let cell = document.getElementsByClassName(`cell${i}${j}`)[0];
            if (screen.width > screen.height) {
                cell.style.backgroundPosition = `-${(j)*15}vh -${(i)*15}vh`
            } else {
                cell.style.backgroundPosition = `-${(j)*20}vw -${(i)*20}vw`
            }
        }
    } 
    let mainContainer = document.getElementsByClassName('main-container')[0];
    let timerSection = document.getElementsByClassName('timer-shell')[0];
    let buttonSection = document.getElementsByClassName('button-section')[0];
    let buttonSectionShell = document.createElement('div');
    if (screen.width > screen.height) {
        buttonSectionShell.appendChild(buttonSection);
        timerSection.appendChild(buttonSectionShell);
    } else {
        mainContainer.appendChild(buttonSection);
        buttonSectionShell.remove();
    }
});

initialize();

function initialize() {

    for (let i = 0; i < 4; i++) {
        row = [];
        for (let j = 0; j < 4; j++) {
            if (i === 3 && j == 3) {
                row[j] = 0
                continue
            }
            row[j] = 1;
            let cell = document.createElement('div')
            cell.setAttribute('row', i);
            cell.setAttribute('col', j);
            cell.addEventListener("click", (event) => move(cell));
            
            cell.style.transform = `translate(${j * 100}%, ${i * 100}%) scale(1)`;
            console.log(screen.width, screen.height);
            if (screen.width > screen.height) {
                cell.style.backgroundPosition = `-${(j)*15}vh -${(i)*15}vh`
            } else {
                cell.style.backgroundPosition = `-${(j)*20}vw -${(i)*20}vw`
            }
            mainBoard = document.getElementsByClassName('main-board')[0]
            cell.classList = `cell cell${i}${j}`
            mainBoard.appendChild(cell);
            // console.log(cell.style.backgroundPosition);
        }
        grid[i] = row;
    } 
    
    if (screen.width > screen.height) {
        let timerSection = document.getElementsByClassName('timer-shell')[0];
        let buttonSection = document.getElementsByClassName('button-section')[0];
        let buttonSectionShell = document.createElement('div');
        buttonSectionShell.appendChild(buttonSection);
        timerSection.appendChild(buttonSectionShell);
    }
}


function move(cell) {
    moveNumber += 1;
    row = parseInt(cell.getAttribute('row'));
    col = parseInt(cell.getAttribute('col'));
    // console.log(row, col);
    let result = -1

    if (row - 1 >= 0 && !grid[row - 1][col]) {
        result = [row - 1, col]
    } 
    if (col + 1 < 4 && !grid[row][col + 1]) {
        result = [row, col + 1]
    }
    if (row + 1 < 4 && !grid[row + 1][col]) { 
        result = [row + 1, col]
    }
    if (col - 1 >= 0 && !grid[row][col - 1]) {
        result = [row, col - 1]
    }
    if (result !== -1) {
        grid[row][col] = 0;
        space = [row, col]
        grid[result[0]][result[1]] = 1;
        lastMoved = [result[0], result[1]];
        cell.style.transform = `translate(${result[1] * 100}%, ${result[0] * 100}%)`;
        cell.setAttribute('row', result[0]);
        cell.setAttribute('col', result[1]);
        console.log(space);
        isSolved();
    }
    return result;
}

function isSolved() {
    let solved = true;
    let mainBoard = document.getElementsByClassName('main-board')[0];
    for (let cell = 0; cell < mainBoard.children.length; cell = cell + 1) {
        let piece = mainBoard.children.item(cell);
        solved = solved && checkCellPos(piece);
    }
    if (solved) {
        console.log(moveNumber);
        showResult();
        clearInterval(timer);
        stopTimer();
        console.log('yes solved');
    }
    
}

function checkCellPos(piece) {
    let currentRow = parseInt(piece.getAttribute('row'));
    let currentCol = parseInt(piece.getAttribute('col'));
    let className = piece.classList[1];
    let validRow = parseInt(className.substring(className.length-2, className.length-1));
    let validCol = parseInt(className.substring(className.length-1));
    if (currentRow === validRow && currentCol === validCol) {
        return true;
    }
}


function shuffle() {
    let row = space[0];
    let col = space[1];
    console.log(`row ${row} col ${col}`);
    let allDirection = [];
    let possibleMovesIdx = [];
    if (row - 1 >= 0) {
        allDirection[0] = [row -1 , col];
        possibleMovesIdx.push(0);
    } 
    if (col + 1 < 4) {
        allDirection[1] = [row, col + 1];
        possibleMovesIdx.push(1);
    }
    if (row + 1 < 4) {
        allDirection[2] = [row + 1, col];
        possibleMovesIdx.push(2);
    }
    if(col - 1 >= 0) {
        allDirection[3] = [row, col - 1];
        possibleMovesIdx.push(3);
    }
    // console.log(allDirection);
    console.log(`allDirections ${allDirection}`);
    console.log(`possibleMovesIdx ${possibleMovesIdx}`);
    
    do {
        let randomIdx = Math.floor(Math.random() * possibleMovesIdx.length);
        let moveIdx = possibleMovesIdx[randomIdx];
        console.log(`randomIdx ${randomIdx}`);
        console.log(`moveIdx ${moveIdx}`);
        row = allDirection[moveIdx][0];
        col = allDirection[moveIdx][1];
    } while(pickRandomMove(row, col))

    let cell = document.querySelector(`[row='${row}'][col='${col}']`)
    move(cell);
    console.log(space);
}


function pickRandomMove(row, col) {
    console.log('lsatMoved', lastMoved);
    console.log('rowcol', row, col);
    if (lastMoved && (row !== lastMoved[0] && col !== lastMoved[1])) {
        console.log('came one');
        return false;
    } else if (!lastMoved) {
        console.log('came tow');
        return false;
    }
    console.log('came end');
    return true;   
}


function doShuffle() {
    let autoShuffle = setInterval(() => {
        shuffle();
    }, 500);

    setTimeout(() => {
        clearInterval(autoShuffle);
    }, 2000);
}

function preview() {
    mainBoard = document.getElementsByClassName('preview-board-hidden')[0];
    console.log(mainBoard);
    console.log(mainBoard.classList.toggle('preview-board-visible'));
}

function startGame() {
    if (startLock) {
        return;
    }
    startLock = 1;
    let startButton = document.getElementsByClassName('start-button')[0];
    if (startButton.innerHTML === 'Pause') {
        startButton.innerHTML = 'Continue';
        pauseTimer();
        startLock = 0;
        return;
    } else if (startButton.innerHTML === 'Continue') {
        startButton.innerHTML = 'Pause';
        continueTimer();
        startLock = 0;
        return;
    } else if (startButton.innerHTML === 'Play again') {
        toggleSuccess();
        hideResult();
    }
    doShuffle();
    setTimeout(() => {
        moveNumber = 0;
        startTime = Date.now();
        timer = setInterval(() => {
            updateTimer();
        }, 1000);
        let hand = document.getElementsByClassName('hand')[0];
        hand.classList.toggle('hand-animation');
        startButton.innerHTML = 'Pause';
        startLock = 0;
    }, 2100);
    
}

function updateTimer() {
    totalTime += 1;
    // let milliSeconds = Date.now() - startTime - totalPauseTime;
    let secondDisplay = document.getElementsByClassName('second-display')[0];
    let minuteDisplay = document.getElementsByClassName('minute-display')[0];
    // let second = (milliSeconds / 1000) % 60;
    let second = totalTime % 60;
    // let minute = milliSeconds / 1000 / 60;
    let minute = totalTime / 60;
    secondDisplay.innerHTML = `${Math.floor(second)} Seconds`;
    minuteDisplay.innerHTML = `${Math.floor(minute)} Minutes`;
}

function showResult() {
    let resultBoard = document.getElementsByClassName('preview-result-hidden')[0];
    let mainBoard = document.getElementsByClassName('main-board')[0];
    mainBoard.style.visibility = 'hidden';
    console.log(resultBoard.classList.toggle('preview-result-visible'));
    console.log(resultBoard);
}

function hideResult() {
    let resultBoard = document.getElementsByClassName('preview-result-hidden')[0];
    let mainBoard = document.getElementsByClassName('main-board')[0];
    mainBoard.style.visibility = 'visible';
    console.log(resultBoard.classList.toggle('preview-result-visible'));
    console.log(resultBoard);
}

function stopTimer() {
    let hand = document.getElementsByClassName('hand')[0];
    hand.classList.toggle('hand-animation');

    let secondDisplay = document.getElementsByClassName('second-display')[0];
    let minuteDisplay = document.getElementsByClassName('minute-display')[0];
    let second = secondDisplay.innerHTML.split(' ')[0];
    console.log(second);
    let minute = minuteDisplay.innerHTML.split(' ')[0];

    let timeTakenDisplay = document.getElementsByClassName('result-time-taken')[0];
    let movesUsedDisplay = document.getElementsByClassName('result-moves-used')[0];

    timeTakenDisplay.innerHTML = `${minute} Minutes ${second} Seconds`
    movesUsedDisplay.innerHTML = `${moveNumber}`;

    toggleSuccess();
}

function toggleSuccess() {
    let startButton = document.getElementsByClassName('start-button')[0];
    startButton.innerHTML = 'Play again';
    let previewButton = document.getElementsByClassName('preview-button')[0];
    let timer = document.getElementsByClassName('timer')[0];
    let clock = document.getElementsByClassName('clock')[0];
    let successClass = 'success-border';
    startButton.classList.toggle(successClass);
    previewButton.classList.toggle(successClass);
    timer.classList.toggle(successClass);
    clock.classList.toggle(successClass);

    let previewDisplay = document.getElementsByClassName('preview-board-hidden')[0];
    previewDisplay.classList.toggle('preview-board-visible');
}

function pauseTimer() {
    let hand = document.getElementsByClassName('hand')[0];
    hand.classList.toggle('hand-animation');
    clearInterval(timer);
}

function continueTimer() {
    let hand = document.getElementsByClassName('hand')[0];
    hand.classList.toggle('hand-animation');
    timer = setInterval(() => {
        updateTimer();
    }, 1000);
}