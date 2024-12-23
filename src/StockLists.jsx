
function StockLists(StockData) {
  
  return (
  <div className="bg-[#5e6381] w-[80%] h-[12rem] mb-10 pt-0 text-center rounded-md border border-[#969ab6] flex justify-center items-center">
   <StockListBlock StockData={StockData}/>
  </div>
  
  )
}


function StockListBlock({StockData}) {


  return (
    <section id="stocklistblock" className="h-full w-100 flex flex-col justify-center items-center pb-[1.5em] text-[#afb2c4] text-[0.68rem]">
      <h3 className="text-[1.35em] text-white font-bold">{`Symbol: ${StockData}`}</h3>
      <p>Quantity: 100</p>
      <p>Purchase Price: 500</p>
      <p>Current Price: 1000</p>
      <h3 className="profit-loss">Profit/Loss: +100</h3>
  </section>
  )
}
export default StockLists

//* The implementation of the StockLists component could be improved. 
// Consider using props to pass values for each list item, 
// and use the .map() function to dynamically generate the items. 
// This approach aligns with React best practices and makes the code more scalable.