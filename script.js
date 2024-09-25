console.log("Hacked clicks don't sell for much, sunny boy.");
const thing = document.getElementById("click");
const clicks = document.getElementById("clicks");
const upgradebutton = document.getElementById("upgrade");
const activate = document.getElementById("activate");
const towerbuttons = document.getElementsByClassName("tower");
const sell = document.getElementById("sell");
const ccoins = document.getElementById("coins");
const NotImplementedErr = Error("Not Implemented!");
let towers = [];
let i = 0;
let coins = 0;
let upgradething = 1;
let upgradecost = 50;

// Game logic

thing.onclick = () => {
  i = i + upgradething;
  clicks.innerText = "bananas: " + i;
};

upgradebutton.onclick = () => {
  if (i >= upgradecost) {
    i = i - upgradecost;
    upgradething += 3;
    upgradecost += 50;
    clicks.innerText = "bananas: " + i;
    console.log("bananas: " + i);
    upgradebutton.innerText = "upgrade (" + upgradecost + " bananas)";
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
        clicks.innerText = "bananas: " + i;
        console.log("miner added");
      }
    } else if (tempbutton.id == "stealer") {
      if (i >= 500) {
        towers.push("stealer");
        i = i - 500;
        clicks.innerText = "bananas: " + i;
        console.log("stealer added");
      }
    } else if (tempbutton.id == "monkey") {
      if (coins >= 1000) {
        towers.push("monkey");
        coins = coins - 1000;
        ccoins.innerText = "money: " + coins;
        console.log("monkey added, coins left: " + coins);
      }
    } else if (tempbutton.id == "farmer") {
      if (i >= 200) {
        towers.push("farmer");
        i = i - 200;
        clicks.innerText = "bananas: " + i;
    }
  };
}

setInterval(() => {
  for (let c = 0; c < towers.length; c++) {
    if (towers[c] === "miner") {
      console.log("miner generating bananas");
      i = i + 2;
      clicks.innerText = "bananas: " + i;
    }
    if (towers[c] === "seller") {
      console.log("sold");
      sell.click();
    }
    if (towers[c] === "farmer") {
      console.log("farmer generating money");
      coins = coins + 30;
      ccoins.innerText = "money: " + coins;
    }
    if (towers[c] === "monkey") {
      console.log("monkey generating bananas");
      i = i + 100;
      clicks.innerText = "bananas: " + i;
    }
  }
}, 500);

sell.onclick = () => {
  coins += i;
  i = 0;
  clicks.innerText = "bananas: " + i;
  ccoins.innerText = "money: " + coins;
}
}
