var StepperLib = require("wpi-stepper");
var Stepper = StepperLib.Stepper;
var Gpio = require("onoff").Gpio;

function enableMotor() {
	var enable1 = new Gpio(2, "out");
	var enable2 = new Gpio(3, "out");

	enable1.writeSync(1);
	enable2.writeSync(1);
}

function runMotor() {
	var motor = new Stepper({
		pins: [
			14,
			15,
			18,
			23,
		],
		steps: 200
	});

	motor.speed = 10; // RPM

	let dir = 1;

	function doMove() {
		if ( motor.speed < 240 )
		motor.speed += 5;

		motor.move(dir * 50) // 0.5 rotations
			 .then( doMove );
	}

	doMove();
}

enableMotor();
runMotor();