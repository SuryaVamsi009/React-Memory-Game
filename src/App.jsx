import { useState, useEffect } from 'react'
import MemoryCard from './components/MemoryCard.jsx'
import AssistiveTechInfo from './components/AssistiveTechInfo.jsx'
import GameOver from './components/GameOver.jsx'
import GameSetup from './components/GameSetup.jsx'
import emojiData from './emojibase.json';
import './GameSetup.css'

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [numberOfCards, setNumberOfCards] = useState("5")
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")

    
    useEffect(() => {
        if (selectedCards.length === 2 && selectedCards[0].name == selectedCards[1].name ){
            setMatchedCards((prevMatchedCards) => [...prevMatchedCards, ...selectedCards])
        }
    }, [selectedCards])


    useEffect(() => {
        if (emojisData.length && matchedCards.length === emojisData.length){
            setAreAllCardsMatched(true)
        }
    },[matchedCards, emojisData])

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); 
    }

    function handleCardCountChange(e) {
        setNumberOfCards(e.target.value)
    }


    async function startGame() {
        try {
             const filteredEmojiData = emojiData.filter((emoji) => emoji.category === selectedCategory);

            const dataSlice = await getDataSlice(filteredEmojiData)
            const emojisArray =  await getEmojisArray(dataSlice)

            setEmojisData(emojisArray)
            setIsGameOn(true)

        } catch (err){
            console.log(err)
        }
    }

//get data array
    async function getDataSlice(data){
        const randomIndices = getRandomIndices(data)
        const dataSlice = randomIndices.map((x) => data[x])
        return dataSlice
    }

// getting random indies
    function getRandomIndices(data){
        const randomIndicesArray = []

        for(let i=0; i < Number(numberOfCards); i++){
            const index = Math.floor(Math.random() * data.length)
            if (!randomIndicesArray.includes(index)){
                randomIndicesArray.push(index)
            }else{
                i--
            }
        }
        return randomIndicesArray;
    }

    //dubplicating array fun
    async function getEmojisArray(data){
        const pairedEmojisArray = shuffleArray(data.concat(data))
        return pairedEmojisArray 
    }

    //shuffle algo
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); 
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }


    function turnCard(name, index) {
        if ( selectedCards.length < 2){
            setSelectedCards((prevSelectedCard) => [...prevSelectedCard, {name , index}])
        }else if ( selectedCards.length == 2) {
            setSelectedCards([{name, index}])
        }
    }


    //restgame
    function resetGame(){
        setIsGameOn(false)
        setSelectedCards([])
        setMatchedCards([])
        setAreAllCardsMatched(false)
        setSelectedCategory("")
        setNumberOfCards("5")
    }
    
    return (
        <main>
            <h1>Memory Quest 🎴</h1>
            {areAllCardsMatched && 
                <GameOver handleClick={resetGame}/>
            }
            {!isGameOn && ( 
                <GameSetup 
                    selectedValue={numberOfCards}
                    handleChange={handleCardCountChange}
                    handleSubmit={startGame}
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                /> 
            )}
            {isGameOn && !areAllCardsMatched && 
                <AssistiveTechInfo 
                    emojisData={emojisData} 
                    matchedCards={matchedCards} 
                />
            }
            {isGameOn && 
                <MemoryCard 
                    selectedCards={selectedCards} 
                    matchedCards={matchedCards} 
                    handleClick={turnCard} 
                    data={emojisData} 
                />
            }
        </main>
    )
}