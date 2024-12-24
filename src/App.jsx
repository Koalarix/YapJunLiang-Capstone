import './App.css'
import StockListsEmpty from './StockListsEmpty.jsx'
import StockLists from './StockLists.jsx'
import { useEffect, useState } from 'react'
import StockContainer from './StockContainer.jsx'

function App() {
  return (
    <>
    <div className="h-dvh w-full flex justify-center items-center">
      <div className='w-[60%] min-w-[18em] max-w-[50em] max-h-[60em] rounded-[35px] bg-[#4a4e69] shadow-lg'>
        <div className="h-[16em] flex flex-col">
          <Header />
          <Form/>
        </div>
          <StockContainer />
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
 
  const [userStock, setUserStock] = useState("")
  const [userQuant, setUserQuant] = useState("")
  const [userPurchase, setUserPurchase] = useState("")
  const [currentPrice, setCurrentPrice] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
  }

useEffect(() => {
  if(formSubmitted) {
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ userStock +"&apikey=demo")
     .then((res) => res.json())
     .then((data) => {
      const currPrice = data["Global Quote"]["05. price"]
      setCurrentPrice(currPrice)
     })
     .catch(error => {console.log("Invalid Stock Symbol" + " " + error)})
     .finally(() => {setFormSubmitted(false)})
    }
 }, [formSubmitted])

 // for me to check if the data is logged into the state // can be deleted when deploying
 useEffect(() => {
  console.log(`This is to check if it logged into state, Current Price is: ${currentPrice}`);
}, [currentPrice]);


 return (
  <>
    <form onSubmit={handleSubmit} value={formSubmitted} className='h-full flex flex-col items-center font-title font-light'>

        <div className="h-[5.5em] mt-8 w-full flex flex-col justify-center items-center" id="input-container">

          <input className="h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={userStock}
          onChange={(event) => setUserStock(event.target.value)}
          type="text"
          id="stock"
          name="stock"
          placeholder="Stock Symbol"></input>

          <input className=" h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={userQuant}
          onChange={(event) => setUserQuant(event.target.value)}
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



export default App

//* Consider breaking the header section and input section into separate components as well.
// Similarly, StockListsEmpty and StockLists components should be placed in different files to enhance code organization and maintainability. 
// This makes it easier to debug and reuse individual components.

//* Consider implementing conditional rendering to switch between
// displaying the StockListsEmpty and StockLists components.
// For example, you can use a ternary operator or logical conditions
//  to decide which component to render based on the state of the stock list.

// Fetch the current stock prices from the API when the component mounts and
// whenever the stock list is updated.


