// variables

const thing = document.getElementById("click")
const clicks = document.getElementById("clicks")
const upgradebutton = document.getElementById("upgrade")
const activate = document.getElementById("activate")
const towerbuttons = document.getElementsByClassName("tower")

const NotImplementedErr = Error("Not Implemented!");
let towers = []
let i = 0
let coins = 0
let upgradething = 1
let upgradecost = 50
// gaem logic
thing.onclick = () => {
  i = i + upgradething
  clicks.innerText = "bananas: " + i
}
upgradebutton.onclick = () => {
  if (i > upgradecost - 1) {
    i = i - upgradecost
    upgradething += 3
    upgradecost = upgradecost + 50
    clicks.innerText = " bananas: " + i
    console.log(" bananas: " + i)
    upgradebutton.innerText = "upgrade (" + upgradecost + " bananas)"
  } else {
    alert("You dont have enough bananas!")
  }
}
for (let c = 0; c < towerbuttons.length; c++) {
  let tempbutton = towerbuttons[c]
  tempbutton.onclick = () => {
    if (tempbutton.id == "monkey") {
      if (i > 30 - 1) {
        towers.push("miner")
        i = i - 30
        clicks.innerText = "bananas: " + i
        console.log(" bananas:  " + i)
        console.log("miner added")
      }
    }
    if (i > 20 - 1) {
      if (tempbutton.id == "monkey") {
        towers.push("monkey")
        i = i - 20
        clicks.innerText = " bananas: " + i
        console.log("monkey added")
      }
    }
    if (coins > 50 - 1) {
      if (tempbutton.id == "farmer") {
        towers.push("farmer")
        coins = coins - 50
        ccoins.innerText = "bananas: " + coins
      }
    }
    if (clicks > 1000 - 1) {
      if (tempbutton.id == "monkey") {
        towers.push("monkey")
        clicks = clicks - 1000
        clicks.innerText = "bananas: " + clicks
      }
    }
  }
}
setInterval(() => {
  for (let c = 0; c < towers.length; c++) {
    if (towers[c] == "miner") {
      console.log("added ")
      i = i + 2
      clicks.innerText = " bananas: " + i
    }
    if (towers[c] == "seller") {
      console.log("sold")
      sell.click()
    }
    if (towers[c] == "farmer") {

      coins = coins + 30
      ccoins.innerText = " coins: " + coins

    }
    if (towers[c] == "monkey") {
      i = i + 100;
      clicks.innerText = " bananas: " + i
    }
  }
}, 500)
