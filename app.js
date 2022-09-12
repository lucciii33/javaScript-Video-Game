// document.body.innerHTML = "<h2>working</h2>"
const grid = document.querySelector('.grid')
let currentShooterInvader = 202
let width = 15

for(let i = 0; i < 225; i++){
    const square = document.createElement('div')
    console.log(square)
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for(let i = 0; i<alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.add("invader")
    }
}
draw()

squares[currentShooterInvader].classList.add("shooter")

function moveShooter(e){
    squares[currentShooterInvader].classList.remove("shooter")
    switch(e.key){
    case 'ArrowLeft':
        if(currentShooterInvader % width !== 0) currentShooterInvader -=1
        break
    case 'ArrowRight':
            if(currentShooterInvader % width !== -1) currentShooterInvader +=1
            break
    }
    squares[currentShooterInvader].classList.add("shooter")
}
document.addEventListener('keydown' ,moveShooter)