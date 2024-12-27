import React, { useState } from 'react';

const ingredientList = ['bread', 'lettuce', 'tomato', 'cheese', 'bacon', 'pickles', 'peanut butter']

function App() {
  const [ sandwich, setSandwich ] = useState<string[]>([])
  const [ warning, setWarning ] = useState<string>()

  const checkIngredient = (item: string, list: string[]) =>{
    const isPickles = list.find(e => e === 'pickles')
    const isPeanutButter = list.find(e => e === 'peanut butter')
    
    if ((isPickles && item === 'peanut butter') || (isPeanutButter && item === 'pickles')) {
      return 'something wrong'
    }
    return null
  }

  const checkBacon = (item: string, list: string[]) => {
    const baconNumber = list.filter(e => e === 'bacon').length
    if(baconNumber > 4 && item === 'bacon'){
      setWarning('The number of the bacons that in your sandwich is more than 5, the bacon fairy gets upset.')
      return 'something wrong'
    } else {
      setWarning('')
      return null
    }
  }

  const add = (item: string) => {
    const ingredientWrong = checkIngredient(item, sandwich)
    const baconWrong = checkBacon(item, sandwich)

    if (ingredientWrong) {
      alert("Don't put pickles and peanut butter together!")
      return
    }

    if (baconWrong) {
      return
    }

    setSandwich(prev=>[
      ...prev,
      item
    ])
  }

  const getRandomNum = (max: number) =>{
    return Math.floor(Math.random() * max)
  }

  const randomSandwich = () => {
    const ingredientNumber = getRandomNum(15)
    let list = ['']

    setSandwich(prev=>[
      ...prev,
      'bread'
    ])
    for (let i = 0; i < ingredientNumber + 1; i ++) {
      const index = getRandomNum(ingredientList.length)
      const ingredientWrong = checkIngredient(ingredientList[index], list)
      const baconWrong = checkBacon(ingredientList[index], list)
      
      if (!baconWrong && !ingredientWrong) {
        list.push(ingredientList[index])
      } else {
        break
      }
    }
    setSandwich(prev=>[
      ...prev,
      ...list,
      'bread'
    ])
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <button onClick={() => {
        setSandwich([])
        randomSandwich()
      }}>
        magic randomizer
      </button>
      <div style={{display: 'flex'}}>
        {ingredientList.map(( item: string, index: number )=>(
          <div key={index} style={{display: 'flex', flexDirection: 'column', margin: '10px', justifyContent: 'center'}}>
            <div>{item}</div>
            <button onClick={() => {
                add(item)
            }}>
                Add
              </button>
          </div>
        ))}
      </div>
      <div style={{color: "red"}}>{warning}</div>
      <div>
        {sandwich.map(( item: string, index: number )=>(
            <div key={index} >{item}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
