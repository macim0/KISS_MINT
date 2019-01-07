basic.forever(() => {
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        . . . . .
        . . . . .
        `)
    basic.showNumber(grove.measureInCentimeters(DigitalPin.C16))
    basic.pause(250)
})

