
basic.clearScreen()
radio24.enable()

input.onButtonPressed(Button.A, () => {
    basic.showString("AAA")
    radio24.toggle(DigitalPin.P0)
})

input.onButtonPressed(Button.B, () => {
    let val = radio24.add10(HelloNumber.FOO)
    basic.showNumber(val)
})
