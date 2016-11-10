var projectV = {};

projectV.render = function () {
  Project.projects.forEach(function (article) {
    $('#projects').append(article.toHtml());
  });

};

Project.getJson();
