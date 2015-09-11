window.View = window.View || {};
window.View.Templates = window.View.Templates || {};

$(document).ready(function(){

  window.View.Templates = (function prepTemplates() {
    var nomSource = $("#nomination-template").html();
    var nomTemplate = Handlebars.compile(nomSource);

    return {
      nomination: nomTemplate,
    };

  })();

});
