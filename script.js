const clickbutton = document.getElementById("click");
const bananas = document.getElementById("clicks");
const upgradebutton = document.getElementById("upgrade");
const towerbuttons = document.getElementsByClassName("tower");
const sell = document.getElementById("sell");
const money = document.getElementById("coins");
const highscore = document.getElementById("highscore");
const highscoreButton = document.getElementById("highscorebutton")

const settingsMenu = document.getElementById("settingsmenu");
const settingsButton = document.getElementById("settingsbutton");
settingsMenu.style.visibility = 'hidden';

let towers = [];
let i = 0;
let coins = 0;
let upgrade = 1;
let upgradecost = 50;

let bananaHighScore = parseInt(localStorage.getItem('bananaHighScore')) || 0;
let moneyHighScore = parseInt(localStorage.getItem('moneyHighScore')) || 0;
highscore.innerText = `HIGHSCORE - bananas: ${bananaHighScore}, money: ${moneyHighScore}`;

function updateHighScore() {
  if (i > bananaHighScore) {
    bananaHighScore = i;
    localStorage.setItem('bananaHighScore', bananaHighScore);
  }
  if (coins > moneyHighScore) {
    moneyHighScore = coins;
    localStorage.setItem('moneyHighScore', moneyHighScore);
  }
  highscore.innerText = `HIGHSCORE - bananas: ${bananaHighScore}, money: ${moneyHighScore}`;
}

clickbutton.onclick = () => {
  i = i + upgrade;
  bananas.innerText = "bananas: " + i;
  updateHighScore();
};

upgradebutton.onclick = () => {
  if (i >= upgradecost) {
    i = i - upgradecost;
    upgrade += 3;
    upgradecost += 50;
    bananas.innerText = "bananas: " + i;
    console.log("bananas: " + i);
    upgradebutton.innerText = "upgrade (" + upgradecost + " bananas)";
    updateHighScore();
  } else {
    alert("You don't have enough bananas!");
  }
};

for (let c = 0; c < towerbuttons.length; c++) {
  let tempbutton = towerbuttons[c];
  tempbutton.onclick = () => {
    if (tempbutton.id == "miner") {
      if (i >= 30) {
        towers.push("miner");
        i = i - 30;
        bananas.innerText = "bananas: " + i;
        console.log("miner added");
        updateHighScore();
      }
    } else if (tempbutton.id == "stealer") {
      if (i >= 500) {
        towers.push("stealer");
        i = i - 500;
        bananas.innerText = "bananas: " + i;
        console.log("stealer added");
        updateHighScore();
      }
    } else if (tempbutton.id == "monkey") {
      if (coins >= 1000) {
        towers.push("monkey");
        coins = coins - 1000;
        money.innerText = "money: " + coins;
        console.log("monkey added, coins left: " + coins);
        updateHighScore();
      }
    } else if (tempbutton.id == "farmer") {
      if (i >= 200) {
        towers.push("farmer");
        i = i - 200;
        bananas.innerText = "bananas: " + i;
        console.log("farmer added");
        updateHighScore();
      }
    } else if (tempbutton.id == "collector") {
      if (coins >= 4500) {
        towers.push("collector");
        coins = coins - 4500;
        money.innerText = "money: " + coins;
        console.log("collector added, coins left: " + coins);
        updateHighScore();
      }
    } else if (tempbutton.id == "marketer") {
      if (coins >= 8000) {
        towers.push("marketer");
        coins = coins - 8000;
        money.innerText = "money: " + coins;
        console.log("marketer added, coins left: " + coins);
        updateHighScore();
      }
    }
  };
}

setInterval(() => {
  for (let c = 0; c < towers.length; c++) {
    if (towers[c] === "miner") {
      console.log("miner generating bananas");
      i = i + 2;
      bananas.innerText = "bananas: " + i;
    }
    if (towers[c] === "seller") {
      console.log("sold");
      sell.click();
    }
    if (towers[c] === "farmer") {
      console.log("farmer generating money");
      coins = coins + 30;
      money.innerText = "money: " + coins;
    }
    if (towers[c] === "monkey") {
      console.log("monkey generating bananas");
      i = i + 100;
      bananas.innerText = "bananas: " + i;
    }
    if (towers[c] === "collector") {
      console.log("collector generating bananas");
      i = i + 350;
      coins = coins + 700;
      bananas.innerText = "bananas: " + i;
      money.innerText = "money: " + coins;
    }
    if (towers[c] === "marketer") {
      console.log("marketer generating bananas");
      i = i + 1350;
      coins = coins + 1600;
      bananas.innerText = "bananas: " + i;
      money.innerText = "money: " + coins;
    }
  }
  updateHighScore();
}, 500);

sell.onclick = () => {
  updateHighScore();
  coins += i;
  i = 0;
  bananas.innerText = "bananas: " + i;
  money.innerText = "money: " + coins;
};

//settings stuff

settingsButton.onclick = () => {
  if (settingsMenu.style.visibility === 'hidden' || settingsMenu.style.visibility === '') {
      settingsMenu.style.visibility = 'visible';
      settingsMenu.style.opacity = 1;
  } else {
      settingsMenu.style.visibility = 'hidden';
      settingsMenu.style.opacity = 0;
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
