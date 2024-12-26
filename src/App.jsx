import './App.css'
import { useContext, useEffect, useState } from 'react'
import StockDataContext from './contexts/StockdataContext.js'
import StockListsEmpty from './StockListsEmpty.jsx';
import StockLists from './StockLists.jsx';
import { useCallback } from 'react';



//For simplifying all the input details, to try when there is time
//https://www.youtube.com/watch?v=-KBS93RlUCY

function App() {
  const [userStock, setUserStock] = useState("");
  const [userQuantity, setUserQuantity] = useState("");
  const [userPurchase, setUserPurchase] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [stockData, setStockData] = useState([]) //empty array to store all the imconing object data for .map() to look through
  
  
  return (
    <>
    <div className="h-dvh w-full flex justify-center items-center">
      <div className='w-[60%] min-w-[18em] max-w-[50em] max-h-[60em] rounded-[35px] bg-[#4a4e69] shadow-lg'>
          <Header />
            <StockDataContext.Provider value={{ 
              userStock, setUserStock, 
              userQuantity, setUserQuantity, 
              userPurchase, setUserPurchase, 
              currentPrice, setCurrentPrice,
              formSubmitted, setFormSubmitted,
              stockData, setStockData
              }} >
             <Form/>
             <StockContainer />
            </StockDataContext.Provider>
      </div>
    </div>
 
    </>
  )
}

function Header() {
  return (
    <header className="flex flex-col items-center">
      <h1 id="title" className='w-full text-[1.25rem] pt-6 pb-4 font-title font-bold text-white text-center'>Finance Dashboard</h1>
      <hr className="w-[90%]"></hr>
    </header>
  )
}

function Form() {
 
  const {
    userStock, setUserStock,
    userQuantity, setUserQuantity,
    userPurchase, setUserPurchase,
    currentPrice, setCurrentPrice, //current price for checking
    formSubmitted, setFormSubmitted,
    stockData
  } = useContext(StockDataContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true)
    checkStockValid();
    console.log(`Stock Data on Submit ${JSON.stringify(stockData)}`)
  }

  function resetFormInputs() {
    setUserStock("")
    setUserQuantity("")
    setUserPurchase("")
    setFormSubmitted(false);
    console.log("Stock not found - Reset input fields and formSubmit to false!")
  }

  const checkStockValid = useCallback(()=>[
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ userStock +"&apikey=demo") // demo Comment off on deploy
    // fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ userStock +"&apikey=6DNFSUAJZ4VJJNWN")
    .then((res) => res.json())
     .then((data) => {


//COMMENT - this code is to be used when fetching from actual API 
  //     if(Object.keys(data["Global Quote"]).length === 0 ) {    // invalid stock symbol returns empty object
  //       console.error("Invalid Stock Symbol : recieved empty object - reseting form");

  //       resetFormInputs();

  //     } else if(Object.keys(data["Global Quote"]).length > 0){  
  //         setCurrentPrice(data["Global Quote"]["05. price"]);        
  //     }
  //    })
  // ]
  // ,[formSubmitted, userStock])



// COMMENT - this code is to be used when fetching from demo API
// have to check for "Information" key as that is in the JSON file of the AlphaVantage demo message
// but should use the code above when you get the API key when the daily limit resets

  if(data["Information"]) { 

    console.error("Invalid Stock Symbol Received AlphaVantage demo message- reseting form"); // this is to test logic with the demo key
    resetFormInputs();

  } else if(Object.keys(data["Global Quote"]).length > 0) {
    setCurrentPrice(data["Global Quote"]["05. price"]);
    console.log(`Current price has been set to ${data["Global Quote"]["05. price"]}`)        
  }
    
 })
]
,[formSubmitted, userStock])



 return (
  <>
    <form onSubmit={handleSubmit} value={formSubmitted} className='h-full flex flex-col items-center font-title font-light'>

        <div className="h-[7.5em] mt-8 w-full flex flex-col justify-evenly items-center my-3" id="input-container">

          <input className="h-[1.7rem] w-[9em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={userStock}
          onChange={(event) => setUserStock(event.target.value.toLocaleUpperCase())} //Prevent cases of lower case Stock Symbols being submitted
          type="text"
          id="stock"
          name="stock"
          placeholder="Stock Symbol"
          required ></input>

          <input className=" h-[1.7rem] w-[9em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={userQuantity}
          onChange={(event) => setUserQuantity(event.target.value)}
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Quantity"
          required  ></input>

          <input className="h-[1.7rem] w-[9em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={userPurchase}
          onChange={(event) => setUserPurchase(event.target.value)}
          type="number"
          id="price"
          name="price"
          placeholder="Purchase Price"
          required ></input>

        </div>

        <div className="size-full flex justify-center items-center">

          <input className="h-8 w-[8rem] text-[0.75rem] font-bold text-white rounded-[5em]"
          type="submit" value="Add Stock" id="submitBtn"/>

        </div>

    </form>
  </>
 )
}


function StockContainer() {

  const {formSubmitted, currentPrice} = useContext(StockDataContext);
  const [isEmpty, setIsEmpty] = useState(true);

useEffect(() => {
  if(formSubmitted && currentPrice) {
      setIsEmpty(false);  
  }    
}, [currentPrice])

  return (
    <>
      <section className="font-title h-full bg-[#4a4e69] rounded-b-[35px] pt-3"> 
        <h2 id="subheading" className="text-[1.1rem] w-full text-center text-white font-bold">Stock List</h2>
        <div className="h-full mb-10 flex justify-center">
          {isEmpty ?  <StockListsEmpty /> : <StockLists />}
        </div>  
      </section>
    </>
  )
  
}


export default App


