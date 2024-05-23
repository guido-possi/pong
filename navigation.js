document.addEventListener('DOMContentLoaded', (event) => {
    const startScreen = document.getElementById('start-screen');
    const difficultyScreen = document.getElementById('difficulty-screen');
    const gameScreen = document.getElementById('game-screen');
    
    const onePlayerButton = document.getElementById('one-player-button');
    const twoPlayerButton = document.getElementById('two-player-button');
    const playButton = document.getElementById('play-button');
    
    const easyButton = document.getElementById('easy-button');
    const normalButton = document.getElementById('normal-button');
    const hardButton = document.getElementById('hard-button');
    const nightmareButton = document.getElementById('nightmare-button');
    
    let isSinglePlayer = false;
    let difficulty = 'normal';
    
    onePlayerButton.addEventListener('click', () => {
        isSinglePlayer = true;
        startScreen.classList.remove('active');
        difficultyScreen.classList.add('active');
    });
    
    twoPlayerButton.addEventListener('click', () => {
        isSinglePlayer = false;
        startScreen.classList.remove('active');
        gameScreen.classList.add('active');
        initializeGame();
    });
    
    playButton.addEventListener('click', () => {
        startScreen.classList.remove('active');
        gameScreen.classList.add('active');
        initializeGame();
    });
    
    easyButton.addEventListener('click', () => startGame('easy'));
    normalButton.addEventListener('click', () => startGame('normal'));
    hardButton.addEventListener('click', () => startGame('hard'));
    nightmareButton.addEventListener('click', () => startGame('nightmare'));
    
    function startGame(selectedDifficulty) {
        difficulty = selectedDifficulty;
        difficultyScreen.classList.remove('active');
        gameScreen.classList.add('active');
        initializeGame();
    }
    
    function initializeGame() {
        if (isSinglePlayer) {
            console.log('Single Player mode with difficulty:', difficulty);
        } else {
            console.log('Two Player mode');
        }
        gameLoop();
    }
});
