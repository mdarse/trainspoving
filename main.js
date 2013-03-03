include("util.js");

var karotz_ip="localhost";

var buttonListener = function(event) {
    if (event == "DOUBLE") {
        karotz.tts.stop();
        exit();
    }
    return true;
}

var exitFunction = function(event) {
    if((event == "CANCELLED") || (event == "TERMINATED")) {
        exit();
    }
    return true;
}

var onKarotzConnect = function(data) {
    karotz.button.addListener(buttonListener);
    var server = new Server();
    karotz.rfid.addListener( 
        server = function sendInformation(data);
    );
}

karotz.connectAndStart(karotz_ip, 9123, onKarotzConnect, {});
