
basic.clearScreen()
radio24.enable(7, 7)

input.onButtonPressed(Button.A, () => {
    basic.showString("A")
})

input.onButtonPressed(Button.B, () => {
    basic.showString("B")
    radio24.test()
})
