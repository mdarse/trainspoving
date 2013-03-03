var Server = function (){
	
};

Server.prototype.sendRfid = function(data){
	url = "http://paulinelherbette.fr/work/arduino/arduino.php";
    dataPost = {
        "rfid": data.id
    };

    header = {"headerKey": "headerValue"};
    isForm = false;

    var data = http.post(url, dataPost , header, isForm);

    if(data){
        //Processing data received
        //... here 

        // Karotz says sentence like : Le train en provenance de *Nom gare* arrivera en gare dans *Nombre de minute*.
        var sentence;
        karotz.tts.start(sentence, "fr");

        //Return the time before train for display in POV.
        return timeBeforeTrain;
    }else{
        return false;
    };
    
};