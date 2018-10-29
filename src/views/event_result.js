const PubSub = require('../helpers/pub_sub.js');
const EventView = require('./event_view.js');

const EventResult = function (container) {
  this.container = container;
};

EventResult.prototype.showEvent = function (){
  PubSub.subscribe('Event:event-ready', (evt) => {
    const event = evt.detail;
    console.log('Eventready',event);
    this.render(event);
  });
}

EventResult.prototype.render = function (event){

  this.container.innerHTML = '';
  const eventHeader = document.createElement('h2');
  eventHeader.textContent = "Event information"
  const eventInfo = document.createElement('p');
  eventInfo.textContent= event.description;
  this.container.appendChild(eventHeader);
  this.container.appendChild(eventInfo);

}

module.exports = EventResult
