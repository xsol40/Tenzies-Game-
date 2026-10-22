import Die from './component/Die'
import {useState} from 'react'
import { nanoid  } from 'nanoid'
import Fireworks from './component/Fireworks'


function generateAllNewDice(){
    return new Array(10)
        .fill(0)
       .map(() => ({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            }))
  }

export default function App() {

    const [dice, setDice] = useState(generateAllNewDice())
    
        const gameWon = dice.every(die => die.isHeld) &&
          dice.every(die => die.value === dice[0].value)


    console.log(gameWon);

     function hold(id) {
        setDice(oldDice => {
            return oldDice.map(die => {
                return die.id === id ?
                    {...die, isHeld: !die.isHeld} :
                    die
            })
        })
    }

   
      
    const diceElement = dice.map((dieObj) => <Die 
          key={dieObj.id} 
          value={dieObj.value} 
          isHeld={dieObj.isHeld}
          hold={() => hold(dieObj.id)}
        />)

        

    function rollDice(){
      setDice(oldDice => {
        return oldDice.map(die => {
          return die.isHeld ? die : {...die, value:  Math.ceil(Math.random() * 6)}
        })
      });
    }

    function newGame() {
      setDice(generateAllNewDice())
    }

    function handleMainButtonClick() {
      if (gameWon) {
        newGame()
      }
      rollDice()
    }


    return (
        <main>
            {gameWon && <Fireworks />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
               {diceElement}
            </div>
            <button className="roll-dice" onClick={handleMainButtonClick}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}