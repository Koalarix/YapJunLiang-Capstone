import './App.css'
import { useContext, useEffect, useState } from 'react'
import StockDataContext from './contexts/StockdataContext.js'
import StockListsEmpty from './StockListsEmpty.jsx';
import StockLists from './StockLists.jsx';

//For simplifying all the input details, to try when there is time
//https://www.youtube.com/watch?v=-KBS93RlUCY

function App() {
  const [userStock, setUserStock] = useState("");
  const [userQuantity, setUserQuantity] = useState("");
  const [userPurchase, setUserPurchase] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false)
  
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
              formSubmitted, setFormSubmitted
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
      <h1 className='w-full text-[1.25rem] pt-6 pb-4 font-title font-bold text-white text-center'>Finance Dashboard</h1>
      <hr className="w-[90%]"></hr>
    </header>
  )
}

function Form() {
 
  const {
    userStock, setUserStock,
    userQuantity, setUserQuantity,
    userPurchase, setUserPurchase,
    currentPrice, setCurrentPrice,
    formSubmitted, setFormSubmitted
  } = useContext(StockDataContext);

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
  }

  function resetFormInputs() {
    setUserStock("")
    setUserQuantity("")
    setUserPurchase("")
    setFormSubmitted(false)
  }


useEffect(() => {
  if(formSubmitted) {
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ userStock +"&apikey=demo")
     .then((res) => res.json())
     .then((data) => {
      setCurrentPrice(data["Global Quote"]["05. price"])
     })
     .catch(error => {
      console.log("Invalid Stock Symbol - reseting form");
      resetFormInputs();
    })

    }
 }, [formSubmitted])

 // for me to check if the API data is logged into the state // can be deleted when deploying
 useEffect(() => {
  console.log(`This is to check if it logged into state, Current Price is: ${currentPrice}`);
}, [currentPrice]);


 return (
  <>
    <form onSubmit={handleSubmit} value={formSubmitted} className='h-full flex flex-col items-center font-title font-light'>

        <div className="h-[5.5em] mt-8 w-full flex flex-col justify-center items-center" id="input-container">

          <input className="h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={userStock}
          onChange={(event) => setUserStock(event.target.value.toLocaleUpperCase())} //Prevent cases of lower case Stock Symbols being submitted
          type="text"
          id="stock"
          name="stock"
          placeholder="Stock Symbol"></input>

          <input className=" h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={userQuantity}
          onChange={(event) => setUserQuantity(event.target.value)}
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Quantity" ></input>

          <input className="h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={userPurchase}
          onChange={(event) => setUserPurchase(event.target.value)}
          type="number"
          id="price"
          name="price"
          placeholder="Purchase Price"></input>

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
  if(formSubmitted &&  currentPrice) {
    setTimeout(() => {
      setIsEmpty(false); 
    },500)
  
  }    
}, [currentPrice])

  return (
    <>
      <section className="font-title h-full"> 
        <h2 className="text-[1.1rem] w-full text-center text-white font-bold">Stock List</h2>
        <div className="h-full mb-10 flex justify-center">
          {isEmpty ?  <StockListsEmpty /> : <StockLists />}
        </div>  
      </section>
    </>
  )
  
}


export default App


// Fetch the current stock prices from the API when the component mounts and
// whenever the stock list is updated.


