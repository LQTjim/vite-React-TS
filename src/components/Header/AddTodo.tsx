import { useState } from "react";

import { addTodo } from "../../features/todo/todoSlice";
import { useAppDispatch } from "@/redux/hooks";
function AddTodo() {
  const dispatch = useAppDispatch();
  const [todoTitle, setTodoTitle] = useState("");
  return (
    <div className="w-full flex my-5">
      <span className="whitespace-nowrap">新增代辦事項 :</span>
      <label className="ml-2 w-full">
        <input
          className="rounded-md text-zinc-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full shrink"
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
    </div>
  );
}

export default AddTodo;
