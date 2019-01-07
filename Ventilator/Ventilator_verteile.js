basic.forever(() => {
    motors.dualMotorPower(Motor.A, pins.map(
    input.temperature(),
    0,
    50,
    0,
    100
    ))
})

