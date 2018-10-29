const PubSub = require('../helpers/pub_sub.js');
const Marvel = require("../models/movie.js")
const SelectView = function(formElement){
  this.formElement = formElement
}

SelectView.prototype.bindEvents = function () {
  const movieData = new Marvel();
  movieData.bindEvents();
  this.formElement.addEventListener('submit',(event) => {
    event.preventDefault();
    const characterSearch = event.target['movie-search'].value;
    PubSub.publish("Marvel:search-typed",characterSearch);
    event.target.reset();
  });
};



module.exports = SelectView;
