import React, { useState,useRef } from 'react'
import './Game.css'

function Game() {
    const [score , setScore] = useState(0)
    const [mistakes , setMistakes] = useState(0)
    const [currentProblem , setCurrentProblem] = useState(generateProblem())
    const [userAnswer , setUserAnswer] = useState()
    const [showError , setShowError] = useState(false)
    const answerField = useRef(null)
    const resetButton = useRef(null)
     
    React.useEffect(() => {
        if (score === 10 || mistakes === 3) {
            setTimeout(() => resetButton.current.focus(),331)
        }
    },[score,mistakes]) 

    function generateNumber(max) {
        return Math.floor(Math.random() * (max + 1))
      }
      
      function generateProblem() {
        return {
          numberOne: generateNumber(10),
          numberTwo: generateNumber(10),
          operator: ['+', '-', 'x'][generateNumber(2)]
        }
      }
      function handleSubmit(e) {
        e.preventDefault()

        answerField.current.focus()

        let correctAnswer;
        
        if (currentProblem.operator === "+") correctAnswer = currentProblem.numberOne + currentProblem.numberTwo
        if (currentProblem.operator === "-") correctAnswer = currentProblem.numberOne - currentProblem.numberTwo
        if (currentProblem.operator === "x") correctAnswer = currentProblem.numberOne * currentProblem.numberTwo
       
        if (correctAnswer === parseInt(userAnswer , 10)) {
          
            setScore((prev) => prev + 1)
      setCurrentProblem(generateProblem())
      setUserAnswer("")
        }
        else{
            setMistakes((prev) => prev + 1)
      setShowError(true)
      setTimeout(() => setShowError(false), 401)
        }
    }
      function resetGame() {
          setScore(0)
          setMistakes(0)
          setCurrentProblem(generateProblem())
          setUserAnswer('')
          answerField.current.focus()
      }
  return (
      <div>
         <div className={"main-ui" + (mistakes === 3 || score === 10 ?  "blurred" : "" )}>
  <p className={"problem" + (showError ? " animate-wrong " : "" )}>{currentProblem.numberOne} {currentProblem.operator} {" "} {currentProblem.numberTwo}</p>

  <form onSubmit={handleSubmit} action="" className="our-form">
    <input 
    ref={answerField}
     value={ userAnswer } 
      onChange={e => 
        setUserAnswer(e.target.value)} 
      type="text" 
      className="our-field"
       autoComplete="off" />
    <button>Submit</button>
  </form>

  <p className="status">You need {10 - score} more points, and are allowed to make {" "} {2 - mistakes} more mistakes.</p>
    
    <ProgressBar score={score} />
</div>

<div className={"overlay" + (mistakes === 3 || score === 10 ? " overlay--visible" : "" ) }>
  <div className="overlay-inner">
    <p className="end-message">{score === 10 ? "Congrats! You won" : "Sorry! You lost" }</p>
    <button 
    ref={resetButton}
    onClick={resetGame}
    className="reset-button">Start Over</button>
  </div>
</div>
      </div>
  )
}
    function ProgressBar(props) {
        return (
            <div className="progress">
    <div className="boxes">
      <div className="box">1</div>
      <div className="box">2</div>
      <div className="box">3</div>
      <div className="box">4</div>
      <div className="box">5</div>
      <div className="box">6</div>
      <div className="box">7</div>
      <div className="box">8</div>
      <div className="box">9</div>
      <div className="box">10</div>
    </div>
    <div className="progress-inner" style={{transform: `scaleX(${props.score/10})`}}></div>
  </div>
        )
    }
export default Game