import './App.css'
import './StockListsEmpty.jsx'

function App() {
  return (
    <>
    <div className='h-full'>
      <div className="h-[16em] flex flex-col">
          <Header />
          <Form/>
      </div>
      <div className="h-[35em]"> 
        <StockDetails />
      </div>
    </div>
 
    </>
  )
}

function Header() {
  return (
    <header>
    <h1 className='text-[2.3em] pt-6 pb-4 font-title font-bold text-white text-center'>Finance Dashboard</h1>
    </header>
  )
}

function Form() {
 return (
  <>
    <form  className='h-full flex flex-col items-center font-title font-light'>

        <div  className="h-[5.5em] mt-2 flex justify-center items-center">
          <input className="h-9 w-[10em] mx-2 pl-3 placeholder:italic" 
          type="text" id="stock" name="stock" placeholder="Stock Symbol"></input>

          <input className=" h-9 w-[10em] mx-2 pl-3 placeholder:italic" 
          type="text" id="quantity" name="quantity" placeholder="Quantity" ></input>

          <input className="h-9 w-[10em] mx-2 pl-3 placeholder:italic" 
          type="text" id="price" name="price" placeholder="Purchase Price"></input> 
        </div>

        <input className="h-10 w-[12em] font-bold text-white rounded-[5em] border-none bg-[#fca311] 
        hover:border-none hover:bg-[#f19040ea] cursor-pointer" 
        type="submit" value="Add Stock"/>

    </form>
  </>
 )
}

function StockDetails() {
  return (
    <>
      <section className="mt-8 flex flex-col items-center font-title"> 
        <h2 className="text-[1.6em] text-white font-bold m-3">Stock List</h2>
        <StockListsEmpty />  
      </section>
    </>
  )
}


function StockListsEmpty() {
  return (
  <div className="bg-[#5e6381] w-[35em] h-[8em] text-center rounded-md border border-[#969ab6] flex justify-center items-center">
    <p className="text-[#9aa0bb]">No stocks added yet.</p>
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
