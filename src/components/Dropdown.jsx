
import { FaRegStar } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
const Dropdown = ({
     currencies,
     currency,
     setCurrency,
     favorites,
     handleFavorite,
     title = ""
}) => {

     const isFavourite = (curr)=>favorites.includes(curr)

  return (
    <div>
      <label htmlFor={title}
      className="block text-sm font-medium text-gray-700"
      >{title}</label>
      <div className="relative w-full"><select 
      value={currency}
      onChange={(e) =>setCurrency(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm
      focus:outline-none focus:ring-2 focus:ring-indigo-500">
        {favorites.map((currency) => {
        return(
            <option className="bg-gray-200"    value={currency} key={currency}>{currency}</option>
        );
        })}
        <hr/>
      {currencies
        .filter(c=>!favorites.includes(c))
        .map((currency) => {
        return(
            <option value={currency} key={currency}>{currency}</option>
        );
        })}
        </select>
        <button onClick={() => handleFavorite(currency)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center">
         {isFavourite(currency)? <TiStarFullOutline /> : <FaRegStar /> }
        
        </button>
        </div>
    </div>
  )
};

export default Dropdown
