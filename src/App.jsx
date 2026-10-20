// import Main from './main'
import Die from './component/Die'
import {useEffect, useState} from 'react'

function generateAllNewDice(){
    return new Array(10)
        .fill(0)
        .map(() => Math.ceil(Math.random() * 6));
}

export default function App() {

    const [dice, setDice] = useState(generateAllNewDice())
    
    const diceElement = dice.map((num) => <Die value={num}/>)
    
    function rollDice(){
      setDice(generateAllNewDice);
    }

    return (
        <main>
            <div className="dice-container" >
               {diceElement}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}