import { useState } from "react"

// function StockLists(StockData) {

//   const [stockContext, setStockContext] = useState("")
  
//   return (
//   <div className="bg-[#5e6381] w-[80%] h-[12rem] mb-10 pt-0 text-center rounded-md border border-[#969ab6] flex justify-center items-center">
//     <section id="stocklistblock" className="h-full w-100 flex flex-col justify-center items-center pb-[1.5em] text-[#afb2c4] text-[0.68rem]">
//       <h3 className="text-[1.35em] text-white font-bold">Symbol: IBM </h3>
//       <p>Quantity: 100</p>
//       <p>Purchase Price: 500</p>
//       <p>Current Price: 1000</p>
//       <h3 className="profit-loss">Profit/Loss: +100</h3>
//    </section>
//   </div>
  
//   )
// }
// export default StockLists

//1 Component to recieve props from user input & API data. 
// recieve Stock Symbol, Quantity, Purchase Price, Current Price
// Component must have calcuation for Profit/Loss with conditional rendering for color depending if its positive or negative
//



function StockLists() {

  const stockDemo = {
    stock:"IBM",
    quantity:"20",
    purchase:"50",
    currentPrice:"221.9300"
  }

  const profitOrLoss = (stockDemo.quantity*stockDemo.currentPrice)-(stockDemo.quantity*stockDemo.purchase)
   
  return (
  <div className="bg-[#5e6381] w-[80%] h-[12rem] mb-10 pt-0 text-center rounded-md border border-[#969ab6] flex justify-center items-center">
    <section id="stocklistblock" className="h-full w-100 flex flex-col justify-center items-center pb-[1.5em] text-[#afb2c4] text-[0.68rem]">
      <h3 className="text-[1.35em] text-white font-bold">Symbol: {stockDemo.stock} </h3>
      <p>Quantity: {stockDemo.quantity}</p>
      <p>Purchase Price: {stockDemo.purchase}</p>
      <p>Current Price: {stockDemo.currentPrice}</p>
      <h3 className={
        `profit-loss ${profitOrLoss > 0 ? "text-[#38FF92]" : "text-red-400"}`
        }>Profit/Loss: {profitOrLoss.toFixed(2)}</h3>
   </section>
  </div>
  
  )
}
export default StockLists


//* The implementation of the StockLists component could be improved. 
// Consider using props to pass values for each list item, 
// and use the .map() function to dynamically generate the items. 
// This approach aligns with React best practices and makes the code more scalable.

//State Management: Use the useState hook to manage the state of the stock list. 
// Create a StockContext to store the stock list and provide it to the necessary components using the useContext hook.