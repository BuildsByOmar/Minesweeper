// Variables globales pour les dimensions et paramètres du jeu
let ROWS; // Lignes
let COLS; // Colonnes
let MINES; // Mines
let grid = []; // Plateau
let gameOver = false; // État du jeu
let minesLeft; // Mines restantes
let timerInterval; // Intervalle du timer
let timeElapsed = 0; // Temps écoulé
const scoreboard = []; // Classement

// Éléments HTML
const gridContainer = document.getElementById("game-container");
const timerElement = document.getElementById("timer");
const minesCounterElement = document.getElementById("mines-counter");
const startButton = document.getElementById("start-button");
const difficultySelect = document.getElementById("difficulty");
const scoreboardElement = document.getElementById("scoreboard");

// Lancer une partie
startButton.addEventListener("click", initializeGame);

// Initialiser la partie
function initializeGame() {
    clearInterval(timerInterval); // Réinitialise le timer
    timeElapsed = 0;
    timerElement.textContent = "⏱️ Temps : 0s";

    // Paramètres selon difficulté
    const difficulty = difficultySelect.value;
    if (difficulty === "beginner") {
        ROWS = 9; COLS = 9; MINES = 10;
    } else if (difficulty === "intermediate") {
        ROWS = 16; COLS = 16; MINES = 40;
    } else if (difficulty === "expert") {
        ROWS = 22; COLS = 22; MINES = 100;
    } else if (difficulty === "master") {
        ROWS = 30; COLS = 30; MINES = 250;
    }

    // Réinitialise variables et affichages
    minesLeft = MINES;
    minesCounterElement.textContent = "💣 Mines restantes : " + minesLeft;
    grid = [];
    gameOver = false;
    gridContainer.innerHTML = "";
    gridContainer.style.gridTemplateColumns = `repeat(${COLS}, 30px)`;
    gridContainer.style.gridTemplateRows = `repeat(${ROWS}, 30px)`;

    // Crée le plateau et initialise les mines
    createGrid();
    placeMines();
    calculateNumbers();
    startTimer();
}

// Crée le plateau
function createGrid() {
    for (let row = 0; row < ROWS; row++) {
        grid[row] = [];
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Clique gauche : Révéler
            cell.addEventListener("click", function () {
                revealCell(parseInt(this.dataset.row), parseInt(this.dataset.col));
            });

            // Clic droit : Placer/Enlever drapeau
            cell.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                toggleFlag(parseInt(this.dataset.row), parseInt(this.dataset.col));
            });

            gridContainer.appendChild(cell);
            grid[row][col] = {
                element: cell,
                mine: false,
                revealed: false,
                flagged: false,
                count: 0 // Mines adjacentes
            };
        }
    }
}

// Place les mines aléatoirement
function placeMines() {
    let placed = 0;
    while (placed < MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        if (!grid[row][col].mine) {
            grid[row][col].mine = true;
            placed++;
        }
    }
}

// Calcule les chiffres pour chaque case
function calculateNumbers() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (grid[row][col].mine) continue;

            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (isValidCell(row + dr, col + dc) && grid[row + dr][col + dc].mine) {
                        count++;
                    }
                }
            }
            grid[row][col].count = count;
        }
    }
}

// Démarre le timer
function startTimer() {
    timerInterval = setInterval(function () {
        timeElapsed++;
        timerElement.textContent = "⏱️ Temps : " + timeElapsed + "s";
    }, 1000);
}

// Révèle une case
function revealCell(row, col) {
    if (gameOver || grid[row][col].revealed || grid[row][col].flagged) return;

    const cell = grid[row][col];
    cell.revealed = true;
    cell.element.classList.add("revealed");

    if (cell.mine) {
        cell.element.classList.add("mine");
        endGame(false); // Défaite
        return;
    }

    if (cell.count > 0) {
        cell.element.textContent = cell.count;
    } else {
        // Révèle les cases vides adjacentes
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (isValidCell(row + dr, col + dc)) {
                    revealCell(row + dr, col + dc);
                }
            }
        }
    }

    checkWin();
}

// Ajoute ou enlève un drapeau
function toggleFlag(row, col) {
    if (gameOver || grid[row][col].revealed) return;

    const cell = grid[row][col];
    cell.flagged = !cell.flagged;

    if (cell.flagged) {
        cell.element.classList.add("flag");
        cell.element.textContent = "🚩";
        minesLeft--;
    } else {
        cell.element.classList.remove("flag");
        cell.element.textContent = "";
        minesLeft++;
    }

    minesCounterElement.textContent = "💣 Mines restantes : " + minesLeft;
}

// Vérifie si une case est valide
function isValidCell(row, col) {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

// Vérifie si le joueur a gagné
function checkWin() {
    let revealedCount = 0;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (grid[row][col].revealed) revealedCount++;
        }
    }

    if (revealedCount === ROWS * COLS - MINES) endGame(true);
}

// Termine le jeu
function endGame(victory) {
    clearInterval(timerInterval);
    gameOver = true;

    // Révèle toutes les mines
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = grid[row][col];
            if (cell.mine) {
                cell.element.classList.add("mine");
            }
        }
    }

    setTimeout(function () {
        if (victory) {
            const name = prompt("Vous avez gagné ! Entrez votre nom :");
            if (name) updateScoreboard(name);
        } else {
            alert("💥 Vous avez perdu !");
        }
    }, 100);
}

// Met à jour le classement
function updateScoreboard(name) {
    scoreboard.push({ name: name, time: timeElapsed });
    scoreboard.sort(function (a, b) {
        return a.time - b.time;
    });

    scoreboardElement.innerHTML = "";
    scoreboard.forEach(function (entry) {
        const li = document.createElement("li");
        li.textContent = `${entry.name} - ${entry.time}s`;
        scoreboardElement.appendChild(li);
    });
}
