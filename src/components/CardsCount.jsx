export default function CardCountSelector({ selectedValue, handleChange }) {
    return (
        <label>
            Select Number of Cards:
            <select value={selectedValue} onChange={handleChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="30">30</option>
            </select>
        </label>
    )
}
