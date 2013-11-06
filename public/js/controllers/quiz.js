angular.module('quiz').controller('QuizController', ['$rootScope', '$scope', '$http', 'Global', '$location', 'resultsService', function ($rootScope, $scope, $http, Global, $location, resultsService, ngTableParams){
  $scope.global = Global;

  $http.get('/quizData?callback=JSON_CALLBACK')
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

      //build correct answer array
      $scope.correctAnswers = {};

      for (var i = 0; i < $scope.quiz.multipleChoice.length; i++) {
        var id = $scope.quiz.multipleChoice[i].id;
        var answer = $scope.quiz.multipleChoice[i].correctAnswer;
        $scope.correctAnswers[id] = answer;
      }

      for (var i = 0; i < $scope.quiz.fillIn.length; i++) {
        var answer = $scope.quiz.fillIn[i].correctAnswers;
        var id = $scope.quiz.fillIn[i].id;
        $scope.correctAnswers[id] = answer;
      }

    })
    .error(function(data, status, headers, config){
      console.log("error getting quiz data </3 ");
      console.log("response: ", data, "status: ", status, "headers: ", headers, "config: ", config);
    });

  $scope.responses = {};
  $scope.responsesArray = [];

  $scope.selectAnswer = function(question, answer, index) {
    question.selected = answer;
    var id = this.item.id;
    $scope.responses[id] = {
      id: id,
      question: this.item.question,
      correctAnswer: this.item.correctAnswer,
      selectedAnswer: question.selected
    };
  };

  $scope.fillInAnswer = function(question, answer, index, parentIndex) {
    question.answers = question.answers || [];
    question.answers[index] = answer;
    var id = this.item.id;
    $scope.responses[id] = {
      id: id,
      question: this.item.question,
      correctAnswer: this.item.correctAnswers,
      selectedAnswer: question.answers
    };

  };

  $scope.score = function() {
    Array.prototype.compare = function (array) {
      if (!array) { return false; }
      if (this.length !== array.length) {
        return false;
      }
      for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
          if (!this[i].compare(array[i])) {
            return false;
          }
        }
        else if (this[i] !== array[i]) {
          return false;
        }
      }
      return true;
    }

    for (var key in $scope.responses) {
      $scope.responsesArray.push($scope.responses[key]);
    }

    resultsService.setResults($scope.responsesArray);
    $rootScope.results = resultsService.getResults();

    var score = 0;
    for (var i = 0; i < resultsService.getResults().length; i++) {
      if (resultsService.getResults()[i].correctAnswer instanceof Array) {
        if (resultsService.getResults()[i].correctAnswer.compare(resultsService.getResults()[i].selectedAnswer)){
          score++;
        }
      } else {
        if (resultsService.getResults()[i].correctAnswer === resultsService.getResults()[i].selectedAnswer) {
          score++;
        }
      }
    }
    resultsService.setScore(score);
    $location.path('/results');
  };

  $scope.correctTest = function(item) {
    $scope.score = resultsService.getScore();

    if (item.correctAnswer instanceof Array) {
        return item.correctAnswer.compare(item.selectedAnswer)
      } else {
        return item.correctAnswer === item.selectedAnswer 
      }
  };

  $scope.tryAgain = function() {
    $scope.responses = {};
    $scope.responsesArray = [];
    $location.path('/quiz');
  }


}]);



