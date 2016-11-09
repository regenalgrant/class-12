(function(module) {
  var articleController = {};

  articleController.reveal = function() {
    console.log('show projects');
    $('#projects').fadeIn();
    $('#aboutme').hide();
  };

  module.articleController = articleController;
})(window);
