let players = [];
const addPlayer = document.getElementById('addPlayerBtn');
const inputField = document.getElementById('playerName');
const placeholders = document.querySelectorAll('.playerPlaceholder');
const startGame = document.getElementById('startGame');
const playerTurn = document.getElementById('playerTurn');
const whiteCard = document.getElementById('whiteCard');
const taskCard = document.getElementById('taskCard');
const nextPlayer = document.getElementById('nextPlayer');

addPlayer.addEventListener('click', () => {
    const playerName = inputField.value.trim();
    if (playerName === "") return; 
    if (players.length < 8) {
        players.push(playerName);
        updatePlayerList();
    } else {
        alert("Only 8 players are allowed!");
    }

    inputField.value = ""; 
});

function updatePlayerList() {
    players.forEach((player, index) => {
        placeholders[index].textContent = player;
        placeholders[index].style.color = "white"; 
    });

    for (let i = players.length; i < placeholders.length; i++) {
        placeholders[i].textContent = `Player ${i + 1}`;
        placeholders[i].style.color = ""; 
    }
}

startGame.addEventListener('click', () => { 
    if (players.length > 1) {
        startGame.classList.add('active');
    } else {
        startGame.classList.remove('active');
    }
    document.getElementById('setUpGame').style.display = "none";
    document.getElementById('playGame').style.display = "block";
    playerTurn.innerHTML = `${players[0]}`;
});

const getRandomTask = () => {
    fetch('../whiteCards.json')
        .then(response => response.json())
        .then(data => {
            const tasks = data.tasks; 
            const randomNumber = Math.floor(Math.random() * tasks.length);
            const task = tasks[randomNumber].task;
            taskCard.style.display = "block";
            document.getElementById('randomTask').innerHTML = task;
            whiteCard.style.display = "none";
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

whiteCard.addEventListener('click', getRandomTask);

nextPlayer.addEventListener('click', () => {
    const currentPlayer = playerTurn.textContent;
    const currentPlayerIndex = players.indexOf(currentPlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    playerTurn.innerHTML = players[nextPlayerIndex];
    whiteCard.style.display = "block";
    taskCard.style.display = "none";
});