import React, { Fragment, useState } from "react";
import { formatDistance } from "date-fns";
import tw from "date-fns/locale/zh-TW";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import {
  changeIsCompleted,
  updateTodo,
  deleteTodo,
} from "../../features/todo/todoSlice";
function Item({ id, title, completed, timeStamp }: todo) {
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  function changeIsUpdate() {
    setIsUpdate(!isUpdate);
  }
  function updateTodoHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      dispatch(updateTodo({ id, title: (e.target as HTMLInputElement).value }));
      (e.target as HTMLInputElement).value = "";
      changeIsUpdate();
      return;
    } else {
      return;
    }
  }

  return (
    <Fragment>
      {isUpdate ? (
        <li className="flex mt-1 w-full">
          <input
            className="bg-slate-200 rounded-md text-zinc-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full indent-5 py-2"
            onKeyUp={updateTodoHandler}
            type="text"
            onBlur={changeIsUpdate}
            autoFocus
          />
        </li>
      ) : (
        <li className="flex mt-1 p-5 rounded-md hover:bg-slate-100 hover:shadow-[0_10px_10px_-15px_black]">
          <label
            className={`${
              completed ? "line-through text-gray-400" : ""
            } w-1/3 text-left ml-1 cursor-pointer`}
          >
            <input
              type="checkbox"
              className="mr-5"
              checked={completed}
              onChange={() => {
                dispatch(changeIsCompleted(id));
              }}
            />

            {title}
          </label>
          <span
            className="w-1/3 text-right self-center"
            title={timeStamp.toLocaleString("zh-TW", {
              timeZone: "Asia/Taipei",
            })}
          >
            {formatDistance(timeStamp, Date.now(), {
              addSuffix: true,
              locale: tw,
            })}
          </span>

          <div
            className="w-1/3 font-bold min-w-fit
 text-right self-center"
          >
            <Link
              to={`/${id}`}
              state={{ from: location, id, title, completed, timeStamp }}
            >
              <button className="bg-teal-400 hover:bg-teal-700 rounded-full py-1 px-4  ">
                詳細
              </button>
            </Link>
            <button
              className="mx-2 bg-green-400 hover:bg-green-700 rounded-full py-1 px-4"
              onClick={changeIsUpdate}
            >
              修改
            </button>
            <button
              className="font-bold
              bg-red-600 hover:bg-red-900  rounded-full py-1 px-4"
              onClick={() => {
                dispatch(deleteTodo(id));
              }}
            >
              刪除
            </button>
          </div>
        </li>
      )}
    </Fragment>
  );
}

export default Item;
