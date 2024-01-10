import { useEffect, useState } from "react";
import Loading from "./Loading";
import Tour from "./Tour";
import Tours from "./Tours";

const url = 'https://course-api.com/react-tours-project';

const App = () => 
{
  
  const[isLoading,setIsLoading]=useState(true); //isLoading value is set as true
  const[tours,setTours]=useState([]); //tours value is empty which means the value is set as false

const removeTour = (id)=>
{
  //filter out the remaining data based on the tours that were removed by the user
  const newToursList = tours.filter((tour)=>tour.id!==id);
  setTours(newToursList);
}


const fetchTours= async()=>
{
  setIsLoading(true)
  try
  {
    const response=await fetch(url);
    const tours=await response.json();
    console.log(tours);
    setTours(tours);
  }
  catch(error)
  {
    console.log(error);
  }
  setIsLoading(false);
};


  useEffect(()=>
  {
    fetchTours();
  },[]);

  if(isLoading)
  {
    return(
    <main>
        <Loading />
    </main>
    
    );
  }

  if(tours.length ===0)
  {
    return(
      <main>
          <div className="title">
              <h2>No tours left</h2>
              <button type='button' style={{marginTop:'2rem'}} className='btn' onClick={fetchTours}>Fetch Tours</button>
          </div>
      </main>
      );

  }

  return(
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
