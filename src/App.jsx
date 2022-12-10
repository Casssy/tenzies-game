import React from "react"
import Die from "./Components/Die"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {
  
/////// SETTING STATES /////////

const [dices, setDices] = React.useState(generateAllDices())
const [gameWin, setGameWin] = React.useState(false)
const [counter, setCounter] = React.useState(0)

/////// FUNCTIONS /////////

function generateNewDie(){
  let randomNumber = Math.ceil(Math.random() * 6)
  return {
    value: randomNumber,
    isHeld: false,
    id: nanoid()
  }
}

function generateAllDices(){
  let dicesArray = []
  for(let i=0; i < 10; i++){
    dicesArray.push(generateNewDie())
  }
  return dicesArray
}

function roll(){
  setDices(prevDices => prevDices.map(die =>{
    return( die.isHeld ? die : generateNewDie()
    )
  }))
  setCounter(prevCounter => prevCounter + 1)
  console.log(counter)
}

function holdDice(id) {
  setDices(prevDices => prevDices.map(die => {
    return( die.id === id ?
      {...die,
            isHeld: !die.isHeld}
            :
            die)
  }))
}

function newGame(){
  setDices(generateAllDices())
  setGameWin(false)
  setCounter(0)
}

/////// CHECK CONDITIONS FOR END GAME /////////

React.useEffect(() =>{
  const allHeld = dices.every(die => die.isHeld)
  const firstValue = dices[0].value
  const allSameValue = dices.every(die => die.value === firstValue)
  if(allHeld && allSameValue){
    setGameWin(true)
  }
}, [dices])

/////// CREATING ELEMENTS /////////

const dieElements = dices.map(die => {
    return (<Die 
              value={die.value}
              key={die.id}
              isHeld={die.isHeld}
              handleClick={() => holdDice(die.id)}
     />)
  })

/////// RETURN /////////

  return (
    <main>
      
      {gameWin && <Confetti />}
      <h1> Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      
      <div className="grid">
        {dieElements}
      </div>
      
      <button 
        className="roll-btn"
        onClick={gameWin? newGame : roll}
        >{gameWin? "New game" : "Roll" }
      </button>
      
      {gameWin && <p className="number-of-tries"> It took you {counter} tries to win the game</p>}

    </main>
  )
}

export default App
