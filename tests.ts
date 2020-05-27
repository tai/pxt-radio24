
basic.clearScreen()
radio24.enable()

input.onButtonPressed(Button.A, () => {
    basic.showString("A")
})

input.onButtonPressed(Button.B, () => {
    basic.showString("B")
    radio24.ping()
})
