# kiss-mint-motor

Mit diesem Paket lassen sich zwei DC-Motoren über eine doppelte H-Brücke (bspw. L293D) ansteuerun. 
Am Calliope werden hierzu die Pins P0, P1, P2 und P3 verwendet. 
In1->P0
In2->P1
In3->P2
In4->P3

Wird der IC auf dem Breadbord verwendet verbinde EN1,2 und EN3,4 mit +5V so werden die Motoren mit voller Leistung betrieben.
Es ist darauf zu achten, dass der Calliope nicht mit einer Spannung von über 3,3V verbunden wird.


Wird ein Motor Driver Shield verwendet kann hier oft über einen Jumper der Enable Pin an +5V angeschlossen werden.


Über eine doppelte H-Brücke kann ebenso wie über ein Darlington Array (bspw. ULN2003) ein Schrittmotor angesteuert werden. 
Getestet wurde dies mit dem Schrittmotor 28BYJ-48 (mit einer untersetzung von 1 zu 349184).
Dieser Motor vollzieht mit rund 513 Schritten eine vollständige Umdrehung.


| ![Mini Dual Motor Driver](https://github.com/r00b1nh00d/KISS-MINT-MOTOR/blob/master/Mini%20dual%20Motor%20driver.jpg "Mini Dual Motor Driver") | ![Dual Motor Driver Deek-Robot](https://github.com/r00b1nh00d/KISS-MINT-MOTOR/blob/master/Motor%20Driver.jpg "Dual Motor Driver Deek-Robot") |
| :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
|                                            _Mini Dual Motor Driver_                                           |                                   _Dual Motor Driver Deek-Robot_
| ![Anschluss Schema](https://github.com/r00b1nh00d/KISS-MINT-MOTOR/blob/master/l293_anschluss.jpg "Anschluss Schema") | 
|                                            _Anschluss Schema_                                           |   


## Supported targets

* for PXT/calliope mini
