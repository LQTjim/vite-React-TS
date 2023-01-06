import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

export interface todo {
  id: string;
  title: string;
  isCompleted: boolean;
  timeStamp: Date;
}
export type TodosState = todo[] | [];

type todoId = string;
type todoTitle = string;
//在此初始陣列為obj,須以 state.todos=...
//或者state.splice(...)等方法

const initialState = [
  {
    id: nanoid(),
    title: "吃飯",
    isCompleted: false,
    timeStamp: new Date("2022/12/28 ,12:17:40"),
  },
  {
    id: nanoid(),
    title: "睡覺",
    isCompleted: false,
    timeStamp: new Date("2022/12/1 ,20:17:40"),
  },
  {
    id: nanoid(),
    title: "打咚咚",
    isCompleted: true,
    timeStamp: new Date("2022/12/12 ,20:17:40"),
  },
];

export const todosSlice = createSlice({
  name: "todos",
  //若此處直接 initialState=[...]則可用return 的方式覆寫陣列
  initialState,
  reducers: {
    test: (state) => {
      console.log(state);
    },
    addTodo: (state, action: PayloadAction<todoTitle>) => {
      state.unshift({
        id: nanoid(),
        title: action.payload,
        isCompleted: false,
        timeStamp: new Date(),
      });
    },
    //TODO 可以考慮把changeIsCompleted的邏輯寫在一起
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      state.forEach((todo: todo, index) => {
        if (action.payload.id === todo.id) {
          //要透過"屬性"去修改才能保持PROXY存在
          //不然就等於"傳址"
          state[index] = {
            ...state[index],
            title: action.payload.title,
          };
        }
      });
    },
    deleteTodo: (state, action: PayloadAction<todoId>) => {
      //這樣會丟失PROXY
      return [
        ...state.filter((todo) => {
          return todo.id !== action.payload;
        }),
      ];
      // state.splice(
      //   state.findIndex((todo) => todo.id === action.payload),
      //   1
      // );
    },
    deleteCompleteTodo: (state) => {
      const result = state.filter((todo) => {
        return todo.isCompleted !== true;
      });
      state.splice(0, state.length);
      state.unshift(...result);
    },
    deleteAllTodo: (state) => {
      //兩者皆可
      // state.todos.splice(0, state.todos.length);
      return [];
    },
    changeIsCompleted: (state, action: PayloadAction<todoId>) => {
      const completedTodo = state.find((todo) => todo.id === action.payload);
      //!TS語法 強制推定後面的property是存在的 completedTodo'''!'''.isCompleted
      completedTodo!.isCompleted = !completedTodo!.isCompleted;
    },
  },
});

export const {
  test,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteCompleteTodo,
  deleteAllTodo,
  changeIsCompleted,
} = todosSlice.actions;
export const selectTodos = (state: RootState) => state.todosReducer;
export default todosSlice.reducer;
