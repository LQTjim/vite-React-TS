import { Link } from "react-router-dom";

export default function TypeAhead({ result }: { result: todo[] }) {
  return (
    <ul className="hidden w-full absolute z-">
      {result.map((el) => {
        return (
          <li key={el.id} className="cursor-pointer bg-red-100 mb-1">
            <Link to={`/${23}`}>{el.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
