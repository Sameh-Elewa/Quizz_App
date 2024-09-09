let result=document.querySelector('.result');
const getScore = localStorage.getItem("Score");
const getQuestionNumber = localStorage.getItem("QuestionNumber");

if(getScore==getQuestionNumber){
    result.textContent="Congratulations! You have got the full-mark";
}else{
    result.textContent=`${getScore}/${getQuestionNumber}`;
}
