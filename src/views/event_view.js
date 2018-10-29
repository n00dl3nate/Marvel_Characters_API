const PubSub = require('../helpers/pub_sub.js');
const Events = require('../models/events.js');

const EventView = function () {
};

EventView.prototype.eventSelected = function (){
  const eventsModel = new Events();
  eventsModel.bindEvents();
  const listitem = document.querySelector('#listed-events')
  listitem.addEventListener('click', (event) => {
    const eventSelected = event.target
    PubSub.publish('Event:event-selected', eventSelected);
    console.log(eventSelected);
 });
}


module.exports = EventView;
