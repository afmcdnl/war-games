input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.AB, function () {
    if (nummissles < 1) {
        nummissles += 1
        missile = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
        while (missile.get(LedSpriteProperty.Y) > 0) {
            missile.change(LedSpriteProperty.Y, -1)
            basic.pause(100)
        }
        missile.set(LedSpriteProperty.Brightness, 0)
        nummissles += -1
        radio.sendValue("missileX", missile.get(LedSpriteProperty.X))
    }
})
input.onButtonPressed(Button.B, function () {
    player.change(LedSpriteProperty.X, 1)
})
radio.onReceivedValue(function (name, value) {
    switchxposition = Math.abs(value - 4)
    if (name == "missileX") {
        opponentsmissile = game.createSprite(switchxposition, 0)
        basic.pause(100)
        while (opponentsmissile.get(LedSpriteProperty.Y) < 4) {
            opponentsmissile.change(LedSpriteProperty.Y, 1)
            if (opponentsmissile.isTouching(player)) {
                radio.sendValue("winner", 1)
                basic.showNumber(game.score())
                basic.pause(2000)
            } else {
                basic.pause(100)
            }
        }
        opponentsmissile.set(LedSpriteProperty.Brightness, 0)
    }
    if (name == "winner") {
        game.addScore(1)
        basic.showNumber(game.score())
        basic.pause(2000)
    }
})
let opponentsmissile: game.LedSprite = null
let switchxposition = 0
let missile: game.LedSprite = null
let nummissles = 0
let player: game.LedSprite = null
player = game.createSprite(2, 4)
