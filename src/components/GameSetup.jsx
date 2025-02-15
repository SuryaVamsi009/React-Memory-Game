import RegularButton from './RegularButton.jsx'

export default function GameSetup({ 
    selectedValue, 
    handleChange, 
    handleSubmit 
}){
    
    return (
        <form className="wrapper">
            <RegularButton handleClick={handleSubmit}>
                Start Game
            </RegularButton>
                <select 
                    value={selectedValue} onChange={handleChange}
                >
                    <option value="5">Select Number of Cards</option>
                    <option value="5">10</option>
                    <option value="10">20</option>
                    <option value="15">30</option>
                    <option value="25">50</option>
                </select>
        </form>
    )
}