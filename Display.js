var Display = function (){
	
};

Display.prototype.sendInformation() {
	karotz.serial.write('bonjour'+ '\n\r');
}