(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    console.log('show about me');
    $('#projects').hide();
        $('#repos').hide();
    $('#aboutme').fadeIn();
  };

  module.aboutController = aboutController;
})(window);
