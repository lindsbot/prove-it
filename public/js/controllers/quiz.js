angular.module('mean').controller('QuizController', ['$scope', '$http', 'Global', '$location', 'resultsService', 'ngTableParams', function ($scope, $http, Global, $location, resultsService, ngTableParams){
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

  $scope.results;

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
    for (var key in $scope.responses) {
      $scope.responsesArray.push($scope.responses[key]);
    }

    $location.path('/results');

    resultsService.setResults($scope.responsesArray);
    $scope.results = resultsService.getResults();
    console.log($scope.results)

    $scope.tableParams = new ngTableParams(
        {
          page: 1,
          count: 10
        }, {
          total: results.length,
          getData: function($defer, params) {
            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }

        }
    );
  };

}]);



