import React, { useState, useEffect } from "react";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("1");

  useEffect(() => {
    
    setQuestions([
      {
        id: 1,
        text: "lorem testum 1",
        correctAnswer: "1",
        answers: ["Option 1", "Option 2"],
      },
      {
        id: 2,
        text: "lorem testum 2",
        correctAnswer: "2",
        answers: ["Option 1", "Option 2"],
      },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion && answer1 && answer2) {
      setQuestions([
        ...questions,
        {
          id: questions.length + 1,
          text: newQuestion,
          correctAnswer,
          answers: [answer1, answer2],
        },
      ]);
      setNewQuestion("");
      setAnswer1("");
      setAnswer2("");
      setCorrectAnswer("1");
      setShowForm(false);
    }
  };

  const handleDelete = (id) => {
        setTimeout(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    }, 0);
  };

  const handleAnswerChange = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, correctAnswer: value } : q))
    );
  };

  return (
    <main>
      <nav>
        <button onClick={() => setShowForm(true)}>New Question</button>
        <button onClick={() => setShowForm(false)}>View Questions</button>
      </nav>
      <section>
        <h1>Quiz Questions</h1>
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <label>
              Prompt:
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                aria-label="Prompt"
                placeholder="Enter question"
              />
            </label>
            <label>
              Answer 1:
              <input
                type="text"
                value={answer1}
                onChange={(e) => setAnswer1(e.target.value)}
                aria-label="Answer 1"
                placeholder="Enter first answer"
              />
            </label>
            <label>
              Answer 2:
              <input
                type="text"
                value={answer2}
                onChange={(e) => setAnswer2(e.target.value)}
                aria-label="Answer 2"
                placeholder="Enter second answer"
              />
            </label>
            <label>
              Correct Answer:
              <select
                aria-label="Correct Answer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label>
            <button type="submit">Add Question</button>
          </form>
        ) : (
          <ul>
            {questions.map((q) => (
              <li key={q.id}>
                {q.text}
                <select
                  aria-label="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button onClick={() => handleDelete(q.id)}>
                  Delete Question
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default App;