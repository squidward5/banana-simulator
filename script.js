// variables

const thing = document.getElementById("click");
const clicks = document.getElementById("clicks");
const upgradebutton = document.getElementById("upgrade");
const activate = document.getElementById("activate");
const towerbuttons = document.getElementsByClassName("tower");

const NotImplementedErr = Error("Not Implemented!");
let towers = [];
let i = 0;  // click count (bananas)
let coins = 0;
let upgradething = 1;
let upgradecost = 50;

// game logic
thing.onclick = () => {
  i = i + upgradething;
  clicks.innerText = "bananas: " + i;
};

upgradebutton.onclick = () => {
  if (i >= upgradecost) {
    i -= upgradecost;
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
    if (tempbutton.id === "monkey") {
      if (i >= 30) {
        towers.push("miner");
        i -= 30;
        clicks.innerText = "bananas: " + i;
        console.log("miner added");
      } else if (i >= 20) {
        towers.push("monkey");
        i -= 20;
        clicks.innerText = "bananas: " + i;
        console.log("monkey added");
      }
    }
    if (coins >= 50 && tempbutton.id === "farmer") {
      towers.push("farmer");
      coins -= 50;
      ccoins.innerText = "bananas: " + coins;
    }
  };
}

setInterval(() => {
  for (let c = 0; c < towers.length; c++) {
    if (towers[c] === "miner") {
      i += 2;
      clicks.innerText = "bananas: " + i;
      console.log("miner produced bananas");
    }
    if (towers[c] === "seller") {
      console.log("seller triggered");
      sell.click();
    }
    if (towers[c] === "farmer") {
      coins += 30;
      ccoins.innerText = "coins: " + coins;
    }
    if (towers[c] === "monkey") {
      i += 100;
      clicks.innerText = "bananas: " + i;
      console.log("monkey generated bananas");
    }
  }
}, 500);
