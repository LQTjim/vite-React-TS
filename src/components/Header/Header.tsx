import { Filter } from "@/App";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";
type HeaderProps = {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filter: Filter;
};
function Header({ setFilter, filter }: HeaderProps) {
  const handleBtnClick = (f: Filter) => {
    return () => {
      setFilter(f);
    };
  };
  return (
    <>
      {/* <SearchTodo /> */}
      <AddTodo />
      <div className="w-full">
        <button
          className={`ml-4 font-bold
          text-center bg-slate-300 hover:bg-slate-400 [&.active]:bg-slate-400 rounded-full py-1 px-3 ${
            filter === "已完成" ? "active" : ""
          }`}
          onClick={handleBtnClick("已完成")}
        >
          已完成
        </button>
        <button
          className={`ml-1 font-bold
          text-center bg-slate-300 hover:bg-slate-400 [&.active]:bg-slate-400 rounded-full py-1 px-3 ${
            filter === "未完成" ? "active" : ""
          }`}
          onClick={handleBtnClick("未完成")}
        >
          未完成
        </button>
        <button
          className={`ml-1 font-bold
          text-center bg-slate-300 hover:bg-slate-400 [&.active]:bg-slate-400 rounded-full py-1 px-3 ${
            filter === "全部" ? "active" : ""
          }`}
          onClick={handleBtnClick("全部")}
        >
          全部
        </button>
      </div>
    </>
  );
}

export default Header;
