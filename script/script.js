let players = [];
const addPlayer = document.getElementById('addPlayerBtn');
const inputField = document.getElementById('playerName');
const placeholders = document.querySelectorAll('.playerPlaceholder');

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
