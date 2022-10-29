grid = []
for (let i = 0; i < 4; i++) {
    row = [];
    for (let j = 0; j < 4; j++) {
        if (i === 3 && j == 3) {
            row[j] = 0
            continue;
        }
        row[j] = 1;
    }
    grid[i] = row;
} 

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        if (i === 3 && j == 3) {
            continue
        }
        let cell = document.createElement('div')
        cell.setAttribute('row', i);
        cell.setAttribute('col', j);
        cell.addEventListener("click", (event) => checkGap(cell));
        cell.style.transition = 'all 5s';
        cell.style.backgroundPosition = `-${(j)*20}vw -${(i)*20}vw`
        cell.style.gridRowStart = i + 1;
        cell.style.gridRowEnd = i + 2;
        cell.style.gridColumnStart = j + 1;
        cell.style.gridColumnEnd = j + 1;
        cell.classList = `cell cell${i}${j}`
        mainBoard = document.getElementsByClassName('main-board')[0]
        mainBoard.appendChild(cell);
    }
} 




// checkGap(grid)


function checkGap(cell) {
    row = parseInt(cell.getAttribute('row'));
    col = parseInt(cell.getAttribute('col'));
    console.log(row, col);
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
        cell.style.gridRowStart = result[0] + 1;
        cell.style.gridRowEnd = result[0] + 2;
        cell.style.gridColumnStart = result[1] + 1;
        cell.style.gridColumnEnd = result[1] + 2;
        cell.setAttribute('row', result[0]);
        cell.setAttribute('col', result[1]);
        console.log('result' + result)
    }
    return result;
}