import { NavLink, Navigate, useLocation, useParams } from "react-router-dom";

function ItemDetail() {
  const location = useLocation();
  const { id } = useParams();
  console.log(location.state);

  return (
    <>
      {id === location?.state?.id ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div>任務:{location.state.title || ""}</div>
          <div>
            創建於:
            {location.state.timeStamp.toLocaleString("zh-TW", {
              timeZone: "GMT",
            })}
          </div>
          <NavLink to="/">
            <button className="bg-teal-400 rounded p-1">回上一頁</button>
          </NavLink>
        </div>
      ) : (
        <Navigate to="error" replace />
      )}
    </>
  );
}

export default ItemDetail;
