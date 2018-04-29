/*
  xbuild sky crane
  For use with the Adafruit Motor Shield v2
  ---->  http://www.adafruit.com/products/1438
*/

#include <Wire.h>
#include <Adafruit_MotorShield.h>

// Create the motor shield object with the default I2C address
Adafruit_MotorShield AFMS = Adafruit_MotorShield();
// Connect a stepper motor with 200 steps per revolution (1.8 degree)
Adafruit_StepperMotor *myMotor = AFMS.getStepper(200, 1);

int incomingByte = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Sky crane started!");

  AFMS.begin();
  myMotor->setSpeed(100);  // 10 rpm
}

void loop() {
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();

    // say what you got:
    Serial.print("I received: ");
    Serial.println(incomingByte, DEC);
    if (incomingByte == 'D') {
      myMotor->step(25 * 200, FORWARD, DOUBLE);
    }
    if (incomingByte == 'R') {
      myMotor->step(20 * 200, BACKWARD, DOUBLE);
    }
  }
}