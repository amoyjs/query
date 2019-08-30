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

const container = new PIXI.Container()

const t1 = new PIXI.Text('Hello World.', {
    fill: 0x000000,
})
t1['class'] = 'text'
t1.x = 200
t1.y = 200

const t2 = new PIXI.Text('Hello World2222.', {
    fill: 0x000000,
})
t2['class'] = 'text'
t2['className'] = 'aaaa'
t2.x = 300
t2.y = 300

container.addChild(t1)
container.addChild(t2)
game.stage.addChild(container)

console.log($('.aaaa'))
