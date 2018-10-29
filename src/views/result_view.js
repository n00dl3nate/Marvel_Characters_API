const PubSub = require('../helpers/pub_sub.js');
const SelectView = require('./select_view.js');
const EventView = require('./event_view.js');

const ResultView = function (container) {
  this.container = container;
};

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('Movie:character-ready', (evt) => {
    const hero = evt.detail;
    this.render(hero);
  });
};

ResultView.prototype.render = function (data) {
  //.Div Creation
  const navList = document.createElement('nav')
  const information = document.createElement('div')
  //.Div Id Creation

  information.className = 'information'
  navList.id= 'listed-events'

  const eventInfo = document.querySelector('div#event-container')
  eventInfo.innerHTML = '';

  this.container.innerHTML = '';
  const heroName = document.createElement('h2');
  heroName.textContent = data.name|| data.error;
  this.container.appendChild(heroName);

  const herodes = document.createElement('p');
  herodes.textContent = data.description|| data.error;
  this.container.appendChild(herodes);


  const eventsTitle = document.createElement('h3');
  eventsTitle.textContent = `Events ${data.name} Was Apart of.`
  this.container.appendChild(eventsTitle);
  const heroEventsLi = document.createElement('ol');
    data.events.items.forEach((evt) =>{
      const event = document.createElement('li')
      event.textContent = evt.name;
      event.id = evt.resourceURI.toString();
      heroEventsLi.appendChild(event);
    })
  navList.appendChild(heroEventsLi);
  information.appendChild(navList);
  console.log(heroEventsLi);

  const image = document.createElement("IMG");
  image.setAttribute("src", `${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`);
  image.setAttribute("width", "300");
  image.setAttribute("height", "450");
  imagePlacement = document.querySelector('div#photo')
  information.appendChild(image);
  console.log(information)
  this.container.appendChild(information);

  const eventview = new EventView();
  eventview.eventSelected();

};



module.exports = ResultView;
