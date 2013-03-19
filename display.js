var Display = function (host, port) {
  port = port || 80;
  var url = 'http://' + host;
  if (port != 80) url += (':' + port);
  this.url = url;
  // this.url = url + '/diag.html';
};

// set display text via POST http://<host>/display
Display.prototype.setText = function(text) {
  var url = this.url + '/display';
  var data = { text: text };
  var response = http.post2(url, data);
  var statusCode = response.header.substr(9, 3);
  if (statusCode == 303) return true;
  return false;
};

Display.prototype.setCountdown = function(remaining) {
  var url = this.url + '/countdown';
  var data = { remaining: remaining };
  var response = http.post2(url, data);
    var statusCode = response.header.substr(9, 3);
  if (statusCode == 303) return true;
  return false;
};
