function generatesudokupuzzle(level) {
    let numFilledCells = 0;
    switch (level) {
        case "Easy":
            numFilledCells = 60;
            break;
        case "Medume":
            numFilledCells = 50;
            break;
        case "Hard":
            numFilledCells = 40;
            break;
        case "Expert":
            numFilledCells = 30;
            break;
        default:
            numFilledCells = 60;
    }
    let puzzle = [];
    for (let i = 0; i < 9; i++) {
        puzzle[i] = [];
        for (let j = 0; j < 9; j++) {
            puzzle[i][j] = null;
        }
    }

    for (let i = 0; i < numFilledCells; i++) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        let num = Math.floor(Math.random() * 9) + 1;
        if (puzzle[row][col] === null && isvalidmove(puzzle, row, col, num)) {
            puzzle[row][col] = num;
        }
    }
    console.log(puzzle);
    return puzzle;
}
function disable_inputs() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            fild = document.getElementById(`${i + 1}${j + 1}`);
            if (fild.value != null) {
                document.getElementById(`${i + 1}${j + 1}`).disabled = true;
            }
        }
    }
}
function isvalidmove(puzzle, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (puzzle[row][i] === num || puzzle[i][col] === num) {
            return false;
        }
    }
    let subgridRowStart = Math.floor(row / 3) * 3;
    let subgridColStart = Math.floor(col / 3) * 3;
    for (let i = subgridRowStart; i < subgridRowStart + 3; i++) {
        for (let j = subgridColStart; j < subgridColStart + 3; j++) {
            if (puzzle[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

function set_up_puzzle(level) {
    let puzzle = generatesudokupuzzle(level);
    let fild;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            fild = document.getElementById(`${i + 1}${j + 1}`);
            if (fild.value != null) {
                document.getElementById(`${i + 1}${j + 1}`).setAttribute("value", `${""}`)
                document.getElementById(`${i + 1}${j + 1}`).disabled = false;
            }
        }
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`${i + 1}${j + 1}`).disabled = true;
            if (puzzle[i][j] != null) {
                document.getElementById(`${i + 1}${j + 1}`).setAttribute("value", `${puzzle[i][j]}`)
            }
        }
    }
    let title_level = document.getElementById("title")
    title_level.innerHTML = `${level}`;
    document.getElementById("start").setAttribute("style", "pointer-events: all;")
}
function disable_levels() {
    let level_but = document.getElementsByClassName("choice");
    let level_but_len = level_but.length
    for (let i = 0; i < level_but_len; i++) {
        level_but[i].setAttribute("style", "pointer-events: none; background-color: gray;")
    }
}
function New_geme() {
    location.reload()
}
function start() {
    document.getElementById('check').disabled = false;
    document.getElementById('reset').disabled = false;
    if (document.getElementById('timer').value == "true") {
        let secondst = document.getElementById('s').value;
        let minst = document.getElementById('m').value;
        let hourst = document.getElementById('h').value;
        document.getElementById('time').innerHTML = `${hourst}h${minst}min${secondst}sec`;
        let secondsc = 0;
        let timer;
        let inct_sec = function () {
            ++secondsc;
            document.getElementById("sec_val").innerHTML = `${secondsc}`;
            if (secondsc > 59) {
                document.getElementById("min_val").innerHTML = String(Number(document.getElementById("min_val").innerHTML) + 1);
                secondsc = 0;
                document.getElementById("sec_val").innerHTML = `${secondsc}`
            }
            if (Number(document.getElementById("min_val").innerHTML) == Number(minst)  && Number(document.getElementById("sec_val").innerHTML) >= Number(secondst) && document.getElementById("h_val").innerHTML == 0) {
                alert("game over!?");
                clearInterval(timer);
                disable_inputs();
                document.getElementById("sec_val").innerHTML = `${secondsc}`
            }
            console.log(secondsc);
        }
        timer = setInterval(inct_sec, 1000);
        // document.getElementById("sec_val").innerHTML = secondsc;
        // if (document.getElementById('check_sec1').innerHTML === document.getElementById('sec_val').innerHTML) clearInterval(timer);
    }
    disable_levels();
    document.getElementById("chro").setAttribute("style", "pointer-events: none;padding: 0.5vw;");
    let fild;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            fild = document.getElementById(`${i + 1}${j + 1}`);
            if (fild.value == '') {
                document.getElementById(`${i + 1}${j + 1}`).disabled = false;
            }
        }
    }
    document.getElementById("desable_setup").setAttribute("style", "pointer-events: none;padding: 0.5vw;")
}
function set_timer() {
    document.getElementById("chro").setAttribute("style", "pointer-events: none;padding: 0.5vw;");
    let set_time = document.getElementById("timer");
    if (set_time.value == "true") {
        document.getElementById("chro").setAttribute("style", "pointer-events: all;padding: 0.5vw;");
    }
}
function check_rows(Sudoku) {
    for (let i = 0; i < 9; i++) {
        let set = new Set();
        for (let j = 0; j < 9; j++) {
            if (Sudoku[i][j] !== null) {
                if (set.has(Sudoku[i][j])) {
                    console.log('row');
                    return false;
                }
                set.add(Sudoku[i][j]);
            }
        }
    }
    return true;
}

function check_cols(Sudoku) {
    for (let i = 0; i < 9; i++) {
        let set = new Set();
        for (let j = 0; j < 9; j++) {
            if (Sudoku[j][i] !== null) {
                if (set.has(Sudoku[j][i])) {
                    console.log('column');
                    return false;
                }
                set.add(Sudoku[j][i]);
            }
        }
    }
    return true;
}

function check_squar(Sudoku) {
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let set = new Set();
            for (let l = i; l < i + 3; l++) {
                for (let k = j; k < j + 3; k++) {
                    if (Sudoku[l][k] !== null) {
                        if (set.has(Sudoku[l][k])) {
                            console.log('square');
                            return false;
                        }
                        set.add(Sudoku[l][k]);
                    }
                }
            }
        }
    }
    return true;
}

function check_solve() {
    let puzzle = [];
    let fild;
    for (let i = 0; i < 9; i++) {
        puzzle[i] = [];
        for (let j = 0; j < 9; j++) {
            fild = document.getElementById(`${i + 1}${j + 1}`);
            puzzle[i][j] = fild.value;
        }
    }
    if (check_rows(puzzle) && check_cols(puzzle) && check_squar(puzzle)) {
        alert("Congratulations! You have solved the Sudoku correctly!");
    } else {
        alert("Incorrect solution! There are duplicates in rows, columns, or squares.");
    }
}
set_timer();
disable_inputs();