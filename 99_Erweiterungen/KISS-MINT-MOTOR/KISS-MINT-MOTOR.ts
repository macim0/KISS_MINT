
declare const enum MyMotor {
    //zum auswählen der Motoren
    //% block="A"
    A = 0,
    //% block="B"
    B = 1,
    //% block="A+B"
    Ab = 2,
}
declare const enum Richtung {
    //zum auswählen der Richtung
    //% block="Vor"
    V = 0,
    //% block="Zurück"
    R = 1,
    //% block="Aus"
    O = 2,
}

/**
 * Benutzerdefinierte Blöcke
 */
//% color=#F99B1C icon="\uf1b9"

namespace KissMintMotor {

    function startMotor(M1: DigitalPin, M2: DigitalPin, richtungsWert: Richtung) {
        let richtung: number[][] = [[1, 0], [0, 1], [0, 0]]  //entweder wird ein Eingang auf high und der andere auf low geschalten (zum vorwaerts oder rueckwaerts fahren) oder beide auf low (der Motor wird gebremst)

        pins.digitalWritePin(M1, richtung[richtungsWert][0])
        pins.digitalWritePin(M2, richtung[richtungsWert][1])
    }
    /** 
         * Mit diesem Block kann eine doppel H-Brücke (z.B. L293D) über die PIN's P0, P1, P1, P1 angesteuert werden.
         * Verbinde: 
         * P0 mit IN1
         * P1 mit IN2
         * P1 mit IN3
         * P1 mit IN4
         * @param M wähle deinen Motor
         * @param R wähle die Richtung des Motors
         */
    //% block
    //% blockId="DigitalMotor" block="DigitalMotor Motor %M | Richtung %R | "

    export function DigitalMotor(M: MyMotor, R: Richtung) {
        let MotorFixedPinList: DigitalPin[][] = [[DigitalPin.P0, DigitalPin.P1], [DigitalPin.P2, DigitalPin.P3]]
        //Es wurden die Pins P0 bis P3 gewählt, da diese frei verfügbar sind. Will man die Pins C4 bis C12 verwenden muss die LED-Matrix zusätzlich deaktiviert werden da diese doppelt belegt sind.
        if (M < 2) {
            startMotor(MotorFixedPinList[M][0], MotorFixedPinList[M][1], R)
        }
        else {
            startMotor(MotorFixedPinList[0][0], MotorFixedPinList[0][1], R)
            startMotor(MotorFixedPinList[1][0], MotorFixedPinList[1][1], R)
        }


    }



    /** 
     * Dieser Block steuert einen Schrittmotor z.B. 28BYJ-48 über eine H-Brücke(L293D) oder Darlington-Array(ULN2003)
     * Wie viele Schritte = 1 Umdrehung entspricht ist vom Motor abhängig
     * @param S wähle um wieviele Schritte sich der motor drehen soll
     * @param R wähle die Richtung des Motors
     
     * Verbinde:
         * P0 mit IN1
         * P1 mit IN2
         * P1 mit IN3
         * P1 mit IN4
     */
    //% block
    //% blockId="SchrittMotor" block="SchrittMotor Richtung %R | Schritte %S|"
    export function SchrittMotor(R: Richtung, S: number) {
        let schrittBelegung: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        let schrittMotorPinBelegung: DigitalPin[] = [DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P3]

        if (R == 0) {
            schrittBelegung = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]] //vorwaerts Schrittbelegung

        } else if (R == 1) {
            schrittBelegung = [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]] //rueckwaerts Schrittbelegung
        }

        if (R != 2) {
            for (let schritte = 0; schritte < S; schritte++) {
                for (let teilschritt = 0; teilschritt < 4; teilschritt++) {
                    for (let index = 0; index < 4; index++) {
                        pins.digitalWritePin(schrittMotorPinBelegung[index], schrittBelegung[teilschritt][index])
                    }
                    basic.pause(1)
                }
            }
        }

        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.digitalWritePin(DigitalPin.P3, 0)
    }



} 
