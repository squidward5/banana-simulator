const clickbutton = document.getElementById("click");
const bananas = document.getElementById("clicks");
const upgradebutton = document.getElementById("upgrade");
const towerbuttons = document.getElementsByClassName("tower");
const sell = document.getElementById("sell");
const money = document.getElementById("coins");
const highscore = document.getElementById("highscore");
const highscoreButton = document.getElementById("highscorebutton")
const rebirthscoreButton = document.getElementById("rebirthscorebutton");
const rebirthButton = document.getElementById("rebirthbutton");
const rebirths = document.getElementById("rebirths");

const settingsMenu = document.getElementById("settingsmenu");
const settingsButton = document.getElementById("settingsbutton");
settingsMenu.style.visibility = 'hidden';

//comma format

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let towers = [];
let i = 0;
let coins = 0;
let upgrade = 1;
let upgradecost = 50;
let rebirthscore1 = parseInt(localStorage.getItem('rebirthscore1')) || 0;
let bananaHighScore = parseInt(localStorage.getItem('bananaHighScore')) || 0;
let moneyHighScore = parseInt(localStorage.getItem('moneyHighScore')) || 0;
let rebirthscoreSaver = parseInt(localStorage.getItem('rebirthscore1')) || 0;
highscore.innerText = `HIGHSCORE - bananas: ${bananaHighScore}, money: ${moneyHighScore}`;
rebirths.innerText = `rebirths: ${formatNumber(rebirthscoreSaver)}`;

function updateBananas() {
  bananas.innerText = "bananas: " + formatNumber(i);
}

function updateMoney() {
  money.innerText = "money: " + formatNumber(coins);
}

function updateHighScore() {
  if (i > bananaHighScore) {
    bananaHighScore = i;
    localStorage.setItem('bananaHighScore', bananaHighScore);
  }
  if (coins > moneyHighScore) {
    moneyHighScore = coins;
    localStorage.setItem('moneyHighScore', moneyHighScore);
  }
  highscore.innerText = `HIGHSCORE - bananas: ${formatNumber(bananaHighScore)}, money: ${formatNumber(moneyHighScore)}`;
}

function updateRebirths() {
  if (rebirthscore1 > rebirthscoreSaver) {
    rebirthscoreSaver = rebirthscore1;
    localStorage.setItem('rebirthscore1', rebirthscore1);
    console.log("Rebirth score saved:", rebirthscore1);
  }
  rebirths.innerText = `rebirths: ${formatNumber(rebirthscoreSaver)}`;
}

clickbutton.onclick = () => {
  i += upgrade + rebirthscoreSaver;
  updateBananas();
  updateHighScore();
};

upgradebutton.onclick = () => {
  if (i >= upgradecost) {
    i -= upgradecost;
    upgrade += 3;
    upgradecost += 50;
    updateBananas();
    upgradebutton.innerText = "upgrade (" + formatNumber(upgradecost) + " bananas)";
    updateHighScore();
  } else {
    alert("You don't have enough bananas!");
  }
};

for (let c = 0; c < towerbuttons.length; c++) {
  let tempbutton = towerbuttons[c];
  tempbutton.onclick = () => {
    if (tempbutton.id == "miner" && i >= 30) {
      towers.push("miner");
      i -= 30;
      updateBananas();
      updateHighScore();
    } else if (tempbutton.id == "stealer" && i >= 500) {
      towers.push("stealer");
      i -= 500;
      updateBananas();
      updateHighScore();
    } else if (tempbutton.id == "monkey" && coins >= 1000) {
      towers.push("monkey");
      coins -= 1000;
      updateMoney();
      updateHighScore();
    } else if (tempbutton.id == "farmer" && i >= 200) {
      towers.push("farmer");
      i -= 200;
      updateBananas();
      updateHighScore();
    } else if (tempbutton.id == "collector" && coins >= 4500) {
      towers.push("collector");
      coins -= 4500;
      updateMoney();
      updateHighScore();
    } else if (tempbutton.id == "marketer" && coins >= 8000) {
      towers.push("marketer");
      coins -= 8000;
      updateMoney();
      updateHighScore();
    }
  };
}

setInterval(() => {
  for (let c = 0; c < towers.length; c++) {
    if (towers[c] === "miner") {
      i += 2;
      updateBananas();
    }
    if (towers[c] === "farmer") {
      coins += 30;
      updateMoney();
    }
    if (towers[c] === "monkey") {
      i += 100;
      updateBananas();
    }
    if (towers[c] === "collector") {
      i += 350;
      coins += 700;
      updateBananas();
      updateMoney();
    }
    if (towers[c] === "marketer") {
      i += 1350;
      coins += 1600;
      updateBananas();
      updateMoney();
    }
  }
  updateHighScore();
}, 500);

sell.onclick = () => {
  coins += i;
  i = 0;
  updateBananas();
  updateMoney();
  updateHighScore();
};

//settings stuff

settingsButton.onclick = () => {
  if (settingsMenu.style.visibility === 'hidden' || settingsMenu.style.visibility === '') {
      settingsMenu.style.visibility = 'visible';
      settingsMenu.style.opacity = 1;
      settingsMenu.style.transform = 'translate(-50%, -50%) scale(1)';
  } else {
      settingsMenu.style.opacity = 0;
      settingsMenu.style.transform = 'translate(-50%, -50%) scale(0.9)';

      setTimeout(() => {
          settingsMenu.style.visibility = 'hidden';
      }, 300);
  }
};

let highscoreEnabled = false;
highscoreButton.onclick = () => {
    highscoreEnabled = !highscoreEnabled;

    if (highscoreEnabled) {
        highscoreButton.textContent = "OFF";
        highscore.style.display = "none";
        enableHighscore();
    } else {
        highscoreButton.textContent = "ON";
        highscore.style.display = "block";
        disableHighscore();
    }
};

function enableHighscore() {
    console.log("Highscore enabled");
}

function disableHighscore() {
    console.log("Highscore disabled");
}

function enableRebirthscore() {
  console.log("Rebirthscore enabled");
}

function disableRebirthscore() {
  console.log("Rebirthscore disabled");
}

rebirthButton.onclick = () => {
  if (i >= 1000000) {
    coins = 0;
    i = 0;
    updateBananas();
    updateMoney();

    rebirthscore1 += 1;
    updateRebirths();

    bananaHighScore = 0;
    moneyHighScore = 0;
    localStorage.setItem('bananaHighScore', bananaHighScore);
    localStorage.setItem('moneyHighScore', moneyHighScore);

    highscore.innerText = `HIGHSCORE - bananas: 0, money: 0`;
    updateHighScore();

    console.log("Rebirth score updated:", rebirthscoreSaver);
  } else {
    alert("You don't have enough bananas for a rebirth!");
  }
};

let rebirthscoreEnabled = false;
rebirthscoreButton.onclick = () => {
  rebirthscoreEnabled = !rebirthscoreEnabled;

  if(rebirthscoreEnabled) {
    rebirthscoreButton.textContent = "OFF";
    rebirths.style.display = "none";
    enableRebirthscore();
  } else {
    rebirthscoreButton.textContent = "ON";
    rebirths.style.display = "block";
    disableRebirthscore();
  }
};
