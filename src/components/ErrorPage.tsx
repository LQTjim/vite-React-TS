import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>喔哦!</h1>
      <p>抱歉,似乎發生了不可預期的錯誤</p>
      <br />
      <Link to="/" replace>
        返回主頁
      </Link>
    </div>
  );
}
export default ErrorPage;
