// Constant
CANVAS_SIZE = 600;
CANVAS_BACKGROUND_COLOR = "333333"
GAME_SIZE = 4;
BLOCK_SIZE = 150;
BLOCK_PLACEHOLDER_COLOR = "555555";
BLOCK_BACKGROUD_COLOR = "664455";

// Global Utility Functions
randInt = function(a, b) {
    return a + Math.floor(Math.random() * (b+1-a));
}

randChoice = function(arr) {
    return arr[randInt(0, arr.length - 1)];
}

// Model
class Game {
    constructor() {
        this.data = [];
        this.initializeData();
    }

    initializeData() {
        this.data = [];
        for (let i = 0; i < GAME_SIZE; i++) {
            let tmp = [];
            for (let j = 0; j < GAME_SIZE; j++) {
                tmp.push(null);
            }
            this.data.push(tmp);
        }
        this.generateNewBlock();
        this.generateNewBlock();
    }

    generateNewBlock() {
        let possiblePositions = [];
        for (let i = 0; i < GAME_SIZE; i++) {
            for (let j = 0; j < GAME_SIZE; j++) {
                if (this.data[i][j] == null) {
                    possiblePositions.push([i, j]);
                }
            }
        }
        let position = randChoice(possiblePositions);
        this.data[position[0]][position[1]] = 2;
    }
}

// View
class View {
    constructor(game, container) {
        this.game = game;
        this.container = container;
        this.initializeContainer();
    }

    initializeContainer() {
        this.container.style.width = CANVAS_SIZE;
        this.container.style.height = CANVAS_SIZE;
        this.container.style.backgroundColor = CANVAS_BACKGROUND_COLOR;
        this.container.style.position = "relative";
        this.container.style.display = "inline-block";
    }

    drawGame() {
        for (let i = 0; i < GAME_SIZE; i++) {
            for (let j = 0; j < GAME_SIZE; j++) {
                this.drawBackgroudBlock(i, j, BLOCK_PLACEHOLDER_COLOR);
                if (this.game.data[i][j]) {
                    this.drawBlock(i, j, this.game.data[i][j]);
                }
            }
        }
    }

    drawBackgroudBlock(i, j, color) {
        let block = document.createElement("div");
        block.style.width = BLOCK_SIZE;
        block.style.height = BLOCK_SIZE;
        block.style.backgroundColor = color;
        block.style.position = "absolute";
        block.style.top = i * BLOCK_SIZE;
        block.style.left = j * BLOCK_SIZE;
        this.container.append(block);
        return block;
    }

    drawBlock(i, j, number) {
        let span = document.createElement("span");
        let text = document.createTextNode(number);
        let block = this.drawBackgroudBlock(i, j, BLOCK_BACKGROUD_COLOR);
        span.appendChild(text);
        block.appendChild(span);
    }
}

// Controller
let container = document.getElementById("game-container");
let game = new Game();
let view = new View(game, container);
view.drawGame();