(function(module) {
  var repoController = {};

  repoController.reveal = function() {
    console.log('show about me');
    $('#projects').hide();
    $('#aboutme').hide();
    $('#repos').fadeIn();
  };

  module.repoController = repoController;
})(window);
