import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const questions = [
    {
        type: 'radio',
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        answer: 'Paris'
    },
    {
        type: 'radio',
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        answer: 'Mars'
    },
    {
        type: 'checkbox',
        question: 'Which of the following are prime numbers?',
        options: ['2', '4', '7', '9', '11'],
        answer: ['2', '7', '11']
    },
    {
        type: 'radio',
        question: 'Which is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        answer: 'Pacific Ocean'
    },
    {
        type: 'radio',
        question: 'Who wrote "To Kill a Mockingbird"?',
        options: ['Harper Lee', 'Mark Twain', 'John Steinbeck', 'F. Scott Fitzgerald'],
        answer: 'Harper Lee'
    },
    {
        type: 'radio',
        question: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Fe', 'Cu'],
        answer: 'Au'
    },
    {
        type: 'checkbox',
        question: 'Which of these are programming languages?',
        options: ['Java', 'HTML', 'Python', 'CSS', 'Ruby'],
        answer: ['Java', 'Python', 'Ruby']
    },
    {
        type: 'radio',
        question: 'Which country is home to the Great Barrier Reef?',
        options: ['Brazil', 'Australia', 'Indonesia', 'Mexico'],
        answer: 'Australia'
    },
    {
        type: 'radio',
        question: 'What year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        answer: '1945'
    },
    {
        type: 'radio',
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
        answer: 'Leonardo da Vinci'
    },
    {
        type: 'checkbox',
        question: 'Which of these are mammals?',
        options: ['Dolphin', 'Shark', 'Whale', 'Octopus', 'Bat'],
        answer: ['Dolphin', 'Whale', 'Bat']
    },
    {
        type: 'radio',
        question: 'What is the capital of Japan?',
        options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
        answer: 'Tokyo'
    },
    {
        type: 'radio',
        question: 'Who discovered penicillin?',
        options: ['Alexander Fleming', 'Marie Curie', 'Louis Pasteur', 'Joseph Lister'],
        answer: 'Alexander Fleming'
    },
    {
        type: 'radio',
        question: 'What is the largest planet in our solar system?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Jupiter'
    },
    {
        type: 'checkbox',
        question: 'Which of these elements are noble gases?',
        options: ['Helium', 'Oxygen', 'Neon', 'Chlorine', 'Argon'],
        answer: ['Helium', 'Neon', 'Argon']
    },
    {
        type: 'radio',
        question: 'Which of these is not a primary color?',
        options: ['Red', 'Blue', 'Yellow', 'Green'],
        answer: 'Green'
    },
    {
        type: 'radio',
        question: 'What is the largest mammal on Earth?',
        options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        answer: 'Blue Whale'
    },
    {
        type: 'radio',
        question: 'Which planet is known as the "Morning Star"?',
        options: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
        answer: 'Venus'
    },
    {
        type: 'checkbox',
        question: 'Which of these countries are in Africa?',
        options: ['Nigeria', 'Brazil', 'Kenya', 'Thailand', 'Egypt'],
        answer: ['Nigeria', 'Kenya', 'Egypt']
    },
    {
        type: 'radio',
        question: 'What is the hardest natural substance on Earth?',
        options: ['Gold', 'Iron', 'Diamond', 'Quartz'],
        answer: 'Diamond'
    }
];

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const calculateScore = useCallback(() => {
    let newScore = 0;
    let answeredCount = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] !== null) {
        answeredCount++;
        if (q.type === 'checkbox') {
          if (JSON.stringify(userAnswers[index]?.sort()) === JSON.stringify(q.answer.sort())) {
            newScore++;
          }
        } else {
          if (userAnswers[index] === q.answer) {
            newScore++;
          }
        }
      }
    });
    setScore(newScore);
    setAnsweredQuestions(answeredCount);
  }, [userAnswers]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          calculateScore();
          setShowScore(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateScore]);

  const renderQuestions = () => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageQuestions = questions.slice(startIndex, endIndex);

    return pageQuestions.map((q, index) => (
      <div key={startIndex + index} className="question-container">
        <p>{startIndex + index + 1}. {q.question}</p>
        {q.type === 'radio' ? (
          q.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`q${startIndex + index}`}
                value={option}
                checked={userAnswers[startIndex + index] === option}
                onChange={() => handleAnswerChange(startIndex + index, option)}
              />
              {option}
            </label>
          ))
        ) : (
          q.options.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name={`q${startIndex + index}`}
                value={option}
                checked={userAnswers[startIndex + index]?.includes(option)}
                onChange={(e) => handleCheckboxChange(startIndex + index, option, e.target.checked)}
              />
              {option}
            </label>
          ))
        )}
      </div>
    ));
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleCheckboxChange = (index, value, checked) => {
    const newAnswers = [...userAnswers];
    if (!newAnswers[index]) {
      newAnswers[index] = [];
    }
    if (checked) {
      newAnswers[index].push(value);
    } else {
      newAnswers[index] = newAnswers[index].filter(v => v !== value);
    }
    if (newAnswers[index].length === 0) {
      newAnswers[index] = null;
    }
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    calculateScore();
    setShowScore(true);
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding! You're a quiz master!";
    if (percentage >= 70) return "Great job! You really know your stuff!";
    if (percentage >= 50) return "Good effort! There's room for improvement.";
    return "Keep practicing! You'll do better next time.";
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz Challenge Makkalae!!</h1>
        {showScore ? (
          <div id="score-display">
            <h2>Quiz Completed!</h2>
            <p>Questions Answered: {answeredQuestions}/{questions.length}</p>
            <p>Your score: {score}/{answeredQuestions}</p>
            <p>Percentage: {answeredQuestions > 0 ? ((score / answeredQuestions) * 100).toFixed(2) : 0}%</p>
            <p>{getScoreMessage(answeredQuestions > 0 ? (score / answeredQuestions) * 100 : 0)}</p>
          </div>
        ) : (
          <>
            <div id="timer">Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
            <form id="quiz-form">
              {renderQuestions()}
            </form>
            <div id="pagination">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
            {currentPage === totalPages && (
              <button onClick={handleSubmit}>Submit Quiz</button>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
