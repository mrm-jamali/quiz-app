const level = localStorage.getItem("level") || "medium"

const loader = document.getElementById("loader")
const container = document.querySelector(".containerr")
const questionText = document.getElementById("question-text")
const answerList = document.querySelectorAll("#answer-text")
const scoreText = document.querySelector(".score")
const nextBtn = document.querySelector(".next-btn")
const finishBtn = document.querySelector(".finish-btn")
const questionNumber = document.querySelector(".question-number")

const error = document.querySelector("#error")
const correctBonus = 10;
const url = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`

let formatedData = null
let questionIndex = 0
let correctAnswer = null
let score = 0;
let IsAccepted = true;

const formatData = (questionData) => {

  // console.log(questionData)
  const result = questionData.map((item) => {
    const questionObject = {
      question: item.question
    };
    const anwsers = [...item.incorrect_answers];

    correctAnswerIndex = Math.floor(Math.random() * 4);
    anwsers.splice(correctAnswerIndex, 0, item.correct_answer);
    // console.log(anwsers)
    questionObject.anwsers = anwsers;

    questionObject.correctAnswerIndex = correctAnswerIndex;
    console.log(questionObject)
    return questionObject;

  });
  return result;
}


const fetchData = async () => {
  try {
const response = await fetch(url);
  const json = await response.json();
  formatedData = formatData(json.results);
  console.log(formatedData)
  // formatData(json.results)

  Start()
  } catch(err) {
    loader.style.display = "none"
    error.style.display="block"

  }
  
}

const Start = () => {
  showQuestion()
  loader.style.display = "none"
  container.style.display = "flex"

}

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const {
    question,
    anwsers,
    correctAnswerIndex
  } = formatedData[questionIndex]
  console.log(answerList, anwsers)
  correctAnswer = correctAnswerIndex;
  console.log("correctAnswer:", correctAnswer)
  questionText.innerText = question;
  answerList.forEach((answ, index) => {
    answ.innerText = anwsers[index];
  })
}

const checkanswer = (event, index) => {
  if (!IsAccepted) return;
  IsAccepted = false;
  // console.log(index)
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("answer-correct")
    score += correctBonus;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("answer-wrong")
    answerList[correctAnswer].classList.add("answer-correct")
  }

}
const nextHandeler = () => {
  questionIndex++;
  if (questionIndex < formatedData.length) {
    IsAccepted = true;

    // console.log(questionIndex)
    removeClasses()
    showQuestion()

  } else {
    finishHandeler()

  }
}

const finishHandeler = () => {
  localStorage.setItem("score", JSON.stringify(score))
  window.location.assign("end.html")
}

const removeClasses = () => {
  answerList.forEach((button) => (button.className = "answer-text"))
}
window.addEventListener("load", fetchData)
answerList.forEach((answ, index) => {

  answ.addEventListener("click", (event) => checkanswer(event, index))
})


nextBtn.addEventListener("click", nextHandeler)

finishBtn.addEventListener("click", finishHandeler)