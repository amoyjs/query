
<h1 align="center">query</h1>
<p align="center">A jQuery-like pixi.js selector.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@amoy/query">
        <img src="https://img.shields.io/npm/v/@amoy/query.svg" alt="NPM Version">
    </a>
    <a href="https://www.npmjs.com/package/@amoy/query">
        <img src="https://img.shields.io/npm/dt/@amoy/query.svg" alt="NPM Downloads">
    </a>
    <a href="javascript:;">
        <img src="https://img.shields.io/github/size/amoyjs/query/dist/query.min.js.svg" alt="size">
    </a>
    <!-- <a href="https://github.com/amoyjs/query/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/amoyjs/query.svg" alt="MIT License">
    </a> -->
</p>

## Usage

```js
import { Application, Text, Container, Sprite } from 'pixi.js'
import query from '@amoy/query'

const game = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
})

query(game.stage)

const t1 = new Text('Hello World.', {
    fill: 0xffffff,
})
t1.class = 'text'
t1.x = 200
t1.y = 200
const t2 = new Text('Hello World.', {
    fill: 0xffffff,
})
t2.name = 'text'
t2.x = 300
t2.y = 300
const s1 = Sprite.from(document.querySelector('img'))
game.stage.addChild(t1, t2, s1)

$('[class=text]') // t1
// or
$('.text') // t1
$('[name=text]') // t2
```

## Contribution

How to extend a method:

```js
import query from '@amoy/query'

query.extend({
    methodName() {
        for (let i = 0; i < this.length; i++) {
            // this[i]
            // do something on `this[i]`
        }
    }
})

$('sprite').methodName()
```