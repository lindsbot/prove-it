angular.module('quiz')
  .service('resultsService', function(){
    var _results;
    return {
      setResults: function(results) {
        _results = results;
      },
      getResults: function() {
        return _results;
      }
    };
  });