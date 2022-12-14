// document.body.innerHTML = "<h2>working</h2>"
const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.results')
let currentShooterInvader = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    console.log(square)
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if(!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
          }
    }
}
draw()

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader")
    }
}

squares[currentShooterInvader].classList.add("shooter")

function moveShooter(e) {
    squares[currentShooterInvader].classList.remove("shooter")
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterInvader % width !== 0) currentShooterInvader -= 1
            break
        case 'ArrowRight':
            if (currentShooterInvader % width !== -1) currentShooterInvader += 1
            break
    }
    squares[currentShooterInvader].classList.add("shooter")
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

    remove()
    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }
    }
    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    draw()

    if (squares[currentShooterInvader].classList.contains("invader", "shooter")) {
        resultDisplay.innerHTML = "GAME OVER!"
        clearInterval(invadersId)
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > (squares.length)) {
            resultDisplay.innerHTML = "YOU SUCK BITCH"
            clearInterval(invadersId)
        }
    }

    if(aliensRemoved.length === alienInvaders.length){
        resultDisplay.innerHTML = "YOU JUST WON NICE YOU KILLED THAT MOTHEFUCKERS"
    }
}

invadersId = setInterval(moveInvaders, 400)

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterInvader
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
  
      if (squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')
  
        setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
        clearInterval(laserId)
  
        const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
        aliensRemoved.push(alienRemoved)
        results++
        resultDisplay.innerHTML = results
        console.log(aliensRemoved)
  
      }
  
    }
    switch(e.key) {
      case 'ArrowUp':
        laserId = setInterval(moveLaser, 100)
    }
  }
  
  document.addEventListener('keydown', shoot)
 
