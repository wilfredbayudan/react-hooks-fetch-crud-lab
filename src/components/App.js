import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(res => res.json())
      .then(json => setQuestions(json))
  }, [])

  function handleSubmitQuestion(questionObj) {
    fetch('http://localhost:4000/questions', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(questionObj)
    })
      .then(res => res.json())
      .then(newQuestion => setQuestions([...questions, newQuestion]))
      .catch(err => console.log(err))
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(setQuestions(questions.filter(question => question.id !== id)))
      .catch(err => console.log(err));
  }

  function handleNewAnswer(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        correctIndex: newIndex
      })
    })
      .then(res => res.json())
      .then(json => setQuestions(questions.map(question => {
        if (question.id === id) {
          return json;
        } else {
          return question;
        }
      })))
      .catch(err => console.log(err))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmitQuestion={handleSubmitQuestion} /> : <QuestionList questions={questions} onDelete={handleDelete} onNewAnswer={handleNewAnswer} />}
    </main>
  );
}

export default App;
