import { data } from "./Data";
import "./App.css";
import { Item } from "./components/Item";
import { useState } from "react";

function App() {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = (e)=>{
    e.preventDefault();

    console.log(title);
    console.log(date);
  }

  return (
    <div className="h-screen w-screen bg-blue-500 flex flex-col justify-center items-center">

      <div>
        {
          data.map((item,index)=>{
            return (
              <Item
                key={index}
                title={item.title}
                year={item.year}
                month={item.month}
                day={item.day}
              />
            )
          })
        }
      </div>

      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 mt-5"
      >

        <input
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder='Enter the title'
          className='rounded-lg p-2 text-black'
        />

        <input
          onChange={(e)=>setDate(e.target.value)}
          value={date}
          type="date"
          className='rounded-lg p-2 text-black'
        />

        <button
          type="submit"
          className='mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Submit
        </button>

      </form>
    </div>
  );
}

export default App;