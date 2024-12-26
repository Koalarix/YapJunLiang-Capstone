import './App.css'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import StockDataContext from "./contexts/StockdataContext";


function StockLists() {

   const {
    userStock, setUserStock,
    userQuantity, setUserQuantity,
    userPurchase, setUserPurchase,
    currentPrice, setCurrentPrice,
    formSubmitted, setFormSubmitted,
    stockData, setStockData
  } = useContext(StockDataContext);

  const effectHasRun = useRef(false);


const newStockData = () => {

  if (formSubmitted) {
    
    const addNewStock = { Symbol: userStock,
                          Quantity: userQuantity,
                          Purchase: userPurchase,
                          Current: currentPrice };

    setStockData(stockData => stockData.concat(addNewStock))
  }}


  useEffect(()=>{
    if(currentPrice != "" && !effectHasRun.current) {   
      newStockData();
      effectHasRun.current = true;
      setFormSubmitted(false);
    }}, [currentPrice]); 


  useEffect(() => {
    if(formSubmitted === false){
    resetFormInputs();
    console.log("stockData updated, .map generate a 1 list");
  //this is for me to check if the userData gets updated
    console.log(`Checking stock Data after List render ${JSON.stringify(stockData)}`)

  }
  },[stockData])


  function resetFormInputs() {
    setUserStock("")
    setUserQuantity("")
    setUserPurchase("")
    setCurrentPrice("")
    effectHasRun.current = false; 
    console.log("Listed a Stock - Reset input fields and formSubmit to false!")
  }
  

  return ( 
    <div className="w-[25rem] flex flex-col items-center">
    {stockData.map((data) => {
      const profitLoss = (((data.Quantity)*(data.Current)) - ((data.Quantity)*(data.Purchase))).toFixed(2)
      return(
        <div id="listContainer"className="bg-[#5e6381] w-[200px] h-[8rem] mb-5 pt-0 text-center rounded-md border border-[#969ab6] flex justify-center items-center">
            <section id="stocklistblock" className="h-full w-100 flex flex-col justify-center items-center pb-[1.5em] text-[#afb2c4] text-[0.68rem]">
              <h3 key={data.Symbol} className="text-[1.35em] text-white font-bold">Symbol: {data.Symbol} </h3>
              <p key={data.Quantity}>Quantity: {data.Quantity}</p>
              <p key={data.Purchase}>Purchase Price: {data.Purchase}</p>
              <p key={data.Current}>Current Price: {data.Current}</p>
              <h3 key={profitLoss} 
                  className={`profit-loss ${profitLoss > 0 ? `text-[#38FF92]` : (profitLoss == 0 ?  `text-[#a4acbd]` : `text-[#ff534e]`) } `}>
                    Profit/Loss: {`${profitLoss > 0 ? `+` : ``}${profitLoss}`}</h3>
            </section>
        </div>
      )}
    )}
    
    </div>
  
  )
}
export default StockLists


  // Personal note
  // previously if(formSubmitted) condition was not added to the useEffect with newStockData caused a bug
  // After StockLists updates triggers the 2nd useEffect and resetFormInputs executes
  // setCurrentPrice("") updates and triggers this addNewStock's useEffect with no user data.
  // it added a 2nd objecct that is empty to the stockData state
  // the .map found that it has 2 objects in the stockData array, one with data and one empty and rendered both.

