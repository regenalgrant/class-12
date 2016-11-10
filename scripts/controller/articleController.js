(function(module) {
  var articleController = {};

  articleController.reveal = function() {
    console.log('show projects');
    $('#aboutme').hide();
    $('#projects').fadeIn();
  };

  module.articleController = articleController;
})(window);
