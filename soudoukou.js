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
            document.getElementById(`${i + 1}${j + 1}`).setAttribute("style", "background-color: none;")
            if (fild.value != null) {
                document.getElementById(`${i + 1}${j + 1}`).setAttribute("value", `${""}`)
                document.getElementById(`${i + 1}${j + 1}`).disabled = false;
            }
        }
    }
    let back_color;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`${i + 1}${j + 1}`).disabled = true;
            if (puzzle[i][j] != null) {
                document.getElementById(`${i + 1}${j + 1}`).setAttribute("value", `${puzzle[i][j]}`)
                switch (level) {
                    case "Easy":
                        document.getElementById(`${i + 1}${j + 1}`).setAttribute("style", "background-color: rgba(0, 140, 255, 0.572);")
                        back_color = "rgba(0, 140, 255, 0.2)";
                        break;
                    case "Medume":
                        document.getElementById(`${i + 1}${j + 1}`).setAttribute("style", "background-color: rgba(229, 255, 0, 0.60);")
                        back_color = "rgba(229, 255, 0, 0.2)";
                        break;
                    case "Hard":
                        document.getElementById(`${i + 1}${j + 1}`).setAttribute("style", "background-color: rgba(255, 170, 0, 0.627);")
                        back_color = "rgba(255, 170, 0, 0.2)";
                        break;
                    case "Expert":
                        document.getElementById(`${i + 1}${j + 1}`).setAttribute("style", "background-color: rgba(255, 0, 0, 0.572);")
                        back_color = "rgba(255, 0, 0, 0.2)";
                        break;
                }
            }
        }
    }
    let level_color = document.getElementsByClassName("color");
    let level_color_len = level_color.length;
    for (let i = 0; i < level_color_len; i++) {
        if (!level_color[i].value)
            level_color[i].setAttribute("style", "background-color:" + `${back_color}`);
    }
    let title_level = document.getElementById("title")
    title_level.innerHTML = `${level}`;
    document.getElementById("start").setAttribute("style", "pointer-events: all;background-color:rgba(0, 255, 0, 0.804);")
}
function disable_levels() {
    let level_but = document.getElementsByClassName("choice");
    document.getElementById("start").setAttribute("style", "pointer-events: all;background-color:gray;")
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
            if (Number(document.getElementById("min_val").innerHTML) == Number(minst) && Number(document.getElementById("sec_val").innerHTML) >= Number(secondst) && document.getElementById("h_val").innerHTML == 0) {
                if (check_solve('false')) {
                    document.getElementById("chrono").setAttribute("style", "background-color:crimson;")
                    let game_over = document.getElementById("game_over");
                    game_over.style.display = "block";
                    clearInterval(timer);
                    disable_inputs();
                    document.getElementById('check').disabled = true;
                    document.getElementById('reset').disabled = true;
                    document.getElementById("sec_val").innerHTML = `${secondsc}`
                }
                else {
                    let puzzle_solved = document.getElementById("puzzel_solved");
                    puzzle_solved.style.display = "block";
                    console.log("khoud3aaaa");
                }
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

function check_solve(check_but) {
    let puzzle =[]; /* [
        [3, 1, 6, 5, 7, 8, 4, 9, 2],
        [5, 2, 9, 1, 3, 4, 7, 6, 8],
        [4, 8, 7, 6, 2, 9, 5, 3, 1],
        [2, 6, 3, 4, 1, 5, 9, 8, 7],
        [9, 7, 4, 8, 6, 3, 1, 2, 5],
        [8, 5, 1, 7, 9, 2, 6, 4, 3],
        [1, 3, 8, 9, 4, 7, 2, 5, 6],
        [6, 9, 2, 3, 5, 1, 8, 7, 4],
        [7, 4, 5, 2, 8, 6, 3, 1, 9]
    ];*/
    let fild;
    for (let i = 0; i < 9; i++) {
        puzzle[i] = [];
        for (let j = 0; j < 9; j++) {
            fild = document.getElementById(`${i + 1}${j + 1}`);
            puzzle[i][j] = fild.value;
        }
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!/[1-9]/.test(puzzle[i][j]) && puzzle[i][j] != '') { alert("there is in accepatble character in the puzzel!?"); return false; }
        }
    }
    if (check_but == 'true') {
        if (check_rows(puzzle) && check_cols(puzzle) && check_squar(puzzle)) {
            let puzzle_solved = document.getElementById("puzzel_solved");
            puzzle_solved.style.display = "block";
            console.log("khoud3aaaa1");
        } else {
            alert("Incorrect solution! There are duplicates in rows, columns, or squares.");
        }
    } else {
        if (check_rows(puzzle) && check_cols(puzzle) && check_squar(puzzle)) return false;
        else return true;
    }
}
set_timer();
disable_inputs();