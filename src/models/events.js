const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');
const apikey = require('../helpers/api_key');
const crypto = require("crypto-js");
const EventResult = require("../views/event_result.js")

const Events = function () {
  this.data = null;
}

Events.prototype.bindEvents = function () {
  PubSub.subscribe("Event:event-selected",(evt) => {
    const event = evt.detail;
    this.getEvent(event);
  });
};

Events.prototype.getEvent = function (event) {
  this.result()
  var ts = new Date().getTime();
  var publickey = apikey[0];
  var privatekey = apikey[1];
  var hash = crypto.MD5(ts + privatekey + publickey).toString();
  const url = `${event.id}?ts=${ts}&apikey=${publickey}&hash=${hash}`;
  const request = new RequestHelper(url);
  request.get().then((data) => {
  this.data = data.data.results[0]
  console.log(data.data.results[0])
  PubSub.publish('Event:event-ready', this.data )
 }).catch((error) => {
  PubSub.publish('Event:error',error)
});
}

Events.prototype.result = function() {
  const div = document.querySelector("div#event-container");
  resultView = new EventResult (div);
  resultView.showEvent();
}


module.exports = Events
