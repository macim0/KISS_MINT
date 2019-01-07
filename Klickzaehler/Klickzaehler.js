let zaehler = 0
input.onButtonPressed(Button.A, () => {
    zaehler += 1
})
input.onButtonPressed(Button.AB, () => {
    zaehler = 0
})
zaehler = 0
basic.forever(() => {
    basic.showNumber(zaehler)
    basic.pause(250)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        . . . . .
        . . . . .
        `)
})

