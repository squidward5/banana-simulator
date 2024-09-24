// variables
console.log("Hacked clicks dont sell for much, sunny boy.")
const thing = document.getElementById("click")
const clicks = document.getElementById("clicks")
const upgradebutton = document.getElementById("upgrade")
const activate = document.getElementById("activate")
const towerbuttons = document.getElementsByClassName("tower")
const sell = document.getElementById("sell")
const ccoins = document.getElementById("coins")
const NotImplementedErr = Error("Not Implemented!");
let towers = []
let i = 0
let coins = 0
let upgradething = 1
let upgradecost = 50
// gaem logic
thing.onclick = () => {
  i = i + upgradething
  clicks.innerText = "bananas: "+i
}
upgradebutton.onclick = () => {
  if (i > upgradecost-1) {
    i = i - upgradecost
    upgradething += 3
    upgradecost = upgradecost + 50
    clicks.innerText = " bananas: "+i
    console.log(" bananas: "+i)
    upgradebutton.innerText = "upgrade ("+upgradecost+" bananas)"
  } else {
    alert("You dont have enough bananas!")
  }
}
for (let c = 0; c < towerbuttons.length; c++) {
  let tempbutton = towerbuttons[c]
  tempbutton.onclick = () => {
    if (tempbutton.id == "miner") {
      if (i > 30-1) {
        towers.push("miner")
        i = i - 30
        clicks.innerText = "bananas: "+i
        console.log(" bananas: "+i)
        console.log("miner added")
      }
    }
    if (i > 500-1) {
      if (tempbutton.id == "stealer") {
        towers.push("stealer")
        i = i - 20
        clicks.innerText = " bananas: "+i
        console.log("stealer added")
      }
    } 

    if (coins > 1000-1) {
       if (tempbutton.id == "monkey") {
        towers.push("monkey")
        coins = coins - 1000 // fixed typo here (im stupid lol)
        ccoins.innerText = "money: "+coins
      }
    }
  }
}
setInterval(() => {
  for (let c = 0; c < towers.length; c++) {
      if (towers[c] == "miner") {
          console.log("added ")
          i = i + 2
          clicks.innerText = " bananas: "+i
     }
     if (towers[c] == "seller") {
         console.log("sold")
         sell.click()
     }
     if (towers[c] == "farmer") {
   
         coins = coins + 30
         ccoins.innerText = " money: "+coins
      
     }
     if (towers[c] == "monkey") {
       i = i + 100;
       clicks.innerText = " bananas: "+i
     }
  }
}, 500)
sell.onclick = () => {
  coins += i
  i = 0
  clicks.innerText = " bananas: "+i
  ccoins.innerText = "money: "+coins
}
