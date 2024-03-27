function generateSudokuPuzzle(difficulty) {
    let numFilledCells = 0;
    switch (difficulty) {
        case "easy":
            numFilledCells = 60;
            break;
        case "medium":
            numFilledCells = 50;
            break;
        case "hard":
            numFilledCells = 40;
            break;
        case "expert":
            numFilledCells = 30;
            break;
        default:
            numFilledCells = 60; // Default to easy difficulty
    }
        let puzzle = [];
        // Initialize puzzle with empty cells
        for (let i = 0; i < 9; i++) {
            puzzle[i] = [];
            for (let j = 0; j < 9; j++) {
                puzzle[i][j] = null;
            }
        }
        // Randomly fill some cells to create the puzzle pattern
        for (let i = 0; i < numFilledCells; i++) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            let num = Math.floor(Math.random() * 9) + 1;
            if (puzzle[row][col] === null && isValidMove(puzzle, row, col, num)) {
                puzzle[row][col] = num;
            }
        }
        return puzzle;
    }

function isValidMove(puzzle, row, col, num) {
    // Check if the number is already present in the row or column
    for (let i = 0; i < 9; i++) {
        if (puzzle[row][i] === num || puzzle[i][col] === num) {
            return false;
        }
    }
    // Check if the number is already present in the 3x3 subgrid
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

// Generate 100 Sudoku puzzles of easy difficulty
let easySudokuPuzzles = generateSudokuPuzzles("easy");
console.log("Easy Sudoku Puzzles:", easySudokuPuzzles);

// Generate 100 Sudoku puzzles of medium difficulty
let mediumSudokuPuzzles = generateSudokuPuzzles("medium");
console.log("Medium Sudoku Puzzles:", mediumSudokuPuzzles);

// Generate 100 Sudoku puzzles of hard difficulty
let hardSudokuPuzzles = generateSudokuPuzzles("hard");
console.log("Hard Sudoku Puzzles:", hardSudokuPuzzles);
// Generate 100 Sudoku puzzles of hard difficulty
let expertSudokuPuzzles = generateSudokuPuzzles("expert");
console.log("Expert Sudoku Puzzles:", expertSudokuPuzzles);

// function full_sudou_matrix() {
//     let matrix = [];
//     for (let i = 0; i < 9; i++) {
//         matrix[i] = [];
//         for (let j = 0; j < 9; j++) {
//             matrix[i][j] = Math.floor(Math.random() * 9) + 1;
//         }
//     }
//     return matrix;
// }
// function remove_nbrs(matrix, level) {
//     switch (level) {
//         case "easy":
//             nbr_toremouv = 30;
//             break;
//         case "medume":
//             nbr_toremouv = 40;
//             break;
//         case "hard":
//             nbr_toremouv = 50;
//             break;
//         case "expert":
//             nbr_toremouv = 60;
//             break;
//     }
//     for (let j = 0; j < nbr_toremouv; j++) {
//         let nbr_r = Math.floor(Math.random() * 9);
//         let nbt_c = Math.floor(Math.random() * 9);
//         matrix[nbr_r][nbt_c] = null;
//     }
//     return matrix;
// }
// function check_rows(Sudoku) {
//     for (let i = 0; i < 9; i++) {
//         let set = new Set();
//         for (let j = 0; j < 9; j++){
//             if (set.has(Sudoku[i][j])) return true; else if (Sudoku[i][j] != null) set.add(Sudoku[i][j]);
//         }
//     }
//     return false;
// }
// function check_cols(Sudoku) {
//     for (let i = 0; i < 9; i++) {
//         for (let j = 0; j < 9; j++) {
//             let set = new Set();
//             if (set.has(Sudoku[i][j])) return true; else if (Sudoku[i][j] != null) set.add(Sudoku[i][j]);
//         }
//     }
// }
// function check_squar(Sudoku) {
//     for (let i = 0; i < 9; i += 3) {
//         for (let j = 0; j < 9; j += 3) {
//             let set = new Set();
//             for (let l = i; l < i + 3; l++) {
//                 for (let k = j; k < j + 3; k++) {
//                     if (set.has(Sudoku[l][k])) return true; else if (Sudoku[l][k] != null) set.add(Sudoku[l][k]);
//                 }
//             }
//         }
//     }
//     return false;
// }
// function check_solve(Sudoku) {
//     if (check_rows(Sudoku) || check_cols(Sudoku) || check_squar(Sudoku)) return false; else return true;
// }
// let is;
// do {
//     let mat = remove_nbrs(full_sudou_matrix(), "expert");
//     is = check_solve(mat);
//     console.log(mat);
//     console.log(is);
// } while (!is)
