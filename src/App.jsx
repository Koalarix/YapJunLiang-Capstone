import './App.css'
import './StockListsEmpty.jsx'

function App() {
  return (
    <>
    <div class="h-dvh w-full flex justify-center items-center border border-red-600">
      <div className='w-[60%] min-w-[18em] max-w-[50em] max-h-[60em] rounded-[35px] bg-[#4a4e69] shadow-lg border border-yellow-300'>
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
 return (
  <>
    <form  className='h-full flex flex-col items-center font-title font-light'>

        <div  className="h-[5.5em] mt-8 w-full flex flex-col justify-center items-center [@media(min-width:750px)]:flex-row">
          <input className="h-9 w-[10em] min-w-0 mx-2 [@media(min-width:750px)]:ml-4 pl-3 placeholder:italic placeholder:text-[0.8em] [@media(min-width:750px)]:placeholder:text-[1em]" 
          type="text" id="stock" name="stock" placeholder="Stock Symbol"></input>

          <input className=" h-9 w-[10em] min-w-0 mx-2 pl-3 placeholder:italic placeholder:text-[0.8em] [@media(min-width:750px)]:placeholder:text-[1em]" 
          type="text" id="quantity" name="quantity" placeholder="Quantity" ></input>

          <input className="h-9 w-[10em] min-w-0 mx-2 [@media(min-width:750px)]:mr-4 pl-3 placeholder:italic placeholder:text-[0.8em] [@media(min-width:750px)]:placeholder:text-[1em]" 
          type="text" id="price" name="price" placeholder="Purchase Price"></input> 
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
  return (
    <>
      <section className="font-title h-full"> 
        <h2 className="text-[1.1rem] [@media(min-width:750px)]:text-[1.6em] w-full text-center text-white font-bold">Stock List</h2>
        <div className="h-full flex justify-center">
          <StockListsEmpty />
        </div>  
      </section>
    </>
  )
}


function StockListsEmpty() {
  return (
  <div className="bg-[#5e6381] w-[80%] h-[12rem] mb-10 text-center rounded-md border border-[#969ab6] flex justify-center items-center">
    <p className="text-[#9aa0bb] text-[0.75rem] [@media(min-width:750px)]:text-[1em]">No stocks added yet.</p>
  </div>
  )
}


function StockLists() {
  return (
  <div>
    <h3>Symbol:</h3>
    <p>Quantity:</p>
    <p>Purchase Price:</p>
    <p>Current Price:</p>
  </div>
  )
}


export default App
