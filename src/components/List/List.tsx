import ReactPaginate from "react-paginate";
import { TodosState } from "../../features/todo/todoSlice";
import Item from "./Item";
import ItemSkeleton from "./ItemSkeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function List({ todos, loading }: TodosState) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = 5;
  const pageCount =
    Math.floor(todos.length / perPage) + (todos.length % perPage > 0 ? 1 : 0);
  const disPlayTodos = searchParams.get("page")
    ? [...todos].slice(
        (parseInt(searchParams.get("page")!) - 1) * 5 || 0,
        (parseInt(searchParams.get("page")!) - 1) * 5 + 5 || 5
      )
    : [...todos].slice(0, 5);

  const currentPage = parseInt(searchParams.get("page")!) || 1;
  const handlePageClick = (event: { selected: number }) => {
    navigate(`/?page=${event.selected + 1}`);
  };

  useEffect(() => {
    if (searchParams.get("page") === null) {
      return;
    }
    if (Number.isNaN(parseInt(searchParams.get("page")!))) {
      return navigate("/?page=1");
    }

    if (
      parseInt(searchParams.get("page")!) > pageCount &&
      loading === "succeeded"
    ) {
      console.log("first");

      navigate("/?page=1");
    }
  }, [todos]);

  return (
    <>
      <ul className="w-full mb-1">
        {loading === "pending" ? (
          <ItemSkeleton />
        ) : (
          (disPlayTodos.length > 0 &&
            disPlayTodos.map((todo) => <Item {...todo} key={todo.id} />)) || (
            <li className="flex mt-1">請新增代辦事項...</li>
          )
        )}
      </ul>
      <div className="w-full">
        <ReactPaginate
          className="flex justify-end gap-1"
          pageLinkClassName="bg-white mr-1 py-1 px-2 hover:bg-slate-400 hover:text-white rounded-sm"
          previousLinkClassName="bg-white mr-1 py-1 px-2 rounded-sm hover:bg-slate-400 hover:text-white "
          nextLinkClassName="bg-white mr-1 py-1 px-2 hover:bg-slate-400 hover:text-white rounded-sm"
          activeLinkClassName="!bg-slate-400 !text-white"
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
}

export default List;
