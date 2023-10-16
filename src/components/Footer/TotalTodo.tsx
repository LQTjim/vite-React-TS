import {
  deleteCompleteTodos,
  deleteAllTodos,
  TodosState,
} from "@/features/todo/todoSlice";
import { useAppDispatch } from "@/redux/hooks";

function TotalTodo({ todos, loading }: TodosState) {
  const dispatch = useAppDispatch();
  const completedTodos = todos.filter((todo) => {
    return todo.completed === true;
  });
  return (
    <div className="mt-2 flex w-full">
      {loading === "pending" ? (
        <div>載入中...</div>
      ) : todos.length === 0 ? (
        <div className="w-full text-center text-red-600">請新增代辦事項</div>
      ) : (
        <>
          <span className="w-1/4 text-center">
            已完成{completedTodos.length}個代辦事項
          </span>
          <span className="w-1/4 text-center">共{todos.length}個代辦事項</span>
          <button
            onClick={() => {
              dispatch(deleteCompleteTodos());
            }}
            className="w-1/4 text-center font-bold
          bg-red-600 hover:bg-red-900 
          rounded-full p-1"
          >
            刪除已完成代辦事項
          </button>
          <button
            onClick={() => {
              dispatch(deleteAllTodos());
            }}
            className="w-1/4 ml-2 font-bold
          text-center bg-red-600 hover:bg-red-900 rounded-full p-1"
          >
            刪除全部代辦事項
          </button>
        </>
      )}
    </div>
  );
}

export default TotalTodo;
