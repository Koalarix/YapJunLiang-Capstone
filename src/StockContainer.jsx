import { useState } from "react";
import StockLists from "./StockLists";
import StockListsEmpty from "./StockListsEmpty";

//Component for conditionally rendering

function StockContainer({StockData}) {

  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <>
      <section className="font-title h-full"> 
        <h2 className="text-[1.1rem] w-full text-center text-white font-bold">Stock List</h2>
        <div className="h-full flex justify-center">
          {isEmpty ?  <StockListsEmpty /> : <StockLists StockData={StockData} />}
        </div>  
      </section>
    </>
  )
}

export default StockContainer