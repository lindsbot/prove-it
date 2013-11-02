angular.module('quiz')
  .factory('resultsService', function(){
    var _results;
    var _score;
    return {
      setResults: function(results) {
        _results = results;
      },
      getResults: function() {
        return _results;
      },
      setScore: function(score) {
        _score = score;
      },
      getScore: function() {
        return _score;
      }
    };
  });