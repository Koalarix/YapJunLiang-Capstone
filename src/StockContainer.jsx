import { useContext, useEffect, useState } from "react";
import StockLists from "./StockLists";
import StockListsEmpty from "./StockListsEmpty";
import StockDataContext from "./contexts/StockdataContext";

//Component for conditionally rendering

function StockContainer() {

  const {formSubmitted} = useContext(StockDataContext);

  const [isEmpty, setIsEmpty] = useState(true);


useEffect(() => {
  if(formSubmitted) {
    setTimeout(() => {
      setIsEmpty(false); 
    },500)
  
  }    
}, [formSubmitted])

  return (
    <>
      <section className="font-title h-full"> 
        <h2 className="text-[1.1rem] w-full text-center text-white font-bold">Stock List</h2>
        <div className="h-full flex justify-center">
          {isEmpty ?  <StockListsEmpty /> : <StockLists />}
        </div>  
      </section>
    </>
  )
  
}

export default StockContainer