import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import fetchTodos from "../../lib/fetchTodos";

export const fetchTodosThunk = createAsyncThunk(
  "todos/fetchTodosStatus",
  async () => {
    const data = await fetchTodos();
    return data;
  }
);
export const fakeFetchTodosThunk = createAsyncThunk(
  "todos/fakeFetchTodosStatus",
  async () => {
    const data = await new Promise<todo[]>((resolve) => {
      setTimeout(() => {
        resolve([
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
          {
            userId: 2,
            id: "sdfasda2",
            title: "測試用2",
            completed: true,
            timeStamp: new Date(),
          },
          {
            userId: 3,
            id: "sdfa3",
            title: "測試用3",
            completed: true,
            timeStamp: new Date(),
          },
          {
            userId: 1,
            id: "sdfadaf4",
            title: "測試用4",
            completed: true,
            timeStamp: new Date(),
          },
          {
            userId: 1,
            id: "sdfasdaffg5",
            title: "測試用5",
            completed: true,
            timeStamp: new Date(),
          },
          {
            userId: 1,
            id: "sdfasdaffg6",
            title: "測試用6",
            completed: true,
            timeStamp: new Date(),
          },
        ]);
      }, 0);
    });
    return data;
  }
);
//在此初始陣列為obj,須以 state.todos=...
//或者state.splice(...)等方法
export interface TodosState {
  todos: todo[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}
const initialState: TodosState = {
  todos: [],
  loading: "idle",
};

export const todosSlice = createSlice({
  name: "todosState",
  initialState,
  reducers: {
    test: (state) => {
      console.log(current(state));
    },
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.unshift({
        userId: 1,
        id: nanoid(),
        title: action.payload,
        completed: false,
        timeStamp: new Date(),
      });
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      state.todos.forEach((todo: todo, index) => {
        if (action.payload.id === todo.id) {
          state.todos[index] = {
            ...state.todos[index],
            title: action.payload.title,
          };
        }
      });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
    },
    deleteCompleteTodos: (state) => {
      state.todos = state.todos.filter((todo) => {
        return todo.completed !== true;
      });
    },
    deleteAllTodos: (state) => {
      return { ...state, todos: [] };
    },
    changeIsCompleted: (state, action: PayloadAction<string>) => {
      const completedTodo = state.todos.find(
        (todo: todo) => todo.id === action.payload
      );
      completedTodo!.completed = !completedTodo!.completed;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosThunk.fulfilled, (state, action) => {
      state.todos = action.payload
        .map((todoData) => {
          const timeStamp = generateRandomDate(
            new Date(2010, 5, 25),
            new Date()
          );
          return { ...todoData, id: todoData.id.toString(), timeStamp };
        })
        .sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime());
      state.loading = "succeeded";
    });
    builder.addCase(fetchTodosThunk.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchTodosThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
    builder.addCase(fakeFetchTodosThunk.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fakeFetchTodosThunk.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fakeFetchTodosThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export const {
  test,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteCompleteTodos,
  deleteAllTodos,
  changeIsCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;
function generateRandomDate(from: Date, to: Date) {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
}
