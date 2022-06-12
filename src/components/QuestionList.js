import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  const [qList, setQList] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((items) => setQList(items))
  }, [])

  function handleDeleteUpdate(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE", 
    })
    .then((response) => response.json())
    .then(() => {
      const udpatedList = qList.filter((q) => q.id !== id)
      setQList(udpatedList)
    })
  }

  function handleAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({correctIndex})

    })
    .then((response) => response.json())
    .then((answer) => {
      const updatedAnswers = qList.map((q) => {
        if (q.id === answer.id) return answer;
        return q;
      });
      setQList(updatedAnswers);
    });

  }


  const displayQuestions = qList.map((q) => {
    return <QuestionItem key={q.id} question={q} onDelete={handleDeleteUpdate} onChangeAnswer={handleAnswerChange}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {displayQuestions}
        </ul>
    </section>
  );
}

export default QuestionList;
