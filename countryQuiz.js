(function(){
  addEventListener("DOMContentLoaded", function(){
    questions = [
      {
        question: "Which would you most want to farm?",
        answers: {
          right: makeImage("silkworms.jpg"),
          wrong: [
            only.html({p: "B"}),
            only.html({p: "C"}),
            only.html({p: "D"})
          ]
        }
      },
      {
        question: "Which is your favorite number?",
        answers: {
          right: only.html({p: "1"}),
          wrong: [
            only.html({p: "2"})
          ]
        }
      }
    ]

    function makeImage(name){
      return only.html({img: "", src: "images/"+name,
                          css: {
                            height: "200px",
                          }})
    }

    function makeQuestionPage(question, callback){

      var letters = "ABCDEFGHIJKLMNOP";
      var currentLetter = 0;
      function makeNextAnswerButton(answer){
        var letter = letters[currentLetter++];
        var button = only.html({button: letter});
        button.addEventListener("click", function(){
          callback({
            question: question.question,
            answer: answer
          })
        })
        return only.html({
          div: [button, answer]
        })
      }
      var answers = [makeNextAnswerButton(question.answers.right)]
      .concat(question.answers.wrong.map(makeNextAnswerButton));
      return only.html({
        div: [
          {p: question.question},
          {div: answers}
        ]
      })
    }

    function makeGameRunner(questions){
      var givenAnswers = []
      function buttonCallback(answer){
        givenAnswers.push(answer);
        next();
      }
      function makePage(question){
        return makeQuestionPage(question, buttonCallback);
      }
      var pages = questions.map(makePage);
      var currentPage = 0;
      function next(){
        currentPage += 1;
        if (pages.length == currentPage){
          endGame();
        } else {
          only.setHtml(pages[currentPage]);
        }
      }
      function start(){
        only.setHtml(pages[0])
      }
      function endGame(){
        only.setHtml({
          div:
          [{p: "Thanks for playing!"}]
          .concat(givenAnswers.map(function(answer){
            return only.html({
              div: [
                {p: "Q: " + answer.question},
                {p: "given answer:"},
                answer.answer
              ]
            });
          }))
        });
      }
      return {
        start: start
      }
    }

    var startButton = only.html({button: "START"});
    startButton.addEventListener("click", function(){
      var runner = makeGameRunner(questions);
      runner.start();
    })

    only.setHtml(startButton)
  })
})()
