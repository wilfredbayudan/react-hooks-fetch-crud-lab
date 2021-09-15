import React from "react";
import QuestionItem from './QuestionItem';

function QuestionList({ questions, onDelete, onNewAnswer }) {

  const renderQuestions = questions.map(question => <QuestionItem key={question.id} question={question} onDelete={onDelete} onNewAnswer={onNewAnswer} />)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderQuestions}</ul>
    </section>
  );
}

export default QuestionList;
