include('server.js');

(function(_log) {
  var host = 'localhost';
  var apiBaseUrl = 'http://trainspoving.mathieudarse.fr/api';

  function log(message) {
    var now = new Date(),
        data = "[" + now.toJSON() + "] ";
    data += (typeof(message) == 'object') ? JSON.stringify(message) : message;
    if (host == 'localhost')
      // Native
      karotz.serial.write(data + '\n');
    else
      // Java KarotzVM
      _log(message);
  }

  function dump(data) {
    var stack = [];
    function eachRecursive(obj) {
      for (var k in obj) {
        stack.push(k);
        if (typeof obj[k] == "object") {
          eachRecursive(obj[k]);
        }
        else
          log(stack.join('.') + ": " + obj[k]);
        stack.pop();
      }
    }
    eachRecursive(data);
  }

  karotz.boot = function(callback, data) {
    try {
      var boot = function(data) {
        karotz.serial.open("/dev/ttyGS0", 9600);
        log("-------------------");
        log("TransPOVing started");
        try { callback(data); }
        catch (e) { log(e); exit(); }
      };
      karotz.connect(host, 9123);
      karotz.start(boot, data || { "foo": "bar" });
    } catch (e){
      log(e);
    }
  };

  var App = function() {
    this.server = new Server(apiBaseUrl);
  };
  App.prototype.start = function() {
    var that = this;
    // add listeners
    var rfidListener = function(data) {
      karotz.rfid.addListener(rfidListener); // Fix listener called only first time
      that.onRfid(data);
    };
    karotz.rfid.addListener(rfidListener);

    log("Fetching reminders...");
    this.reminders = this.server.fetchReminders();
    log("OK");
  };
  App.prototype.onRfid = function(data) {
    log("RFID " + data.id);
    var reminder = this.findReminder(data.id);
    if (!reminder) {
      log("No reminder found, submiting tag to API...");
      // TODO say what we do here
      var response = this.server.addRfid(data.id, data.type, data.color);
      if (!response) {
        log('Error');
        return;
      }
      log('OK');
      // throw new Error("Unable to POST new RFID tag.");
    } else {
      log("Found matching reminder");
      log(reminder);
    }
  };
  App.prototype.findReminder = function(tagId) {
    for (var i = 0, l = this.reminders.length; i < l; i++) {
      var reminder = this.reminders[i];
      if (reminder.rfid && reminder.rfid === tagId) {
        return reminder;
      }
    }
    return null;
  };
  App.prototype.hello = function() {
    log("Hello World!");
  };

  karotz.boot(function(data) {
    // dump(this);
    // var path = '/usr/karotz/apps/' + appName +'/sncf.mp3';
    var path = 'http://dl1.audiko.net/get/preview/149100/19066299/SNCF-Sncf.mp3?k=e07e6385a78a596ea4426621c2f81d2e';
    log("Play SNCF jingle");
    karotz.multimedia.play(path, function(event) {
      log("SongEvent: " + event);
      if (event == 'TERMINATED') {
        karotz.tts.start("TrainsPOVing vous souhaite la bienvenue.", 'fr');
      }
    });

    // Start app
    var app = new App();
    app.start();
  });



})(log);
