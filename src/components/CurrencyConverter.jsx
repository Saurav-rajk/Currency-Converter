import { useCallback, useEffect, useState } from "react"
import { IoMdSwap } from "react-icons/io";
import Dropdown from "./Dropdown";



function CurrencyConverter() {
   const[currencies,setcurrencies] = useState([])
   const[amount,setamount] = useState(1)
   //https://api.frankfurter.dev/v1/currencies
   const [fromCurrency,setFromCurrency] = useState("USD");
   const [toCurrency,setToCurrency] = useState("INR");
   const [convertedAmount, setConvertedAmount] = useState(null);
   const [converting, setConverting] = useState(false)
   const [favorites,setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["INR","USD"]);
   
   const fetchCurrencies =async () =>{
    
     try {
        const res=await fetch("https://api.frankfurter.dev/v1/currencies")
        const data= await res.json();
        setcurrencies(Object.keys(data))
        
     } catch (error) {
        console.error("Error Fetching", error);
     }
   };

   useEffect(() => {
      fetchCurrencies();
   },[]);

   const convertCurrency =async () =>{
    if(!amount) return;
    setConverting(true);
    try {
        const res=await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
        const data= await res.json()

        setConvertedAmount(data.rates[toCurrency]+" "+toCurrency)
     } catch (error) {
        console.error("Error Fetching", error);
     }finally{
        setConverting(false)
     }
   }
   const handleFavorite = (currency) =>{
    let updatedFavorites = [...favorites];
    if(favorites.includes(currency)){
        updatedFavorites = updatedFavorites.filter((fav) => fav !== currency)
    }else{
        updatedFavorites.push(currency);
        
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
   }
   const swapCurrencies = () =>{
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
   }
    //https://api.frankfurter.dev/v1/currencies
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">

         <h2 className="mb-5 text-2xl font-semibold text-gray-700">Currency Converter</h2>
         <div className="grid grid-cols-1 sm:grid-cols-3">
           <Dropdown currencies={currencies} title="From:" 
           favorites={favorites}
           handleFavorite={handleFavorite}
           setCurrency={setFromCurrency}
           currency={fromCurrency}
           />
            {/*swap button*/}
            <div className="flex justify-center -mb-5 p-3 mt-2 sm:mb-0">
                <button onClick={swapCurrencies}
                className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                <IoMdSwap />
                </button>
            </div>
         
            <Dropdown currencies={currencies} title="To:"
            favorites={favorites}
             handleFavorite={handleFavorite}
             setCurrency={setToCurrency}
             currency={toCurrency}
             />
         
         </div>
         <div className="mt-4">
            <label htmlFor="amount"
            className="block text-sm font-medium text-gray-700">Amount:</label>
            <input type="number"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
            className="w-full p-2 border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2"/>
         </div>
         <div className="flex justify-end mt-6">
            <button 
            onClick={convertCurrency}
            className={`px-5 py-2 bg-indigo-600 text-white rounded-md
             hover:bg-indigo-700 focus:ring-indigo-500 
             focus:outline-none focus:ring-2 focus:ring-offset-2 ${converting?"animate-pulse":""}`}>
                Convert</button>

         </div>
         {convertedAmount && (
         <div className="mt-4 text-lg font-medium text-right text-green-400">
            Converted Amount:{convertedAmount}
         </div>
         )}
    </div>
  )
};

export default CurrencyConverter
