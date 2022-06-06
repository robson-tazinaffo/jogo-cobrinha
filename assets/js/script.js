// let canvas = document.getElementById('snake')
// let context = canvas.getContext('2d')
// let box = 32
// let snake = []
// snake[0] = {
//   x: 8 * box,
//   y: 6 * box
// }
// let direction = 'right'
// let food = {
//   x: Math.floor(Math.random() * 15 + 1) * box,
//   y: Math.floor(Math.random() * 15 + 1) * box
// }

// constructor(){
//     document.addEventListener("keydown",this.keyEvents.bind(this)) // tuşa basıldığında aktifleştir
//     this.a_dead = new Audio("https://www.dropbox.com/s/r7o9las1ki6tr0u/fail.wav?dl=1");
//     this.a_eat = new Audio("https://www.dropbox.com/s/qukhjmxog6h3we8/crunch.wav?dl=1");
//     this.a_start = new Audio("https://www.dropbox.com/s/xff36yvnh2zsxzh/start.wav?dl=1");
// }

// function criarBG() {
//   context.fillStyle = 'lightgreen'
//   context.fillRect(0, 0, 16 * box, 16 * box) //desenha o retângulo usando x e y e a largura e altura setadas
// }

// function criarCobrinha() {
//   for (i = 0; i < snake.length; i++) {
//     context.fillStyle = 'BlueViolet'
//     context.fillRect(snake[i].x, snake[i].y, box, box)
//   }
// }

// function drawFood() {
//   context.fillStyle = 'indigo'
//   context.fillRect(food.x, food.y, box, box)
// }

// function keyPressed(evt) {
//   evt = evt || window.event
//   var key = evt.keyCode || evt.which
//   return String.fromCharCode(key)
// }

// document.onkeypress = function (evt) {
//   var str = keyPressed(evt)

//   if (str == 'f') alert("Apertou o 'f', chamando uma função...")
//   if (str == 's') alert("Apertou o 's', chamando uma função...")
//   if (str == 'x') alert("Apertou o 'x', chamando uma função...")
//   if (str == 'e') alert("Apertou o 'e', chamando uma função...")
// }

// //quando um evento acontece, detecta e chama uma função
// document.addEventListener('keydown', update)

// function update(event) {
//   if (event.keyCode == 37 && direction != 'right') direction = 'left'
//   if (event.keyCode == 38 && direction != 'down') direction = 'up'
//   if (event.keyCode == 39 && direction != 'left') direction = 'right'
//   if (event.keyCode == 40 && direction != 'up') direction = 'down'
//   //   if (event.keyCode == 27) pegaTecla()

//   var str = keyPressed(evt)
//   if (str == 'f') alert("Apertou o 'f', chamando uma função...")
//   if (str == 's') alert("Apertou o 's', chamando uma função...")
//   if (str == 'x') alert("Apertou o 'x', chamando uma função...")
//   if (str == 'e') alert("Apertou o 'e', chamando uma função...")
// }

// function aumentaVelocidade() {
//   setInterval(iniciarJogo, 100)
// }

// function iniciarJogo() {
//   if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
//   if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
//   if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
//   if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

//   for (i = 1; i < snake.length; i++) {
//     if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
//       clearInterval(jogo)
//       alert('Game Over :(')
//     }
//   }

//   criarBG()
//   criarCobrinha()
//   drawFood()

//   let snakeX = snake[0].x
//   let snakeY = snake[0].y

//   if (direction == 'right') snakeX += box
//   if (direction == 'left') snakeX -= box
//   if (direction == 'up') snakeY -= box
//   if (direction == 'down') snakeY += box

//   if (snakeX != food.x || snakeY != food.y) {
//     snake.pop() //pop tira o último elemento da lista
//   } else {
//     food.x = Math.floor(Math.random() * 15 + 1) * box
//     food.y = Math.floor(Math.random() * 15 + 1) * box
//   }

//   let newHead = {
//     x: snakeX,
//     y: snakeY
//   }

//   snake.unshift(newHead) //método unshift adiciona como primeiro quadradinho da cobrinha
// }

// let jogo = setInterval(iniciarJogo, 100)

class Game {
  constructor() {
    document.addEventListener('keydown', this.keyEvents.bind(this)) // tuşa basıldığında aktifleştir
    this.a_dead = new Audio(
      'https://www.dropbox.com/s/r7o9las1ki6tr0u/fail.wav?dl=1'
    )
    this.a_eat = new Audio(
      'https://www.dropbox.com/s/qukhjmxog6h3we8/crunch.wav?dl=1'
    )
    this.a_start = new Audio(
      'https://www.dropbox.com/s/xff36yvnh2zsxzh/start.wav?dl=1'
    )
  }

  // ekran boyutu
  gameWindow() {
    this.winWidth = 450
    this.winHeight = 400
    createCanvas(this.winWidth, this.winHeight).parent('gameBox')
  }

  draw() {
    background('rgb(148, 52, 165)')
    stroke('rgba(75, 0, 30)')

    this.snake()
    this.apple()
    this.scoreBoard()
    this.bestScore()
  }

  update() {
    this.frame = false
    this.draw() // ekrana çiz
  }

  start() {
    this.positionX = 15 // yılanın başlangıç noktası X
    this.positionY = 10 // yılanın başlangıç noktası Y
    this.appleX = this.appleY = 10 // Apple ilk konumu
    this.trail = [] // Yılanın Kordinatlarının tutulduğu dizi
    this.tailSize = 5 // yılanın boyutu
    this.speedX = this.speedY = 0 // yılanın ilk hızı
    this.gridSize = this.tileCount = 20 // ekranın kare sayısı
    this.fps = 1000 / 18 // saniyelik görüntü sayısı
    this.timer = setInterval(this.update.bind(this), this.fps)
    this.score = 0
  }

  reset() {
    clearInterval(this.timer) // zamanı sıfırlar
    this.a_dead.play()
    this.start() // oyunu baştan başlatır
  }

  keyEvents(e) {
    // sola gider
    if (e.keyCode === 37 && this.speedX !== 1) {
      this.a_start.play()
      this.speedX = -1
      this.speedY = 0
      this.frame = true
    }
    // sağa gider
    if (e.keyCode === 39 && this.speedX !== -1) {
      this.a_start.play()
      this.speedX = 1
      this.speedY = 0
      this.frame = true
    }
    // aşağıya gider
    if (e.keyCode === 40 && this.speedY !== -1) {
      this.a_start.play()
      this.speedX = 0
      this.speedY = 1
      this.frame = true
    }
    // yukarıya gider
    if (e.keyCode === 38 && this.speedY !== 1) {
      this.a_start.play()
      this.speedX = 0
      this.speedY = -1
      this.frame = true
    }

    if (e.keyCode === 27) {
      alert('Reiniciar game')
      location.reload()
    }
  }

  // oyundaki elemanlar
  // yılan
  snake() {
    fill('indigo')
    stroke('indigo')

    this.trail.forEach(a => {
      rect(
        a.positionX * 20,
        a.positionY * 20,
        this.gridSize - 1,
        this.gridSize - 1,
        0,
        0
      )
    })
    this.positionX += this.speedX
    this.positionY += this.speedY

    if (this.positionX < 0) {
      this.positionX = this.tileCount - 1
    } else if (this.positionY < 0) {
      this.positionY = this.tileCount - 1
    } else if (this.positionX > this.tileCount - 1) {
      this.positionX = 0
    } else if (this.positionY > this.tileCount - 1) {
      this.positionY = 0
    }

    // kendi üstüne gelirse
    this.trail.forEach(t => {
      if (this.positionX === t.positionX && this.positionY === t.positionY) {
        this.reset()
      }
    })

    // snake position
    this.trail.push({ positionX: this.positionX, positionY: this.positionY })

    //limits the size of the snake
    while (this.trail.length > this.tailSize) {
      this.trail.shift()
    }

    while (this.trail.length > this.tailSize) {
      this.trail.shift()
    }
  }
  apple() {
    // elmayı çiz
    fill('Chartreuse')
    stroke('Chartreuse')

    rect(
      this.appleX * this.tileCount,
      this.appleY * this.tileCount,
      this.gridSize - 3,
      this.gridSize - 3,
      20,
      20
    )

    if (this.appleX === this.positionX && this.appleY === this.positionY) {
      this.tailSize++
      this.score++
      this.appleX = Math.floor(Math.random() * this.tileCount)
      this.appleY = Math.floor(Math.random() * this.tileCount)
      this.trail.forEach(t => {
        if (this.appleX === t.positionX && this.appleY == t.positionY) {
          this.apple()
        }
      })
      this.a_eat.play()
    }
  }
  scoreBoard() {
    textSize(15)
    noStroke()
    fill(250)
    text('Pontos', 30, 20)
    textSize(20)
    text(this.score, 47, 45)
  }
  bestScore() {
    textSize(15)
    text('Recorde', 340, 20)
    if (!localStorage.getItem('best')) {
      localStorage.setItem('best', 0)
    }
    textSize(20)
    text(localStorage.getItem('best'), 357, 45)

    if (this.score > localStorage.getItem('best')) {
      this.best = this.score
      localStorage.setItem('best', this.best)
    }
  }
}

const game = new Game()
window.onload = () => game.start()

function setup() {
  game.gameWindow()
}

function draw() {
  game.update()
}
