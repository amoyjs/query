# query

A jQuery-like pixi.js selector.

## Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Scene</title>
    <style>
    body {
        margin: 0;
    }
    </style>
</head>
<body>
    <script src="dist/pixi.js"></script>
    <script src="../dist/query.js"></script>
    <script>
    (function () {
        const { Application, Text, Container } = PIXI

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
        game.stage.addChild(t1)
        game.stage.addChild(t2)
        const c1 = new Container()
        c1.addChild(t2)
        game.stage.addChild(c1)
        
        $('[class=text]') // t1
        // or
        $('.text') // t1
        $('[name=text]') // t2
        
        $('.text').on('tap', function() {
            console.log('tap')
            $(this).off('tap')
        })
        document.body.appendChild(game.view)
    })()
    </script>
</body>
</html>
```