import './App.css'
import StockListsEmpty from './StockListsEmpty.jsx'
import StockLists from './StockLists.jsx'
import { useEffect, useState } from 'react'

function App() {
  return (
    <>
    <div className="h-dvh w-full flex justify-center items-center">
      <div className='w-[60%] min-w-[18em] max-w-[50em] max-h-[60em] rounded-[35px] bg-[#4a4e69] shadow-lg'>
        <div className="h-[16em] flex flex-col">
          <Header />
          <Form/>
        </div>
          <StockDetails />
      </div>
    </div>
 
    </>
  )
}

function Header() {
  return (
    <header className="flex flex-col items-center">
    <h1 className='w-full text-[1.25rem] [@media(min-width:750px)]:text-[2.3em] pt-6 pb-4 font-title font-bold text-white text-center'>Finance Dashboard</h1>
    <hr className="w-[90%]"></hr>
    </header>
  )
}

function Form() {

  const [stock, setStock] = useState("")

  const [quantity, setQuanitity] = useState("")

  const [purchase, setPurchase] = useState("")

  const createNewStock = () => {
    setIsEmpty(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(stock, quantity, purchase)
    setStock("");
    setQuanitity("");
    setPurchase("");
  }

  useEffect(() => {
    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo")
    .then((res) => res.json())
    .then((data) => {
      const globalQuote = data["Global Quote"]
      console.log(globalQuote)
    })

    .catch((err) => console.log("Error occured retrieving data"))
  },[handleSubmit])


 return (
  <>
    <form  onSubmit={handleSubmit} className='h-full flex flex-col items-center font-title font-light'>

        <div className="h-[5.5em] mt-8 w-full flex flex-col justify-center items-center [@media(min-width:750px)]:flex-row">
          <input className="h-9 w-[10em] min-w-0 mx-2 [@media(min-width:750px)]:ml-4 pl-3 placeholder:italic placeholder:text-[0.8em] [@media(min-width:750px)]:placeholder:text-[1em]"
          value={stock} onChange={(event) => setStock(event.target.value)} type="text" id="stock" name="stock" placeholder="Stock Symbol"></input>

          <input className=" h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em] [@media(min-width:750px)]:placeholder:text-[1em]" 
          value={quantity} onChange={(event) => setQuanitity(event.target.value)} type="text" id="quantity" name="quantity" placeholder="Quantity" ></input>

          <input className="h-9 w-[10em] min-w-0 mx-2 [@media(min-width:750px)]:mr-4 pl-3 placeholder:italic placeholder:text-[0.8em] [@media(min-width:750px)]:placeholder:text-[1em]" 
          value={purchase} onChange={(event) => setPurchase(event.target.value)} type="text" id="price" name="price" placeholder="Purchase Price"></input> 
        </div>
        <div className="size-full flex justify-center items-center">

          <input className="h-8 w-[8rem] text-[0.75rem] font-bold text-white rounded-[5em] bg-[#fca311] 
          border-none hover:border-none hover:bg-[#f19040ea] cursor-pointer
          [@media(min-width:750px)]:w-[12rem] [@media(min-width:750px)]:h-[38px] [@media(min-width:750px)]:text-[1rem]" 
          type="submit" value="Add Stock"/>

        </div>

    </form>
  </>
 )
}

function StockDetails() {

  const [isEmpty, setIsEmpty] = useState(true);

  return (
    <>
      <section className="font-title h-full"> 
        <h2 className="text-[1.1rem] [@media(min-width:750px)]:text-[1.6em] w-full text-center text-white font-bold">Stock List</h2>
        <div className="h-full flex justify-center">
          {isEmpty ?  <StockListsEmpty /> : <StockLists />}
        </div>  
      </section>
    </>
  )
}


export default App


//* Consider implementing conditional rendering to switch between 
// displaying the StockListsEmpty and StockLists components. 
// For example, you can use a ternary operator or logical conditions
//  to decide which component to render based on the state of the stock list.