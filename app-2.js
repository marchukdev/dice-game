// hide dice image
function hideDice() {
    document.querySelector('.dice').style.display = 'none';
}

// Reset all 
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

// Reset round scores and go to the next player
function togglePlayer() {
    // 1. Reset round scores
    roundScore = 0;

    // 2. Reset shown round result
    document.querySelector('#current-' + activePlayer).textContent = '0';
    hideDice();

    // 4. Toggle active player
    (activePlayer === 0) ? activePlayer = 1 : activePlayer = 0;

    // 3. Toggle active player style
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

var scores, roundScore, activePlayer, gamePlaying;

init();

hideDice();

// Roll Dice button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Generate dice number
        var dice = Math.floor(Math.random() * 6) + 1,
        diceDOM = document.querySelector('.dice');

        // 2. Show dice image 
        diceDOM.style.display = 'block';
        diceDOM.src = 'images/dice-' + dice + '.png';

        // 3. Show round scores or toogle to the next player if dice = 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            togglePlayer();
        }
    }
});

// Hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Add round score to total score and show it
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        
        // 2. If player win
        if (scores[activePlayer] >= document.querySelector('input').value) {
            gamePlaying = false;

            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            hideDice();

            document.querySelector('#current-' + activePlayer).textContent = '0';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            togglePlayer();
        }
    }
});

// New Game button
document.querySelector('.btn-new').addEventListener('click', function () {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');

    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
    
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    init();

    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
});