import { ChangeEvent, useState } from "react";
import TypeAhead from "./TypeAhead";

function SearchTodo() {
 
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
  
    }
  };
  return (
    <div className="w-full flex mt-5">
      <span className="whitespace-nowrap">搜尋代辦事項 : </span>
      <label className="ml-2 w-full relative">
        <input
          type="text"
          className=" rounded-md text-zinc-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full shrink"
          onChange={handleQueryChange}
          onKeyDown={keyHandler}
        />
        <TypeAhead
          result={[
            {
              userId: 1,
              id: "sdfasdaf",
              title: "測試用",
              completed: true,
              timeStamp: new Date(),
            },
            {
              userId: 1,
              id: "dfasdaf1",
              title: "測試用1",
              completed: true,
              timeStamp: new Date(),
            },
          ]}
        />
      </label>
    </div>
  );
}

export default SearchTodo;
