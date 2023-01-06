//TODO 考慮用momentjs 這個繁中支援有點差

import { useAppSelector } from "../redux/hooks";
import Item from "./Item";

function List() {
  const todos = useAppSelector((state) => state.todosReducer);

  return (
    <ul className="w-full">
      {todos.map((todo) => (
        <Item {...todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default List;
