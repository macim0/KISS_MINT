basic.forever(() => {
    motors.dualMotorPower(Motor.A, 100 - input.temperature() * 2)
})

