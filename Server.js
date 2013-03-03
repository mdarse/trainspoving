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
    //log(data.header)
    //log(JSON.stringify(data));

    //log(JSON.stringify({foo: 'bar' }));

    karotz.tts.start(data, "fr");
};