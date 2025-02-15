 import EmojiButton from "./EmojiButton"

export default function MemoryCard({ 
    handleClick , 
    data, 
    selectedCards, 
    matchedCards 
}) {
    

    const cardEL = data.map((emoji, index) =>{
        const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
        const matchedCardEntry = matchedCards.find(emoji => emoji.index === index)
            
        const cardStyle = 
            matchedCardEntry ? "card-item--matched" : 
            selectedCardEntry ? "card-item--selected" : 
            ""

        return (
            <li key={index} className={`card-item ${cardStyle}`}>
                <EmojiButton
                    emoji = {emoji}
                    index = {index}
                    selectedCardEntry = {selectedCardEntry}
                    matchedCardEntry = {matchedCardEntry}
                    handleClick={() => handleClick(emoji.name, index)}
                />
            </li>
        )
    })
    
    return <ul className="card-container">{cardEL}</ul>
}