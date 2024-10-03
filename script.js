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
const resetButton = document.getElementById("resetbutton");
const resetMenu = document.getElementById("resetmenu");
const settingsMenu = document.getElementById("settingsmenu");
const settingsButton = document.getElementById("settingsbutton");
const yesButton = document.getElementById("yesbutton");
const noButton = document.getElementById("nobutton");
const updatelogbutton = document.getElementById("updatelogbutton");
const updatelogMenu = document.getElementById("updatelogmenu");
const tooltip = document.getElementById("tooltip");
updatelogMenu.style.visibility = 'hidden';
settingsMenu.style.visibility = 'hidden';
rebirths.style.display = "block";

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

//tooltip thingy
let tooltipTimeout;
let isTooltipVisible = false;

let bananasaver = parseInt(localStorage.getItem('bananasaver')) || 0;
let moneysaver = parseInt(localStorage.getItem('moneysaver')) || 0;

i = bananasaver;
coins = moneysaver;

highscore.innerText = `HIGHSCORE - bananas: ${bananaHighScore}, money: ${moneyHighScore}`;
rebirths.innerText = `rebirths: ${formatNumber(rebirthscoreSaver)}`;

updateBananas();
updateMoney();
updateHighScore();
updateRebirths();

function updateBananas() {
  bananas.innerText = "bananas: " + formatNumber(i);
}

function updateMoney() {
  money.innerText = "money: " + formatNumber(coins);
}

function saveBananas() {
  localStorage.setItem('bananasaver', i);
}

function saveMoney() {
  localStorage.setItem('moneysaver', coins);
}

window.addEventListener('beforeunload', () => {
  saveBananas();
  saveMoney();
});

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
  saveBananas();
};

upgradebutton.onclick = () => {
  if (i >= upgradecost) {
    i -= upgradecost;
    upgrade += 3;
    upgradecost += 50;
    updateBananas();
    upgradebutton.innerText = "upgrade (" + formatNumber(upgradecost) + " bananas)";
    updateHighScore();
    saveBananas();
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
      saveBananas();
    } else if (tempbutton.id == "stealer" && i >= 500) {
      towers.push("stealer");
      i -= 500;
      updateBananas();
      updateHighScore();
      saveBananas();
    } else if (tempbutton.id == "monkey" && coins >= 1000) {
      towers.push("monkey");
      coins -= 1000;
      updateMoney();
      updateHighScore();
      saveBananas();
    } else if (tempbutton.id == "farmer" && i >= 200) {
      towers.push("farmer");
      i -= 200;
      updateBananas();
      updateHighScore();
      saveBananas();
    } else if (tempbutton.id == "collector" && coins >= 4500) {
      towers.push("collector");
      coins -= 4500;
      updateMoney();
      updateHighScore();
      saveBananas();
    } else if (tempbutton.id == "marketer" && coins >= 8000) {
      towers.push("marketer");
      coins -= 8000;
      updateMoney();
      updateHighScore();
      saveBananas();
    } else if (tempbutton.id == "government" && coins >= 24000) {
      towers.push("government");
      coins -= 24000;
      updateMoney();
      updateHighScore();
      saveBananas();
    }
  };
}

setInterval(() => {
  for (let c = 0; c < towers.length; c++) {
    if (towers[c] === "miner") {
      i += 2;
      updateBananas();
      saveBananas();
    }
    if (towers[c] === "farmer") {
      coins += 30;
      updateMoney();
      saveBananas();
    }
    if (towers[c] === "monkey") {
      i += 100;
      updateBananas();
      saveBananas();
    }
    if (towers[c] === "collector") {
      i += 350;
      coins += 700;
      updateBananas();
      updateMoney();
      saveBananas();
    }
    if (towers[c] === "marketer") {
      i += 1350;
      coins += 1600;
      updateBananas();
      updateMoney();
      saveBananas();
    }
    if (towers[c] === "government") {
      i += 6500;
      coins += 7500;
      updateBananas();
      updateMoney();
      saveBananas();
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

settingsButton.onclick = () => {
  if (settingsMenu.style.visibility === 'hidden' || settingsMenu.style.visibility === '') {
      if (updatelogMenu.style.visibility === 'visible') {
          updatelogMenu.style.opacity = 0;
          updatelogMenu.style.transform = 'translate(-50%, -50%) scale(0.9)';
          setTimeout(() => {
              updatelogMenu.style.visibility = 'hidden';
          }, 300);
      }

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

updatelogbutton.onclick = () => {
  if (updatelogMenu.style.visibility === 'hidden' || updatelogMenu.style.visibility === '') {
      if (settingsMenu.style.visibility === 'visible') {
          settingsMenu.style.opacity = 0;
          settingsMenu.style.transform = 'translate(-50%, -50%) scale(0.9)';
          setTimeout(() => {
              settingsMenu.style.visibility = 'hidden';
          }, 300);
      }

      updatelogMenu.style.visibility = 'visible';
      updatelogMenu.style.opacity = 1;
      updatelogMenu.style.transform = 'translate(-50%, -50%) scale(1)';
  } else {
      updatelogMenu.style.opacity = 0;
      updatelogMenu.style.transform = 'translate(-50%, -50%) scale(0.9)';

      setTimeout(() => {
          updatelogMenu.style.visibility = 'hidden';
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

resetButton.onclick = () => {
  if (resetMenu.style.visibility === 'hidden' || resetMenu.style.visibility === '') {
      resetMenu.style.visibility = 'visible';
      resetMenu.style.opacity = 1;
  } else {
      resetMenu.style.opacity = 0;

      setTimeout(() => {
          resetMenu.style.visibility = 'hidden';
      }, 5);
  }
};

noButton.onclick = () => {
  resetMenu.style.opacity = 0;
};

yesButton.onclick = () => {
  resetMenu.style.opacity = 0;

  coins = 0;
  i = 0;
  bananaHighScore = 0;
  moneyHighScore = 0;
  rebirthscore1 = 0;
  rebirthscoreSaver = 0;

  localStorage.setItem('bananaHighScore', bananaHighScore);
  localStorage.setItem('moneyHighScore', moneyHighScore);
  localStorage.setItem('rebirthscore1', rebirthscore1);
  localStorage.setItem('bananasaver', 0);
  localStorage.setItem('moneysaver', 0);

  highscore.innerText = `HIGHSCORE - bananas: 0, money: 0`;
  rebirths.innerText = `rebirths: ${formatNumber(rebirthscore1)}`;
  updateBananas();
  updateMoney();
  updateHighScore();
};

function showTooltip(event, text) {
  tooltip.innerText = text;
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = 1;
  tooltip.style.left = `${event.pageX + 10}px`;
  tooltip.style.top = `${event.pageY + 10}px`;
  isTooltipVisible = true;
}

function hideTooltip() {
  tooltip.style.opacity = 0;
  setTimeout(() => {
      tooltip.style.visibility = 'hidden';
      isTooltipVisible = false;
  }, 30);
}

document.addEventListener('mousemove', (event) => {
  if (isTooltipVisible) {
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
  }
});

settingsButton.addEventListener('mouseenter', (event) => {
  clearTimeout(tooltipTimeout);
  showTooltip(event, "Settings");
});
settingsButton.addEventListener('mouseleave', () => {
  tooltipTimeout = setTimeout(() => {
      if (!tooltip.matches(':hover') && !updatelogbutton.matches(':hover')) {
          hideTooltip();
      }
  }, 100);
});

updatelogbutton.addEventListener('mouseenter', (event) => {
  clearTimeout(tooltipTimeout);
  showTooltip(event, "Update Log");
});
updatelogbutton.addEventListener('mouseleave', () => {
  tooltipTimeout = setTimeout(() => {
      if (!tooltip.matches(':hover') && !settingsButton.matches(':hover')) {
          hideTooltip();
      }
  }, 100);
});
