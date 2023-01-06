import React, { Fragment, useState } from "react";
import { formatDistance, fromUnixTime } from "date-fns";
import { useAppDispatch } from "../redux/hooks";
import {
  changeIsCompleted,
  updateTodo,
  deleteTodo,
} from "../features/todo/todoSlice";
import type { todo } from "../features/todo/todoSlice";
import { Link, useLocation } from "react-router-dom";

type ItemProps = todo;
function Item(props: ItemProps) {
  const { id, title, isCompleted, timeStamp } = props;
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  function changeIsUpdate() {
    setIsUpdate(!isUpdate);
  }
  //TODO 這邊應該存在更好的寫法 可以不用as斷言的方法
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
        <input
          className="bg-slate-200 rounded-md text-zinc-800 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onKeyUp={updateTodoHandler}
          type="text"
          onBlur={changeIsUpdate}
          autoFocus
        />
      ) : (
        <li className="flex mt-1">
          <label className="w-1/3 text-left ml-1">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => {
                dispatch(changeIsCompleted(id));
              }}
            />

            {title}
          </label>
          <span
            className="w-1/3 text-right"
            title={timeStamp.toLocaleString("zh-TW", {
              timeZone: "GMT",
            })}
          >
            {formatDistance(timeStamp, Date.now(), {
              addSuffix: true,
            })}
          </span>

          <div
            className="w-1/3 font-bold min-w-fit
 text-right"
          >
            <Link
              to={`/${id}`}
              state={{ from: location, id, title, isCompleted, timeStamp }}
            >
              <button className="bg-teal-400 rounded p-1">詳細</button>
            </Link>
            <button
              className="mx-1 bg-green-400 rounded p-1"
              onClick={changeIsUpdate}
            >
              修改
            </button>
            <button
              className="font-bold
              bg-red-600 rounded p-1"
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
