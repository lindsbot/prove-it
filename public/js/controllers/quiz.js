angular.module('mean.system').controller('QuizController', ['$scope', '$http', 'Global', function ($scope, $http, Global){
  $scope.global = Global;

  $http.get('http://localhost:3000/quizData?callback=JSON_CALLBACK')
    .success(function(data, status, headers, config){
      $scope.quiz = data.questions;
      console.log("hooray!");
    })
    .error(function(data, status, headers, config){
      console.log("error </3 ");
      console.log("response: ", data, "status: ", status, "headers: ", headers, "config: ", config);
    });

  $scope.selectAnswer = function(question, answer) {
    question.selected = answer;
  };

  $scope.score = function() {
    alert("hey girl");
    console.log($scope.quiz)
  };

}]);



