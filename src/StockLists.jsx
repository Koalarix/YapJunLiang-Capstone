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

  const [stockData, setStockData] = useState([])


  function newStockData() {
    
    const addNewStock = { Symbol: userStock,
                          Quantity: userQuantity,
                          Purchase: userPurchase,
                          Current: currentPrice };

    setStockData(stockData => stockData.concat(addNewStock))
  }


  function resetFormInputs() {
    setUserStock("")
    setUserQuantity("")
    setUserPurchase("")
    setFormSubmitted(false)
  }

  //call newStockData function whenever currentPrice is updated into the state as its the last to log
  useEffect(()=>{
      newStockData()  
    }, [currentPrice])

  useEffect(() => {
    console.log("1 list updated");
    resetFormInputs();
  },[StockLists])
  

  return ( 
    <div className="w-[25rem] flex flex-col items-center">
    {stockData.map((data, index) => {
      const profitLoss = (((data.Quantity)*(data.Current)) - ((data.Quantity)*(data.Purchase))).toFixed(2)
      return(
        <div className="bg-[#5e6381] w-[80%] h-[12rem] mb-5 pt-0 text-center rounded-md border border-[#969ab6] flex justify-center items-center">
            <section id="stocklistblock" className="h-full w-100 flex flex-col justify-center items-center pb-[1.5em] text-[#afb2c4] text-[0.68rem]">
              <h3 key={data.Symbol} className="text-[1.35em] text-white font-bold">Symbol: {data.Symbol} </h3>
              <p key={data.Quantity}>Quantity: {data.Quantity}</p>
              <p key={data.Purchase}>Purchase Price: {data.Purchase}</p>
              <p key={data.Current}>Current Price: {data.Current}</p>
              <h3 key={profitLoss} className="profit-loss text-[#38FF92]">Profit/Loss: {profitLoss}</h3>
            </section>
        </div>
      )}
    )}
    
    </div>
  
  )
}
export default StockLists


//* The implementation of the StockLists component could be improved. 
// Consider using props to pass values for each list item, 
// and use the .map() function to dynamically generate the items. 

//State Management: Use the useState hook to manage the state of the stock list. 


  //New Empty array to input all the collected data into an array of objects
  //where index[0] will be the first input with necessary details in key value pairs
  //e.g stockDataList = [ {Symbol: IBM, Quantity: 10, Purchase: 200, Current: 250.32 }, { another object here for 2nd input} ...etc]
  
  //Update array of objects https://www.youtube.com/watch?v=Y62mbztjmus


