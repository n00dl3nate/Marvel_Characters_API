const SelectView = require("./views/select_view.js")

document.addEventListener('DOMContentLoaded', () => {

  const searchid = document.querySelector("form#movie-form")
  const selectView = new SelectView(searchid);
  selectView.bindEvents();

});
