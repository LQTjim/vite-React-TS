import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { deleteCompleteTodo, deleteAllTodo } from "../features/todo/todoSlice";

function Footer() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todosReducer);
  const completedTodos = todos.filter((todo) => {
    return todo.isCompleted === true;
  });

  return (
    <>
      <div className="mt-2 flex w-full">
        {todos.length === 0 ? (
          <div className="w-full text-center text-red-600">請新增任務</div>
        ) : (
          <>
            <span className="w-1/4 text-center">
              已完成{completedTodos.length}個任務
            </span>
            <span className="w-1/4 text-center">共{todos.length}個任務</span>
            <button
              onClick={() => {
                dispatch(deleteCompleteTodo());
              }}
              className="w-1/4 text-center font-bold
              bg-red-600 rounded p-1"
            >
              刪除已完成任務
            </button>
            <button
              onClick={() => {
                dispatch(deleteAllTodo());
              }}
              className="w-1/4 ml-2 font-bold
              text-center bg-red-600 rounded p-1"
            >
              刪除全部任務
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Footer;
