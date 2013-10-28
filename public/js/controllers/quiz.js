angular.module('mean').controller('QuizController', ['$scope', '$http', 'Global', '$location', function ($scope, $http, Global, $location){
  $scope.global = Global;

  $http.get('http://localhost:3000/quizData?callback=JSON_CALLBACK')
    .success(function(data, status, headers, config){
      $scope.quiz = {};
      $scope.quiz.multipleChoice = [];
      $scope.quiz.fillIn = [];
      for (var i = 0; i < data.questions.length; i++) {
        if (data.questions[i].type === "multiple_choice") {
          $scope.quiz.multipleChoice.push(data.questions[i]);
        }
        else if (data.questions[i].type === "fill_in") {
          $scope.quiz.fillIn.push(data.questions[i]);
        }
      }
    })
    .error(function(data, status, headers, config){
      console.log("error getting quiz data </3 ");
      console.log("response: ", data, "status: ", status, "headers: ", headers, "config: ", config);
    });

  $scope.selectedAnswers = {};

  $scope.selectAnswer = function(question, answer) {
    question.selected = answer;
    $scope.selectedAnswers[this.item.$$hashKey] = answer;
  };

  $scope.fillInAnswer = function(question, answer, index) {
    question.answers = question.answers || [];
    question.answers[index] = answer;
    $scope.selectedAnswers[this.item.$$hashKey] = question.answers;
  }

  $scope.score = function() {

    //build correct answer hash
    $scope.correctAnswers = {};

    for (var i = 0; i < $scope.quiz.multipleChoice.length; i++) {
      var hashKey = $scope.quiz.multipleChoice[i].$$hashKey;
      var answer = $scope.quiz.multipleChoice[i].correctAnswer;
      $scope.correctAnswers[hashKey] = answer;
    }

    for (var i = 0; i < $scope.quiz.fillIn.length; i++) {
      var hashKey = $scope.quiz.fillIn[i].$$hashKey;
      var answer = $scope.quiz.fillIn[i].correctAnswers;
      $scope.correctAnswers[hashKey] = answer;
    }

    var deepEquals = function(apple, orange){
        if (apple === orange) {return true;}
        if (!(apple instanceof Object) || !(orange instanceof Object)) {return false;} 
        if (Object.keys(apple).length !== Object.keys(orange).length) {return false;}
        for (var key in apple) {
          if (apple[key] === orange[key]) {continue;}
          if (!deepEquals(apple[key], orange[key])) {return false}  
        }
        return true;
    };

    console.log(deepEquals($scope.correctAnswers, $scope.selectedAnswers))

    $location.path('/results')
  };

}]);



