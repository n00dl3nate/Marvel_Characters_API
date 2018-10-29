const PubSub = require('../helpers/pub_sub.js');

const ErrorView = function (container) {
  this.container = container;
};

ErrorView.prototype.bindEvents = function () {
  PubSub.subscribe("Movie:error", (evt) => {
    const err = evt.detail;
    this.render(err);
  });
};


ErrorView.prototype.render = function (err) {
  console.error(err);

  this.container.innerHTML = '';
  const errorMessage = document.createElement('p');
  errorMessage.textContent = 'Oops! Harambe has noticed that something has gone wrong.';
  this.container.appendChild(errorMessage);
};

module.exports = ErrorView;
