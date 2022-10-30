grid = []

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
        cell.style.transform = `translate(${j * 99}%, ${i * 99}%)`;
        cell.style.backgroundPosition = `-${(j)*20}vw -${(i)*20}vw`
        cell.classList = `cell cell${i}${j}`
        mainBoard = document.getElementsByClassName('main-board')[0]
        mainBoard.appendChild(cell);
    }
    grid[i] = row;
} 


function move(cell) {
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
        grid[result[0]][result[1]] = 1;
        cell.style.transform = `translate(${result[1] * 99}%, ${result[0] * 99}%)`;
        cell.setAttribute('row', result[0]);
        cell.setAttribute('col', result[1]);
    }
    isSolved();
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
isSolved();