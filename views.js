window.View = window.View || {};
window.View.Templates = window.View.Templates || {};

window.View.Templates = (function prepTemplates() {
  var listSource = $("#player-list-template").html();
  var listTemplate = Handlebars.compile(listSource);

  return {
    list: listTemplate,
  };


})();
