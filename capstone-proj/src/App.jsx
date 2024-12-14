import './App.css'

function App() {

  return (
    <>
    <header className="flex justify-center">
      <h1 className='mt-5 text-4xl font-title font-bold'>Finance Dashboard</h1>
    </header>

    <form>
      <div className="flex flex-wrap justify-center my-8 py-5 border font-title font-light">
        <input className="mx-2 my-2 h-10 placeholder:italic placeholder:pl-3" 
        type="text" id="stock" name="stock" placeholder="Stock Symbol"></input>

        <input className="mx-2 my-2 h-10 placeholder:italic placeholder:pl-3" 
        type="text" id="quantity" name="quantity" placeholder="Quantity" ></input>

        <input className="mx-2 my-2 h-10 placeholder:italic placeholder:pl-3" 
        type="text" id="price" name="price" placeholder="Purchase Price"></input>

        <input className="mx-2 my-2 py-2 bg-blue-500 hover:bg-blue-700 font-bold text-white px-5 rounded-xl cursor-pointer" 
        type="submit" value="Add Stock"/>
      </div>  
    </form>

    <section className="mt-8 flex flex-col items-center font-title">
      <h2 className="text-2xl font-bold m-3">Stock List</h2>
      <StockListsEmpty />  
    </section>
    </>
  )
}

function StockListsEmpty() {
  return (
  <div>
    <p>No stocks added yet.</p>
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
