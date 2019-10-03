const xo = document.getElementById('xo');
const panes = xo.querySelectorAll('.pane');
const panesArray = Array.from(panes);
const winStates = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
const players = ['x', 'o'];

let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 0;
let cp = players[currentPlayer];
let movesDone = 0;

launchGame();

function launchGame() {
  for (let i = 0; i < panesArray.length; i++) {
    const pane = panesArray[i];

    pane.addEventListener('click', function() {
      const isTickedAgain = this.classList.contains('x') || this.classList.contains('o');

      if (!isTickedAgain) {
        setMove(this, i);
        checkIfWon();
        changePlayer();
      }
    });
  }
}

function setMove(self, i) {
  self.classList.add(cp);
  gameState[i] = cp;
  movesDone++;
}

function changePlayer() {
  currentPlayer = 1 - currentPlayer;
  cp = players[currentPlayer];
}

function checkIfWon() {
  if (movesDone > 2) {
    for (let winState of winStates) {
      let Xs = 0;
      let Os = 0;

      for (let paneIndex of winState) {
        if (gameState[paneIndex] === 'x') {
          Xs++;
        } else if (gameState[paneIndex] === 'o') {
          Os++;
        }
      }

      if (Xs === 3) {
        alert('X won!');
        clearState();
        break;
      }

      if (Os === 3) {
        alert('O won!');
        clearState();
        break;
      }
    }

    if (movesDone === 9) {
      alert('Draw!');
      clearState();
    }
  }
}

function clearState() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  movesDone = 0;

  for (const pane of panes) {
    pane.classList.remove('x');
    pane.classList.remove('o');
  }
}
