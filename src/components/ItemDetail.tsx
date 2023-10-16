import { NavLink, Navigate, useLocation, useParams } from "react-router-dom";

function ItemDetail() {
  const location = useLocation();
  const { id } = useParams();
  console.log(location.state.from.search);

  return (
    <>
      {id === location?.state?.id ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div
            className="
          h-1/2 w-1/3 flex flex-col justify-center items-center gap-5 text-xl p-2 rounded-md shadow-lg shadow-black bg-slate-200"
          >
            <div>代辦事項:{location.state.title || ""}</div>
            <div>
              創建於:
              {location.state.timeStamp.toLocaleString("zh-TW", {
                timeZone: "Asia/Taipei",
              })}
            </div>
            <NavLink to={`/${location.state.from.search}`}>
              <button className="bg-teal-400 hover:bg-teal-700 rounded p-2">
                回上一頁
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        <Navigate to="error" replace />
      )}
    </>
  );
}

export default ItemDetail;
