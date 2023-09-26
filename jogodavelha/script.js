const startScreen = document.querySelector(".start-screen");
const gameScreen = document.getElementById("game-screen");
const board = document.getElementById("board");
const cells = [];
let currentPlayer = ""; // Armazenará o nome da imagem do personagem escolhido pelo jogador
let gameOver = false;

// Função para criar a grade do jogo
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        cells.push(cell);
        board.appendChild(cell);
    }
}

// Função para lidar com o clique em uma célula
function handleCellClick(event) {
    if (gameOver) return;
    const cell = event.target;
    if (cell.textContent === "") {
        cell.style.backgroundImage = `url('imagens/${currentPlayer}')`;
        checkWinner();
        // Não alternamos mais entre as imagens, pois o jogador já escolheu seu personagem
    }
}

// Função para iniciar o jogo com o personagem escolhido
function startGame(character) {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    currentPlayer = character; // Configura o personagem escolhido pelo jogador
    createBoard();
}

// Adicionar eventos de clique aos botões de escolha de personagem
const characterButtons = document.querySelectorAll(".character-button");
characterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const character = button.dataset.character;
        startGame(character); // Iniciar o jogo com o personagem escolhido
    });
});



// Função para verificar se há um vencedor
function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameOver = true;
            alert(`${cells[a].textContent} venceu!`);
        }
    }
}

// Função para iniciar o jogo
function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    createBoard();
}

// Adicionar evento de clique ao botão "Iniciar Jogo"
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);
