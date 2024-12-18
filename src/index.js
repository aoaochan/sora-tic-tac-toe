const board = [
    [
        document.getElementsByClassName("box f a")[0],
        document.getElementsByClassName("box f b")[0],
        document.getElementsByClassName("box f c")[0],
    ],
    [
        document.getElementsByClassName("box s a")[0],
        document.getElementsByClassName("box s b")[0],
        document.getElementsByClassName("box s c")[0],
    ],
    [
        document.getElementsByClassName("box t a")[0],
        document.getElementsByClassName("box t b")[0],
        document.getElementsByClassName("box t c")[0],
    ]
];

let map;
let turn = true;
let gameover = false;

function thereEmpty(col, row) {
    return map[col][row] === 0;
}

function reset() {
    turn = true;
    gameover = false;
    document.getElementById("result").style.background = '';

    map = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    for (const boxline of board) {
        for (const box of boxline) {
            const [col, row] = box.className.split(' ').filter((_, i) => i !== 0).map((c) => {
                switch (c) {
                    case 'f': return 0;
                    case 's': return 1;
                    case 't': return 2;
                    case 'a': return 0;
                    case 'b': return 1;
                    case 'c': return 2;
                }
            });

            box.innerHTML = "";
            box.onclick = () => {
                if (turn && thereEmpty(col, row) && !gameover) {
                    box.innerHTML = `<img src="./assets/o.png" />`;
                    map[col][row] = 1;
                    if (winCheck(1)) {
                        // document.getElementById("result").style.background = 'url("./assets/win.png")';
                        gameover = true;
                    } else {
                        turn = false;
                        aiTurn();
                    }
                }
            };
        }
    }
}

function aiTurn() {
    if (gameover) return;

    // AI tries to win or block the player
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (map[i][j] === 0) {
                // AI tries to win
                map[i][j] = 2;
                if (winCheck(2)) {
                    board[i][j].innerHTML = `<img src="./assets/x.png" />`;
                    // document.getElementById("result").style.background = 'url("./assets/lose.png")';
                    gameover = true;
                    return;
                }
                map[i][j] = 0;
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (map[i][j] === 0) {
                // AI tries to block the player
                map[i][j] = 1;
                if (winCheck(1)) {
                    map[i][j] = 2;
                    board[i][j].innerHTML = `<img src="./assets/x.png" />`;
                    turn = true;
                    return;
                }
                map[i][j] = 0;
            }
        }
    }

    // If no win/block, choose center if available
    if (map[1][1] === 0) {
        map[1][1] = 2;
        board[1][1].innerHTML = `<img src="./assets/x.png" />`;
        turn = true;
        return;
    }

    // Otherwise, choose a random empty spot
    let emptySpaces = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (map[i][j] === 0) {
                emptySpaces.push([i, j]);
            }
        }
    }

    if (emptySpaces.length > 0) {
        const [aiCol, aiRow] = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
        map[aiCol][aiRow] = 2;
        board[aiCol][aiRow].innerHTML = `<img src="./assets/x.png" />`;
    }

    turn = true;

    // Check for draw condition
    if (emptySpaces.length === 1 && !gameover) {
        // document.getElementById("result").style.background = 'url("./assets/lose.png")';
        gameover = true;
    }
}

function winCheck(playerMark) {
    const winPatterns = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const pattern of winPatterns) {
        if (pattern.every(([x, y]) => map[x][y] === playerMark)) {
            return true;
        }
    }
    return false;
}

reset();

document.getElementById("btn-reset").addEventListener("click", reset);

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

document.addEventListener("keydown", (e) => {
    if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
    e.preventDefault();
    }

    if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
    e.preventDefault();
    }

    if (e.key === 'Tab') {
    e.preventDefault();
    }

    if (e.ctrlKey && e.key === 'p') {
    e.preventDefault();
    }

    if (e.ctrlKey && e.key === 'j') {
    e.preventDefault();
    }

    if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
    }

    if (e.ctrlKey && e.key === 'f') {
    e.preventDefault();
    }

    if (e.ctrlKey && e.key === 'h') {
    e.preventDefault();
    }

    if (e.ctrlKey && e.key === 'g') {
    e.preventDefault();
    }

    if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    }

    if (e.ctrlKey && e.key === 'o') {
    e.preventDefault();
    }
});
