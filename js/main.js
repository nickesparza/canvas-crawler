// save canvas and positioning message area to variables so we can refer to them later
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')

// define game context
const ctx = game.getContext('2d')

// since we have a variable height and width of the canvas, we need to get the height and with as a reference point so we can refer to them later
// use built in getComputedStyle function
// use along with setAttribute
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

console.log(`this is the canvas width ${game.width}`)
console.log(`this is the canvas height ${game.height}`)

// OOP principles
// Object-Oriented Programming
// objects describe something using key-value pairs
// this is an example of an object
// const someObject = {
//     name: 'object',
//     height: 50,
//     favoriteFood: 'burgers',
//     alive: false,
//     friends: ['Simon', 'Garfunkle'],
//     itemsInPocket: [
//         {name: 'phone', size: 'small'},
//         {name: 'wallet', size: 'medium'}
//     ]
// }

// to create multiple instances of the same object, define a JavaScript class
// define a class to create items on the canvas
// this way code remains DRY while creating elements with different attributes

class Crawler {
    // classes can (and usually do) have a constructor function
    // tells the class how exactly to build an object
    // allows the use of keyword 'this' to refer to whatever object has been made by the class
    // attributes that will have variable value go in the constructor function
    constructor(x, y, color, width, height) {
        // define what the resulting object will be made of
        // can include methods, aka functions that can be run on objects
        this.x = x,
        this.y = y,
        this.color = color,
        this.height = height,
        this.width = width,
        this.alive = true,
        // example of a method
        // render method
        this.render = function () {
            // interact with canvas to draw object using fillStyle and fillRect
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

// to instantiate an instance of a class, aka an object
// we call the class method with specific syntax

let player = new Crawler(10, 10, '#bada55', 32, 48)
let ogre = new Crawler(400, 70, 'darkred', 18, 24)

// the gameLoop function will help create an animation effect
// also allows for timed events and control of those events

const gameLoop = () => {
    // win condition of the game is to kill the ogre
    // if the ogre is alive, the game can continue
    // if the ogre is deceased, the game will end
    if (ogre.alive) {
        detectHit()
    }
    // render both objects, player and ogre, using their respective render methods
    // update movement box with coordinates of player
    // clear the canvas every frame in order to produce illusion of movement so hero's movement doesn't turn into snake

    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = `${player.x}, ${player.y}`
    player.render()

    if (ogre.alive) {
        ogre.render()
    }
}

// use setInterval to repeat gameLoop function at specific times
document.addEventListener('DOMContentLoaded', function () {
    // need movement handler
    document.addEventListener('keydown', movementHandler)
    // need gameLoop running at an interval
    setInterval(gameLoop, 60)
})

// function for how the player moves
// use e to take the place of event
const movementHandler = (e) => {
    // movement handler will be attached to event listener
    // attach to a 'keydown' event
    // key events can use key itself or a keycode
    // w = 87, a = 65, s = 83, d = 68
    // up = 38, down = 40, left = 37, right = 39

    // in order to do different things for different keys, set up an if statement or switch case
    // switch case has a main switch, and cases (in this case, inputs)
    // break in every case, so it can be read multiple times
    switch (e.keyCode) {
        case (87):
        case (38):
            // this moves the player up
            player.y -= 10
            // we also need to break the case
            break
        case (65):
        case (37):
            // this moves the player left
            player.x -= 10
            break
        case (83):
        case (40):
            // this moves the player down
            player.y += 10
            break
        case (68):
        case (39):
            // this moves the player right
            player.x += 10
            break
    }
}

// detect a collision between objects
// account for entire space the object takes up
// collision detection function that takes player/ogre dimensions into account and says what to do if a collision occurs
const detectHit = () => {
    // one if statement to clearly define any moment of intersection/collision
    if (player.x < ogre.x + ogre.width
        && player.x + player.width > ogre.x
        && player.y < ogre.y + ogre.height
        && player.y + player.height > ogre.y) {
            // console.log('we have a hit')
            // if a hit occurs, ogre dies and we win
            ogre.alive = false
            document.getElementById('status').textContent = 'You win!'
        }
}
