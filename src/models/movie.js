const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper');
const apikey = require('../helpers/api_key');
const crypto = require("crypto-js");
const ResultView = require("../views/result_view.js")

const Marvel = function () {
  this.data = null
}

Marvel.prototype.bindEvents = function () {
  PubSub.subscribe("Marvel:search-typed",(event) => {
    const character = event.detail;
    console.log(character);
    this.getCharacter(character);
  });
};

Marvel.prototype.getCharacter = function (character) {
  this.result()
  var ts = new Date().getTime();
  var publickey = apikey[0];
  var privatekey = apikey[1];
  var hash = crypto.MD5(ts + privatekey + publickey).toString();
  const url = `https://gateway.marvel.com:443/v1/public/characters?name=${character}&ts=${ts}&apikey=${publickey}&hash=${hash}`;

  const request = new RequestHelper(url);
    request.get().then((data) => {
      console.log(data);
      this.data = data.data.results[0]
      console.log(data.data.results[0])
      PubSub.publish('Movie:character-ready', this.data )
     }).catch((error) => {
      PubSub.publish('Movie:error',error)
    });
}

Marvel.prototype.result = function() {
  const div = document.querySelector("div#movie-container");
  resultView = new ResultView (div);
  resultView.bindEvents();
}



module.exports = Marvel
