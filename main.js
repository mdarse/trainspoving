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
    var timeBeforeTrain = karotz.rfid.addListener( 
        server = function sendInformation(data);
    );

    var display = new Display();
    //If the time before train is false we have not find the train else we can launch POV
    if (timeBeforeTrain == false) {
        karotz.tts.start("Je suis désolé je n'ai trouvé aucun train correspondant.", "fr");
    }else{
        display = function sendInformation(timeBeforeTrain);
    };
}

karotz.connectAndStart(karotz_ip, 9123, onKarotzConnect, {});
