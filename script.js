
const clickbutton = document.getElementById("click");
const bananas = document.getElementById("clicks");
const upgradebutton = document.getElementById("upgrade");
const towerbuttons = document.getElementsByClassName("tower");
const sell = document.getElementById("sell");
const money = document.getElementById("coins");
let towers = [];
let i = 0;
let coins = 0;
let upgrade = 1;
let upgradecost = 50;

clickbutton.onclick = () => {
  i = i + upgrade;
  bananas.innerText = "bananas: " + i;
};

upgradebutton.onclick = () => {
  if (i >= upgradecost) {
    i = i - upgradecost;
    upgrade += 3;
    upgradecost += 50;
    bananas.innerText = "bananas: " + i;
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
        bananas.innerText = "bananas: " + i;
        console.log("miner added");
      }
    } else if (tempbutton.id == "stealer") {
      if (i >= 500) {
        towers.push("stealer");
        i = i - 500;
        bananas.innerText = "bananas: " + i;
        console.log("stealer added");
      }
    } else if (tempbutton.id == "monkey") {
      if (coins >= 1000) {
        towers.push("monkey");
        coins = coins - 1000;
        money.innerText = "money: " + coins;
        console.log("monkey added, coins left: " + coins);
      }
    } else if (tempbutton.id == "farmer") {
      if (i >= 200) {
        towers.push("farmer");
        i = i - 200;
        bananas.innerText = "bananas: " + i;
        console.log("farmer added");
      }
    } else if (tempbutton.id == "collector") {
      if (coins >= 4500) {
        towers.push("collector");
        coins = coins - 4500;
        money.innerText = "money: " + coins;
        console.log("collector added, coins left: " + coins);
      }
    } else if (tempbutton.id == "marketer") {
      if (coins >= 8000) {
        towers.push("marketer");
        coins = coins - 8000;
        money.innerText = "money: " + coins;
        console.log("marketer added, coins left: " + coins);
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
      coins = coins + 700
      bananas.innerText = "bananas: " + i;
      money.innerText = "money: " + coins;
    }
    if (towers[c] === "marketer") {
      console.log("marketer generating bananas");
      i = i + 1350;
      coins = coins + 1600
      bananas.innerText = "bananas: " + i;
      money.innerText = "money: " + coins;
    }
  }
}, 500);

sell.onclick = () => {
  coins += i;
  i = 0;
  bananas.innerText = "bananas: " + i;
  money.innerText = "money: " + coins;
}
