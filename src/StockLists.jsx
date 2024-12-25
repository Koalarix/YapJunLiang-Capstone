import './App.css'
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import StockDataContext from "./contexts/StockdataContext";


function StockLists() {

   const {
    userStock, setUserStock,
    userQuantity, setUserQuantity,
    userPurchase, setUserPurchase,
    currentPrice, setCurrentPrice,
    formSubmitted, setFormSubmitted
  } = useContext(StockDataContext);

  const [stockData, setStockData] = useState([]) //empty array to store all the imconing object data for .map() to look through


  function newStockData() {
    
    const addNewStock = { Symbol: userStock,
                          Quantity: userQuantity,
                          Purchase: userPurchase,
                          Current: currentPrice };

    setStockData(stockData => stockData.concat(addNewStock))
  }


  // Update new data into array of objects in stockData
  useEffect(()=>{
    if(formSubmitted) 
      {newStockData()} //Purpose of this useEffect - to call newStockData function whenever currentPrice is updated after button press
    }, [currentPrice]) //currentprice because its the slowest data to update compared to the user input data

// call reset to input and formsubmission state after the new Lists get rendered
  useEffect(() => {
    console.log("1 list updated");
    console.log(stockData) //this is for me to check if the userData gets updated
    resetFormInputs();
  },[stockData])

  function resetFormInputs() {
    setUserStock("")
    setUserQuantity("")
    setUserPurchase("")
    setCurrentPrice("") 
    setFormSubmitted(false)
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




  //New Empty array to input all the collected data into an array of objects
  //where index[0] will be the first input with necessary details in key value pairs
  //e.g stockDataList = [ {Symbol: IBM, Quantity: 10, Purchase: 200, Current: 250.32 }, { another object here for 2nd input} ...etc]
  
  //Update array of objects https://www.youtube.com/watch?v=Y62mbztjmus


  // Personal note
  // previously this if(formSubmitted) condition was not added to the useEffect used to update new Data- caused a bug
  // After StockLists updates triggers the 2nd useEffect below and resetFormInputs executes
  // setCurrentPrice resets/updates and triggers this useEffect to addNewStock with no user data.
  // it added a 2nd objecct that is empty to the stockData state
  // the .map found that it has 2 objects in the stockData array, one with data and one empty and rendered both.

