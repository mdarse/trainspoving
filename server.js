var Server = function (baseUrl){
	this.baseUrl = baseUrl;
};

Server.prototype.addRfid = function(id, type, color) {
	var url = this.baseUrl + "/rfid",
      data = { id: id };
  if (type) data['type'] = type;
  if (color) data['color'] = color;
  var response = http.post2(url, data);
  var statusCode = response.header.substr(9, 3);
  if (statusCode == 201) return true;
  return false;
};

Server.prototype.fetchReminders = function() {
  var url = this.baseUrl + '/reminders';
  var response = http.get2(url);
  if (!response || !response.content) return false;
  this.reminders = JSON.parse(response.content);

  return this.reminders;
};
