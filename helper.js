const formatData = (questionData) => {
  
    // console.log(questionData)
    const result=questionData.map((item) =>{
      const questionObject={question: item.question};
      const anwsers=[...item.incorrect_answers];
     
      correctAnswerIndex=Math.floor(Math.random()*4);
      anwsers.splice(correctAnswerIndex,0, item.correct_answer);
      // console.log(anwsers)
      questionObject.anwsers=anwsers;
      questionObject.correctAnswerIndex=correctAnswerIndex;
      return questionObject;
      
    });
    return result;
  }


  export default formatData