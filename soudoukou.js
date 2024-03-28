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

function fillpuzzle(level) {
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
function refresh() {
    location.reload()
}
function start() {
    disable_levels();
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
function set_timer(){
    document.getElementById("chro").setAttribute("style", "pointer-events: none;padding: 0.5vw;");
    let set_time = document.getElementById("timer");
    if (set_time.value == "true"){
        document.getElementById("chro").setAttribute("style", "pointer-events: all;padding: 0.5vw;");
    }
}
set_timer();
disable_inputs();