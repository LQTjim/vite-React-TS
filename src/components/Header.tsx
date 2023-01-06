import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";

import { addTodo } from "../features/todo/todoSlice";

function Header() {
  const dispatch = useAppDispatch();
  const [todoTitle, setTodoTitle] = useState("");
  return (
    <label>
      增加新的任務 :
      <input
        className="ml-2 bg-slate-200 rounded-md text-zinc-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        value={todoTitle}
        onChange={(e) => {
          setTodoTitle(e.target.value.trim());
        }}
        onKeyUp={(e) => {
          if (!todoTitle.trim()) {
            return;
          }
          if (e.key === "Enter") {
            dispatch(addTodo(todoTitle));
            setTodoTitle("");
          } else return;
        }}
      />
    </label>
  );
}

export default Header;
