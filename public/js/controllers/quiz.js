angular.module('mean.system').controller('QuizController', ['$scope', '$http', 'Global', function ($scope, $http, Global){
  $scope.global = Global;

  $http.jsonp('http://localhost:3000/quizData?callback=JSON_CALLBACK')
    .success(function(res, status, headers, config){
      console.log("response: ", res, "status: ", status, "headers: ", headers, "config: ", config);
      $scope.quiz = res.data;
    })
    .error(function(res, status, headers, config){
      console.log("error </3 ");
      console.log("response: ", res, "status: ", status, "headers: ", headers, "config: ", config);
    });

  $scope.selectAnswer = function(question, answer) {
    question.selected = answer;
  };

  $scope.score = function() {
    alert("hey girl");
  };



  // $scope.quiz = [
  //         {
  //           "question": "Which is not an advantage of using a closure?",
  //           "answers": [
  //               "Prevent pollution of global scope",
  //               "Encapsulation",
  //               "Private properties and methods",
  //               "Allow conditional use of 'strict mode'"
  //           ],
  //           "correctAnswer": 3
  //         },
  //         {
  //           "question": "To create a columned list of two­line email subjects and dates for a master­detail view, which are the most semantically correct?",
  //           "answers": [
  //               "<div>+<span>",
  //               "<tr>+<td>",
  //               "<ul>+<li>",
  //               "<p>+<br>",
  //               "none of these",
  //               "all of these"
  //           ],
  //           "correctAnswer": 1
  //         },
  //         {
  //           "question": "To pass an array of strings to a function, you should not use...",
  //           "answers": [
  //               "fn.apply(this, stringsArray)",
  //               "fn.call(this, stringsArray)",
  //               "fn.bind(this, stringsArray)"
  //           ],
  //           "correctAnswer": 1
  //         },
  //         {
  //           "question": " ____ and ____ would be the HTML tags you would use to display a menu item and its description.",
  //           "answers": [
  //               " ",
  //               ""
  //           ]
  //         },
  //         {
  //           "question": "Given <div id=\"outer\"><div class=\"inner\"></div></div>, which of these two is the most performant way to select the inner div?",
  //           "answers": [
  //               "getElementById(\"outer\").children[0]",
  //               "getElementsByClassName(\"inner\")[0]"
  //           ],
  //           "correctAnswer": 1
  //         }
  // ];

}]);


