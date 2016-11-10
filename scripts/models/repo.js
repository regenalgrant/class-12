(function(module) {
  var repos = {};

  repos.allRepos = [];

  repos.requestRepos = function(callback) {

    $.ajax({
      url: 'https://api.github.com/users/regenalgrant/repos',
      type:'GET',
      headers: {'Authorization': 'token ' + '46ae19e42d0882ce03ca78384e5bf66f7d5f0bd7'},
      success: function(data) {
        console.log(data);
        repos.allRepos = data;
        callback();
      }
    });
  };

  repos.withTheAttribute = function(myAttr) {
    return repos.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.repos = repos;
}) (window);
