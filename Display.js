var Display = function (){
	
};

Display.prototype.sendInformation(timeBeforeTrain) {
	karotz.serial.open("/dev/ttyGS0",9600);//USB mini /dev/ttyGS0. normal USB : /dev/ttyUSB0
	//information send by serial to pov.
	karotz.serial.write(timeBeforeTrain + '\n\r');
}