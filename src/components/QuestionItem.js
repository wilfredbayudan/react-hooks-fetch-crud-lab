import React, { useState } from "react";

function QuestionItem({ question, onDelete, onNewAnswer }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedIndex, setSelectedIndex] = useState(correctIndex)

  function handleSelectChange (e) {
    setSelectedIndex(e.target.value);
    onNewAnswer(id, e.target.value);
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedIndex} onChange={handleSelectChange}>{options}</select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
