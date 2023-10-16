import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import List from "./components/List/List";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  fakeFetchTodosThunk,
  fetchTodosThunk,
} from "./features/todo/todoSlice";
export type Filter = "全部" | "已完成" | "未完成";
function App() {
  const [filter, setFilter] = useState<Filter>("全部");
  const todosState = useAppSelector((state) => state.todosReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (todosState.todos.length === 0) {
      /*  dispatch(fakeFetchTodosThunk()); */
      dispatch(fetchTodosThunk());
    }
  }, []);
  const displayTodoState = useMemo(() => {
    switch (filter) {
      case "全部":
        return todosState;
      case "未完成":
        return {
          ...todosState,
          todos: todosState.todos.filter((todo) => todo.completed !== true),
        };
      case "已完成":
        return {
          ...todosState,
          todos: todosState.todos.filter((todo) => todo.completed === true),
        };

      default:
        throw Error("error occur");
    }
  }, [todosState, filter]);
  return (
    <div className="container mx-auto w-1/2 mt-80 flex flex-col justify-center  items-center rounded-md shadow-lg shadow-black bg-slate-200 p-5">
      <Header setFilter={setFilter}filter={filter} />
      {/* <List {...todosState} /> */}
      <List {...displayTodoState} />
      <Footer {...todosState} />
    </div>
  );
}

export default App;
