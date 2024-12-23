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
 
  //check state of form and store infomation
  const [formData, setFormData] = useState({
    stock:"",
    quantity:"",
    purchase:"",
    currentPrice:""
  })

  //check state of form submission
  const [formSubmitted, setFormSubmitted] = useState(false)

  //check state of stock symbol input validation
  const [stockValid, setStockValid] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
  }

// reset form to default
  const resetForm = () => {
    if (formSubmitted === true) {
    setFormSubmitted(false)  
    setFormData({...formData,
      stock:"",
      quantity:"",
      purchase:""
    })
    setStockValid(false)
    }
  }

useEffect(() => {
   fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo")
    .then((res) => res.json())
    .then((data) => {

      //renaming specific data points from API for easier use
      const globalQuote = data["Global Quote"]
      const stockSymbol = globalQuote["01. symbol"]
      const price = globalQuote["05. price"]

         if (formSubmitted === true) {
            for (data in globalQuote) {
              if (formData.stock === stockSymbol) {
                setStockValid(true);
                setFormData({...formData, currentPrice: {price}});
                console.log(`Current Price: ${price}`);
                console.log(`Form Submitted with user data ${formData.stock}, ${formData.quantity}, ${formData.purchase} and API data here: ${formData.currentPrice}`)
                break;

              } else if (formSubmitted === true && formData.stock !== stockSymbol) {
                console.log("Stock not found")//Possiblity to add display validation alert to user
                break;
              }
            }
          } 
        })
    .catch((err) => console.log("Error occured retrieving data"))
    .finally(resetForm) //Call external function to execute after getting data, to reset inputs back into empty & FormSubmitted back to false

}, [formSubmitted, setFormData])

 return (
  <>
    <form onSubmit={handleSubmit} value={formSubmitted} className='h-full flex flex-col items-center font-title font-light'>

        <div className="h-[5.5em] mt-8 w-full flex flex-col justify-center items-center" id="input-container">

          <input className="h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={formData.stock}
          onChange={(event) => setFormData({...formData, stock: event.target.value})}
          type="text"
          id="stock"
          name="stock"
          placeholder="Stock Symbol"></input>

          <input className=" h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={formData.quantity}
          onChange={(event) => setFormData({...formData, quantity: event.target.value})}
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Quantity" ></input>

          <input className="h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em]"
          value={formData.purchase}
          onChange={(event) => setFormData({...formData, purchase: event.target.value})}
          type="text"
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


//* Consider implementing conditional rendering to switch between
// displaying the StockListsEmpty and StockLists components.
// For example, you can use a ternary operator or logical conditions
//  to decide which component to render based on the state of the stock list.

// Fetch the current stock prices from the API when the component mounts and
// whenever the stock list is updated.


