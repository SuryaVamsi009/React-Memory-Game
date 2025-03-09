import { useState, useEffect } from 'react';
import RegularButton from './RegularButton.jsx'
import '../GameSetup.css';
import emojiData from '../emojibase.json';


export default function GameSetup({ 
    selectedValue, 
    handleChange, 
    handleSubmit,
    selectedCategory,
    handleCategoryChange, 
}){
    const [warning, setWarning] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
         // Extract unique categories from emojiData
        const uniqueCategories = [...new Set(emojiData.map(emoji => emoji.category))];
        setCategories(uniqueCategories);
    },[]);

    const handleStartGame = (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!selectedValue) {
            setWarning('Please select the number of pairs of cards.');
            return; // Don't proceed with game start
        }
        if (!selectedCategory) {
            setWarning('Please select a category.');
            return; // Don't proceed with game start
        }

        setWarning(''); // Clear any previous warning
        handleSubmit(e); // Proceed with game start
    };
    
    return (
        <form className="wrapper">
            <RegularButton 
                className="button-start" 
                handleClick={handleStartGame}
            >
                Start Game
            </RegularButton>
            <div className='form-group'>
                <select className='select' 
                value={selectedCategory} 
                onChange={handleCategoryChange} >
                    <option value="" disabled>
                        Select Category 
                    </option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className='form-group'>
                <select 
                    id="card-count-select"
                    className='select'
                    value={selectedValue} 
                    onChange={handleChange}
                >
                    <option value="">
                        Select Number of Cards
                    </option>
                    <option value="5">10</option>
                    <option value="10">20</option>
                    <option value="15">30</option>
                    <option value="25">50</option>
                </select>
                {warning && <p className="warning">{warning}</p>}
            </div>
        </form>
    )
}