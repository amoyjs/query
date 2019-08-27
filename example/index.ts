import * as PIXI from "pixi.js"
import { query } from "../lib"
import "./main.scss"

// You can debug or use the instance from lib in here.
const { innerWidth: width, innerHeight: height } = window
const game = new PIXI.Application({
    width,
    height,
    backgroundColor: 0xffffff,
})
document.body.appendChild(game.view)

query(game.stage)

const t1 = new PIXI.Text('Hello World.', {
    fill: 0x000000,
})
t1['class'] = 'text'
t1.x = 200
t1.y = 200
game.stage.addChild(t1)
